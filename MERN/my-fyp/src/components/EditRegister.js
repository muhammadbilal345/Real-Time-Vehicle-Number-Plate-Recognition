import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, editUser } from "./api";
import axios from "axios"
const EditRegister = () => {
  const [vehicle_register, setVehicle_Register] = useState({
    name: "",
    email: "",
    plate_no: "",
    cnic: ""
  });
const {name,email,plate_no,cnic}=vehicle_register;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await getUser(id);
      if (response && response.data) {
        setVehicle_Register(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateInfor=()=>{
    console.log("name",name,"email",email,"plate_no",plate_no,"cnic",cnic)
    try {
        const res= axios.patch('http://localhost:9002/update/'+id,{
            // name:name?name:user.name,
            name: name,
            email: email,
            plate_no: plate_no,
            cnic: cnic,

            // avatar:avatar?avatar:user.avatar
        }).then(response=>{    console.log('Data updated:', response.data);
          const updateVehicle={name:response.data.data.name,
            email:response.data.data.user.email,
            id:response.data.data.user._id,
           }
          setVehicle_Register(updateVehicle)
})

        
      

    }catch(err) {
           
    }
}
  const editUserDetails = async () => {
    try {
      const res= axios.patch('http://localhost:9002/update/'+id,{
          // name:name?name:user.name,
          name: name,
          email: email,
          plate_no: plate_no,
          cnic: cnic,

          // avatar:avatar?avatar:user.avatar
      }).then(response=>{    console.log('Data updated:', response.data); 
        const updateVehicle={name:response.data.data.name,
          email:response.data.data.user.email,
          id:response.data.data.user._id,
         }
        setVehicle_Register(updateVehicle)
})

     
    

  }catch(err) {
       
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle_Register((prevVehicle) => ({
      ...prevVehicle,
      [name]: value
    }));
  };

  return (
    <div className="register">
      <h2>Edit Register</h2>
      <input
        type="text"
        name="name"
        value={vehicle_register.name}
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={vehicle_register.email}
        placeholder="Your Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="plate_no"
        value={vehicle_register.plate_no}
        placeholder="License Plate Number"
        onChange={handleChange}
      />
      <input
        type="number"
        name="cnic"
        value={vehicle_register.cnic}
        placeholder="Your CNIC"
        onChange={handleChange}
      />
      <div className="button" onClick={editUserDetails}>
        Edit Register
      </div>
    </div>
  );
};

export default EditRegister;


// import React, { useState , useEffect} from "react"

// import "./RegisterStyle.css";
// import axios from "axios"
// import { getUser, editUser } from './api';
// import { useNavigate, useParams } from 'react-router-dom';
// const url="http://localhost:9002/edit";
// const EditRegister = () => {

//     const [ vehicle_register, setVehicle_Register] = useState({
//         name: "",
//         email:"",
//         plate_no:"",
//         cnic: ""
//     })
//     const { id } = useParams();
//     let navigate = useNavigate();
//     useEffect(()=>{
//         loadUserDetails();
//     }, [])

//     const loadUserDetails = async() => {
//         const response = await getUser(id);
//          setVehicle_Register(response.data);
//     }

//     const editUserDetails = async() => {
//         const response = await editUser(vehicle_register,id);
//         navigate('/management');
//     }

//     // const edit = async(id, user) => {
//     //     try{
         
//     //       return await axios.put(`${url}/${id}`, user)
//     //              .then(res=>setVehicle_Register(res.data)) 
                 
//     //      } catch (error){alert("error ",error)}   
//     //  }

//     const handleChange = e => {
//         const { name, value } = e.target
//         setVehicle_Register({
//             ...vehicle_register,
//             [name]: value
//         })
//     }

//     // const edit_register = () => {
//     //     const { name, email, plate_no , cnic} = vehicle_register
//     //     if( name && email && plate_no && cnic){
//     //         axios.post("http://localhost:9002/register", vehicle_register)
           
//     //        .then(res=>alert(res.data.message)) 
           
//     //     } else {
//     //         alert("invalid input")
//     //     }
        
//     // }
    
    
//     return (
//         <div className="register">
//             {console.log("Vehicle_Register", vehicle_register)}
//             <h2>Edit Register</h2>
//             <input type="text" name="name" value={vehicle_register.name} placeholder="Your Name" onChange={ handleChange }></input>
//             <input type="text" name="email" value={vehicle_register.email} placeholder="Your Email" onChange={ handleChange }></input>
//             <input type="text" name="plate_no" value={vehicle_register.plate_no} placeholder="Lisence Plate Number" onChange={ handleChange }></input>
//             <input type="number" name="cnic" value={vehicle_register.cnic} placeholder="Your CNIC" onChange={ handleChange }></input>
//             <div className="button" onClick={()=> editUserDetails()} > Edit Register</div>
           
//         </div>

        
//     )
// }

// export default EditRegister