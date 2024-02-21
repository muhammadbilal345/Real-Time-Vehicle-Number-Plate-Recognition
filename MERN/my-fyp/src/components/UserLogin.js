import React, {useState} from "react"
import "./UserLoginStyle.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const UserLogin =() => {

    const navigate = useNavigate();
    const [ user_login, setUser_Login] = useState({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const { name, value } = e.target
        setUser_Login({
            ...user_login,
            [name]: value
        })
    }

    const login = () => {
         // Perform form validation
    const validationErrors = {};

    if (!user_login.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user_login.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!user_login.password.trim()) {
        validationErrors.password = "Password is required";
      }
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {  
        axios.post("http://localhost:9002/user_login", user_login)
        .then(res => {
            if((res.data.message) === "Login Successfull")
            {
            { navigate("/home2")}
            setUser_Login({
                
                email: "",
                password: "",
               
              });
            }
         else{
            alert(res.data.message)
            navigate("/user_login")
         }

        })
    }
}

    return (
        <div className="login">
            <h2>User Login</h2>
            
            <input
              type="text"
              name="email"
              value={user_login.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}

            <input
              type="text"
              name="password"
              value={user_login.password}
              placeholder="Your Password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
            <div className="button" onClick={login}>Login</div>
            <div className="button" onClick={() => navigate('/user_register')}>Register</div>
            {/* <input type="email" name="email" value={user_login.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user_login.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
           
            <div>or</div> */}
           
           
        </div>
    )
}

export default UserLogin