import React, { useEffect, useRef } from 'react';

const Video = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Connect to the Python server using a WebSocket
        socketRef.current = new WebSocket('ws://localhost:8765/');
        socketRef.current.onmessage = (event) => {
          const img = document.createElement('img');
          img.src = `data:image/jpeg;base64,${event.data}`;
          document.body.appendChild(img);
        };
      })
      .catch((err) => {
        console.error('Error accessing camera',err);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} />
    </div>
  );
};

export default Video;