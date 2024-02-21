import "./HomeStyle.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";
function Home() {
  return (
    <>
    <Navbar></Navbar>
    <div className="hero">
       </div>
      <div className="home">

      <h3>Smart Vehicle Management UAAR</h3>

      <p>
  The SVMU is a Smart Vehicle Management in UAAR using AI based License plate detection and recognition 
 system with user friendly website with hardware implementation. The proposed project will detect the 
number plates of the vehicles as they enter from the gate. Camera will be sited at the entry point and 
it will capture the vehicles number plate from the front of the vehicle on the run time. The camera will 
record the video and it will capture image of vehicles number plate from the video, the system will be
 intelligent enough to filter the image from the video that has the vehicles number plate’s number.
  Then the system will filter the image and convert the vehicles number into text with python image processing.
   The text will be matched to the records of vehicles number plates numbers that are already stored in the database. 
   When the number matches the record stored in database, the system will signal the sensors interleaved on the barrier, 
   the barrier will be removed. When the barrier is removed the vehicle can pass through the barrier. The sensors will 
   be attached with the barrier those sensors will sense the vehicles presence under the barrier. The barrier will linger 
   opened as long as the vehicle is underneath it.
    When the vehicle has passed through the barrier sensor will then place
    the barrier back to its original position. If the vehicles number is not stored in the database,
 then it will signal the barrier to keep its original position and beep.
Those vehicles that are not registered can register on the gate by the guard. 
There will be an option to manually operate the barrier in the event system failure occurs.
 The website will be designed to maintain the daily log of pass in vehicles, the vehicle screening, 
 guards on duty with timings and complete detail, and register new vehicles. With the hardware implementation
  we will display how the proposed system will work in real time.

        </p>

      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
