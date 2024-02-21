import React, { useState, useEffect } from "react";
import "./RegisterStyle.css";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Match = ({ PlateNo }) => {
  const navigate = useNavigate();
  const [vehicleMatch, setVehicleMatch] = useState(PlateNo);

  console.log("plate No>>>",PlateNo);
  console.log("vehicleMatch No>>>",vehicleMatch);

  useEffect(() => {
    match_number()
   const plate = PlateNo;
    setVehicleMatch(prevState => ({
      ...prevState,
      plate_no: plate
    }));
  }, [PlateNo]);

    const match_number = () => {
      const { plate_no } = vehicleMatch;
      console.log("plate no.>>>>", plate_no)
      if (plate_no) {
        axios.post("http://localhost:9002/match", { plate_no })
          .then(res => {
            console.log("res ", res)
            if (res.data.message === "Match Successfull") {
              alert(`Match Successful!\nPlate Number: ${plate_no}`);
              navigate('/log');
            } else {
              alert(`Match Unsuccessful!\nPlate Number: ${plate_no}`);
              navigate("/register");
            }
          });
      }
    };
  

  // const match_number = () => {
  //   const { plate_no } = vehicleMatch;
  //   console.log("plate no.>>>>", plate_no)
  //   if (plate_no) {
  //     axios.post("http://localhost:9002/match", { plate_no })
  //       .then(res => {
  //         console.log("res ",res)
  //         if (res.data.message === "Match Successfull") {
  //           alert(res.data.message);
  //           navigate('/log');
  //         }
  //          else {
  //           alert(res.data.message);
  //           navigate("/register");
  //         }
  //       });
  //   }
  // };
  
  return (
    <div>
      <Navbar />
      
    </div>
  );
};

export default Match;