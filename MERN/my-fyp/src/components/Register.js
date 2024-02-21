import React, { useState } from "react"
import "./RegisterStyle.css";
import axios from "axios"
import Navbar from "./Navbar";

const Register = () => {

    const [ vehicle_register, setVehicle_Register] = useState({
        name: "",
        email:"",
        plate_no:"",
        cnic: ""
    })
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const { name, value } = e.target
        setVehicle_Register({
            ...vehicle_register,
            [name]: value
        })
    }

    const register = () => {

        // Perform form validation
    const validationErrors = {};

    if (!vehicle_register.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!vehicle_register.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vehicle_register.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!vehicle_register.plate_no.trim()) {
        validationErrors.plate_no = "Plate number is required";
      
      }
    if (!vehicle_register.cnic.trim()) {
      validationErrors.cnic = "CNIC number is required";
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(vehicle_register.cnic)) {
      validationErrors.cnic = "Invalid CNIC number format";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        const { name, email, plate_no , cnic} = vehicle_register
        if( name && email && plate_no && cnic){
            axios.post("http://localhost:9002/register", vehicle_register)
           .then(res=>alert(res.data.message)) 
        .catch((error) => console.error(error));
         // Reset the form
      setVehicle_Register({
        name: "",
        email: "",
        plate_no: "",
        cnic: "",
      });
    }
        }
        
    }

    return (
        <div>
            <Navbar></Navbar>
            <h1>SVMU:Smart Vehicle Management in UAAR </h1>
            <div className="register">
            <h2>Vehicle Register</h2>
            <input
              type="text"
              name="name"
              value={vehicle_register.name}
              placeholder="Your Name"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
            <input
              type="text"
              name="email"
              value={vehicle_register.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
            <input
              type="text"
              name="plate_no"
              value={vehicle_register.plate_no}
              placeholder="Plate Number"
              onChange={handleChange}
            />
            {errors.plate_no && <span>{errors.plate_no}</span>}
            <input
              type="text"
              name="cnic"
              value={vehicle_register.cnic}
              placeholder="CNIC Number"
              onChange={handleChange}
            />
            {errors.cnic && <span>{errors.cnic}</span>}
            <div className="button" onClick={register}>Register

           </div>
        </div>
        </div>
    )
}

export default Register