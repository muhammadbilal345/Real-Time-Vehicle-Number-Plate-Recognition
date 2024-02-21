import React, { useState,useEffect } from "react"
import "./RegisterStyle.css";
import axios from "axios"
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Update = () => {
const {id} =useParams();
useEffect(()=>{
axios.get('http://localhost:9002/update/'+id)
.then(res=>console.log(res))
.catch(err=>console.log(err))
},[])
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

    const update_register = () => {

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
      } else if (!/^[A-Z]{2}-\d{2}-[A-Z]{1,3}-\d{1,4}$/.test(vehicle_register.plate_no)) {
        validationErrors.plate_no = "Invalid Plate number format";
      }
    if (!vehicle_register.cnic.trim()) {
      validationErrors.cnic = "CNIC number is required";
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(vehicle_register.cnic)) {
      validationErrors.cnic = "Invalid CNIC number format";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    
        }
        
    }

    return (
        <div>
           
            
            <div className="register">
            <h2>Update Vehicle Register</h2>
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

<div className="button" onClick={update_register} >Update</div>
           </div>
        </div>
        
    )
}

export default Update