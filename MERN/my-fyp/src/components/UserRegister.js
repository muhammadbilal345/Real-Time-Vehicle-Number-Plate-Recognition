import React, { useState } from "react"
import "./UserRegisterStyle.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

    const navigate = useNavigate();
    const [ user_register, setUser_Register] = useState({
        name: "",
        email:"",
        cnic:"",
        password:"",
        re_password: ""
    })
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const { name, value } = e.target
        setUser_Register({
            ...user_register,
            [name]: value
        })
    }
    const register = () => {

        const validationErrors = {};
        if (!user_register.name.trim()) {
            validationErrors.name = "Name is required";
          }
      
          if (!user_register.email.trim()) {
            validationErrors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(user_register.email)) {
            validationErrors.email = "Invalid email format";
          }
          if (!user_register.cnic.trim()) {
            validationErrors.cnic = "CNIC number is required";
          } else if (!/^\d{5}-\d{7}-\d{1}$/.test(user_register.cnic)) {
            validationErrors.cnic = "Invalid CNIC number format";
          }
          if (!user_register.password.trim()) {
            validationErrors.password = "Password is required";
          }
          if (!user_register.re_password.trim()) {
            validationErrors.re_password = "Please re-enter your password";
          } else if (user_register.password.trim() !== user_register.re_password.trim()) {
            validationErrors.re_password = "Passwords do not match";
          }
        
          setErrors(validationErrors);

          if (Object.keys(validationErrors).length === 0) {

        const { name, email, cnic,  password , re_password} = user_register
        if( name && email && cnic &&password && (password === re_password)){
            axios.post("http://localhost:9002/user_register", user_register)
           .then(res=>alert(res.data.message)) 
           navigate("/user_login")
           setUser_Register({
            name: "",
            email: "",
            cnic: "",    
            password: "",
            re_password: "",
          });
        } else {
            alert("invalid input")
        }  
    }
}

    return (
        <div className="register">
            {console.log("User", user_register)}
            <h2>User Register</h2>
            <input
              type="text"
              name="name"
              value={user_register.name}
              placeholder="Your Name"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
            <input
              type="text"
              name="email"
              value={user_register.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          
            <input
              type="text"
              name="cnic"
              value={user_register.cnic}
              placeholder="CNIC Number"
              onChange={handleChange}
            />
            {errors.cnic && <span>{errors.cnic}</span>}
             
            <input
              type="password"
              name="password"
              value={user_register.password}
              placeholder="Your Password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
            <input
              type="password"
              name="re_password"
              value={user_register.re_password}
              placeholder="Re Enter Password"
              onChange={handleChange}
            />
            {errors.re_password && <span>{errors.re_password}</span>}
            {/* <input type="text" name="name" value={user_register.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user_register.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="number"  name="cnic" value={user_register.cnic} placeholder="Your CNIC (without dashes)" onChange={ handleChange }></input>
            <input type="password" name="password" value={user_register.password} placeholder="Password" onChange={ handleChange }></input>
            <input type="password" name="re_password" value={user_register.re_password} placeholder="Re-Enter Password" onChange={ handleChange }></input> */}
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/user_login')}>Login</div>
        </div>
    )
}

export default UserRegister