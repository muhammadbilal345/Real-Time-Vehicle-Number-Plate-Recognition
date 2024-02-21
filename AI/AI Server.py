import re
import cv2
import torch
import numpy as np
from paddleocr import PaddleOCR
from flask import Flask
from flask_socketio import SocketIO, emit
from PIL import Image
import io
import base64

PADDLE_OCR = PaddleOCR(use_angle_cls=True, lang='en')
OCR_TH = 0.1
plate_num = ""
rep_plate_num=""
plate_num_count = 0
prev_plate_num = ""

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

print(f"[INFO] Loading model... ")
# loading the custom trained model
# model =  torch.hub.load('ultralytics/yolov5', 'custom', path='last.pt',force_reload=True) ## if you want to download the git repo and then run the detection
model = torch.hub.load('.', 'custom', source='local', path='runs/train/Model6/weights/best.pt',
                        force_reload=True)  ### The repo is stored locally

classes = model.names  # class names in string format

# -------------------------------------- function to run detection ---------------------------------------------------------
def detectx(frame, model):
    frame = [frame]
    print(f"[INFO] Detecting. . . ")
    results = model(frame)

    labels, cordinates = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]

    return labels, cordinates

def plot_boxes(results, frame, classes):
    """
    --> This function takes results, frame and classes
    --> results: contains labels and coordinates predicted by model on the given frame
    --> classes: contains the strting labels

    """
    labels, cord = results
    n = len(labels)
    x_shape, y_shape = frame.shape[1], frame.shape[0]

    print(f"[INFO] Total {n} detections. . . ")
    print(f"[INFO] Looping through all detections. . . ")

    # looping through the detections
    for i in range(n):
        row = cord[i]
        if row[4] >= 0.55:  ### threshold value for detection. We are discarding everything below this value
            print(f"[INFO] Extracting BBox coordinates. . . ")
            x1, y1, x2, y2 = int(row[0] * x_shape), int(row[1] * y_shape), int(row[2] * x_shape), int(
                row[3] * y_shape)  ## BBOx coordniates
            
            coords = [x1, y1, x2, y2]
            global plate_num
            
            plate_num = recognize_plate_easyocr(img=frame, coords=coords, reader=PADDLE_OCR, region_threshold=OCR_TH)
            
            print("Detected number is: " + str(plate_num) + "\n")

            global plate_num_count
            global prev_plate_num
            # prev_plate_num = ""
            if plate_num == prev_plate_num:
                plate_num_count += 1
            else:
                plate_num_count = 1
            
            if plate_num_count == 3:
                print(f"[INFO] Plate number {plate_num} repeated 3 times adjacently. . .")
                global rep_plate_num
                rep_plate_num = plate_num
                plate_num_count = 0
                
            prev_plate_num = plate_num
              
                
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  # BBox
            cv2.rectangle(frame, (x1, y1 - 20), (x2, y1), (0, 255, 0), -1)  # for text label background
            cv2.putText(frame, f"{plate_num}", (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    return frame

# ---------------------------- function to recognize license plate --------------------------------------
def recognize_plate_easyocr(img, coords, reader, region_threshold):
    # separate coordinates from box
    xmin, ymin, xmax, ymax = coords
    # get the subimage that makes up the bounded region and take an additional 5 pixels on each side
    # nplate = img[int(ymin)-5:int(ymax)+5, int(xmin)-5:int(xmax)+5]
    nplate = img[int(ymin):int(ymax), int(xmin):int(xmax)]  ### cropping the number plate from the whole image

    ocr_result = reader.ocr(nplate, cls=True)

    text = filter_text(region=nplate, ocr_result=ocr_result, region_threshold=region_threshold)

    # if len(text) == 1:
    #     text = text[0].upper()
    return text

# to filter out wrong detections

def filter_text(region, ocr_result, region_threshold):
    rectangle_size = region.shape[0] * region.shape[1]
    print("rectangle size", rectangle_size)
    plate = []
    print(ocr_result)
    for nested_list in ocr_result:
        for tup in nested_list:
            coords, label_and_value = tup
            label, value = label_and_value
            length = np.sum(np.subtract(coords[1], coords[0]))
            height = np.sum(np.subtract(coords[2], coords[1]))
            if length * height / rectangle_size > region_threshold:
                plate.append(label)
    print(plate)

    try:
        if len(plate) > 1:
            first = re.split(r'[\s\W\d]+', plate[0])
            plate = first[0] + plate[1] #if len(Label) > 1 and Label[1] else Label[0]
        else:
            plate = plate[0]
    except Exception as e:
        print("Error occurred while processing the plate: ", e)
        plate = None
    return plate

# ---------------------------------------------- Main function -----------------------------------------------------

def main(imageSrc=None):
    global rep_plate_num
    rep_plate_num = ""
    # --------------- for detection on image --------------------
    if imageSrc is not None:
        print("[INFO] Working with image")
        image_bytes = base64.b64decode(imageSrc.split(',')[1])
        # Load image from bytes
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        frame = np.array(image)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # Convert PIL image to numpy array
        results = detectx(frame, model=model)

        frame = plot_boxes(results, frame, classes=classes)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('video_frame')
def handle_video_frame(imageSrc):
    main(imageSrc)
    print('Received video frame:', len(imageSrc))
    emit('frame_received', {'message': rep_plate_num})

@socketio.on('disconnect')
def test_disconnect():
    emit('disconnect')

if __name__ == '__main__':
    socketio.run(app)

