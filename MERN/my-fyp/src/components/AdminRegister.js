import React, { useState } from "react"
import "./RegisterStyle.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const  AdminRegister = () => {
const navigate = useNavigate();
    const [ admin_register, setAdmin_Register] = useState({
        name: "",
        email:"",
        cnic: "",
        code:"",
        password:"",
        re_password:""
    })
    const [errors, setErrors] = useState({});


    const handleChange = e => {
        const { name, value } = e.target
        setAdmin_Register({
            ...admin_register,
            [name]: value
        })
    }

    const register = () => {
        const validationErrors = {};
        if (!admin_register.name.trim()) {
            validationErrors.name = "Name is required";
          }
      
          if (!admin_register.email.trim()) {
            validationErrors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(admin_register.email)) {
            validationErrors.email = "Invalid email format";
          }
          if (!admin_register.cnic.trim()) {
            validationErrors.cnic = "CNIC number is required";
          } else if (!/^\d{5}-\d{7}-\d{1}$/.test(admin_register.cnic)) {
            validationErrors.cnic = "Invalid CNIC number format";
          }
          if (!admin_register.code.trim()) {
            validationErrors.code = "Code is required";
          }
          if (!admin_register.password.trim()) {
            validationErrors.password = "Password is required";
          }
          if (!admin_register.re_password.trim()) {
            validationErrors.re_password = "Please re-enter your password";
          } else if (admin_register.password.trim() !== admin_register.re_password.trim()) {
            validationErrors.re_password = "Passwords do not match";
          }
        
          setErrors(validationErrors);
      
          if (Object.keys(validationErrors).length === 0) {
        const { name, email , cnic, code, password, re_password} = admin_register
        if( name && email && cnic && (code === "123" ) &&(password === re_password)){
            axios.post("http://localhost:9002/admin_register", admin_register)
           .then(res=>alert(res.data.message)) 
           navigate("/admin_login")
           setAdmin_Register({
            name: "",
            email: "",
            cnic: "",   
            code: "", 
            password: "",
            re_password: "",
          });
           
        } else {
            alert("invalid input or wrong code")
        }
        
    }
    }
    return (
        <div className="register">
            {console.log("Admin_Register", admin_register)}
            <h2>Admin Register</h2>
            <input
              type="text"
              name="name"
              value={admin_register.name}
              placeholder="Your Name"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
            <input
              type="text"
              name="email"
              value={admin_register.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          
            <input
              type="text"
              name="cnic"
              value={admin_register.cnic}
              placeholder="CNIC Number"
              onChange={handleChange}
            />
            {errors.cnic && <span>{errors.cnic}</span>}
              <input
              type="text"
              name="code"
              value={admin_register.code}
              placeholder="Code Number"
              onChange={handleChange}
            />
            {errors.code && <span>{errors.code}</span>}
            <input
              type="password"
              name="password"
              value={admin_register.password}
              placeholder="Your Password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
            <input
              type="password"
              name="re_password"
              value={admin_register.re_password}
              placeholder="Re Enter Password"
              onChange={handleChange}
            />
            {errors.re_password && <span>{errors.re_password}</span>}
            {/* <input type="text" name="name" value={admin_register.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={admin_register.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="number" name="cnic" value={admin_register.cnic} placeholder="Your CNIC" onChange={ handleChange }></input>
            <input type="text" name="code" value={admin_register.code} placeholder="Enter secret code" onChange={ handleChange }></input>
            <input type="password" name="password" value={admin_register.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="re_password" value={admin_register.re_password} placeholder="Re-Enter Password" onChange={ handleChange }></input> */}
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/admin_login')}>Login</div>
           
        </div>
    )
}

export default AdminRegister