#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 90;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  Serial.begin(9600); // initialize serial communication at 9600 bits per second
}

void loop() {
  if (Serial.available()) {
    char signal = Serial.read();
    if (signal == '0') {
      // Move servo from 90 to 0 degrees
      for (pos = 77; pos >= 0; pos -= 1) { 
        myservo.write(pos);              // tell servo to go to position in variable 'pos'
        delay(15);
      }
     } //delay(5000); // Wait half a second before returning to 90 degrees
    if (signal == '1') {     
      // Move servo from 0 to 90 degrees
      for (pos = 0; pos <= 77; pos += 1) { 
        myservo.write(pos);              // tell servo to go to position in variable 'pos'
        delay(15);
    }
  }
}
}