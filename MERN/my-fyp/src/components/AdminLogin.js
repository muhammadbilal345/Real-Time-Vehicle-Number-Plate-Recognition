import React, {useState} from "react"
import "./AdminLoginStyle.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [ admin_login, setAdmin_Login] = useState({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target
        setAdmin_Login({
            ...admin_login,
            [name]: value
        })
    }

    const login = () => {
         // Perform form validation
    const validationErrors = {};

    if (!admin_login.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(admin_login.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!admin_login.password.trim()) {
        validationErrors.password = "Password is required";
      }
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {  
        axios.post("http://localhost:9002/admin_login", admin_login)
        .then(res => {
            if((res.data.message) === "Login Successfull")
            { navigate("/home")
            setAdmin_Login({
                
                email: "",
                password: "",
               
              });
            }
         else{
            alert(res.data.message)
            navigate("/admin_login")
         }
        })
    }
    }
    return (
        <div className="login">
            <h2>Admin Login</h2>
            <input
              type="text"
              name="email"
              value={admin_login.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}

            <input
              type="text"
              name="password"
              value={admin_login.password}
              placeholder="Your Password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
            
            {/* <input type="text" name="email" value={admin_login.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={admin_login.password} onChange={handleChange}  placeholder="Enter your Password" ></input> */}
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/admin_register')}>Register</div>
        </div>
    )
}

export default AdminLogin