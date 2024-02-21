// import Webcam from 'webcam-react';
// import io from 'socket.io-client';
// import Match from './Match';
// import Navbar from "./Navbar";
// import "./ScreeningStyle.css";
// import Footer from "./Footer";
// import { useNavigate } from 'react-router-dom';

// import React, { useEffect, useRef, useState } from 'react';
// const socket = io('http://localhost:5000');

// const Screening = () => {
//   const navigate = useNavigate();

//   const webcamRef = useRef(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [responseMessage, setResponseMessage] = useState('');

//   useEffect(() => {
//     const sendVideoFrame = () => {
//       const imageSrc = webcamRef.current.getScreenshot();

//       if (socketConnected) {
//         socket.emit('video_frame', imageSrc);
//       }
//     };

//     socket.on('connect', () => {
//       setSocketConnected(true);
//     });

//     socket.on('frame_received', (response) => {       
//       setResponseMessage(response.message);
//     });

//     const interval = setInterval(() => {
//       sendVideoFrame();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [socketConnected]);

//   console.log("res. msg "+ responseMessage)
//   return (
//     <div className='screening'>
//       {/* <Navbar></Navbar> */}
//       <h1>SVMU: Smart Vehicle Management UAAR</h1>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={1200}
//         height={700}
//         />
//       <Match PlateNo={responseMessage}/>
// {/* <Match PlateNo="ABP-932"/> */}

//       </div>
//   );
// };

// export default Screening;

import Webcam from 'webcam-react';
import io from 'socket.io-client';
import Match from './Match';
import Navbar from "./Navbar";
import "./ScreeningStyle.css";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useRef, useState } from 'react';
const socket = io('http://localhost:5000');

const Screening = () => {
  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  // console.log("res.>>>>>>", responseMessage)
  const sendVideoFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (socketConnected) {
      socket.emit('video_frame', imageSrc);
    }
  };
  useEffect(() => {
    
    socket.on('connect', () => {
      setSocketConnected(true);
    });

    

    socket.on('frame_received', (response) => {
      console.log("response>>>>", response);
      if(response.message.length > 1){
        socket.disconnect();
        socket.off('frame_received', ()=>{
        console.log('disconnected');
        setSocketConnected(false)
      })
      }

      // socket.disconnect();
      // socket.off('frame_received', ()=>{
      //   console.log('disconnected');
      //   setSocketConnected(false)
      // })
      setResponseMessage(response.message);
      console.log("message from response", responseMessage)
    });

    const interval = setInterval(() => {
      sendVideoFrame();
    }, 1000);
    console.log("component rendered x")
    return () => {
      
      console.log('here');
      clearInterval(interval)

      socket.off('frame_received', ()=>{
        console.log('disconnected');
        setSocketConnected(false)
      })
       setResponseMessage('')
    };
  }, [socketConnected, responseMessage]);

  useEffect(() => {
    console.log("response in effect", responseMessage)
  }, [responseMessage]);

  useEffect(() => {
    // socket.on('comment', response => {
    //   console.log('on comment', response);
    //   setComments(prevComments => [...prevComments, ...response]);
    // });
    return () => {
      socket.off('frame_received');
    };
  }, []);

  return (
    <div className='screening'>
      <Navbar></Navbar>
      <hr></hr>
      <hr></hr>
      <h2>  SVMU: Smart Vehicle Management UAAR  </h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1200}
        height={700}
      />
      <Match PlateNo={responseMessage} handleResponse={setResponseMessage} setResponseMessage={setResponseMessage} />

    </div>
  );
};

export default Screening;

