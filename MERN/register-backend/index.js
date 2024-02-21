import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import { SerialPort } from 'serialport'
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/my-fyp",
{useNewUrlParser:true,
useUnifiedTopology:true},
()=>{
    console.log("Connected Successfully")
})

//vehicle registeration schema creation
const vehicle_registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    plate_no:String,
    cnic:String
})

//user registeration schema creation
const user_registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    cnic:String,
    password: String,
   
})
//admin register schema
const admin_registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    cnic:String,
    password: String,
})
//contact schema
const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    contact_no: String,
})

//log schema
const logSchema = new mongoose.Schema({
    plate_no:String,
    entry_date: Date,
    entry_time: String,

})
//model creation 

const Vehicle_Register= new mongoose.model("Vehicle_Register", vehicle_registerSchema)
const User_Register= new mongoose.model("User_Register", user_registerSchema)
const Admin_Register= new mongoose.model("Admin_Register", admin_registerSchema)
const Contact= new mongoose.model("Contact", contactSchema)
const Log= new mongoose.model("Log", logSchema)


// defining route for barrier opening and closing

app.get("/gate", (req, res)=>{
    const {gate} = req.body;


    
      

})


//define route for vehicle registeration
app.post("/register",(req,res)=>{
   const {name,email, plate_no,
    cnic }= req.body
    Vehicle_Register.findOne({plate_no:plate_no},(err,vehicle_register)=>{
        if(vehicle_register){
            res.send({message: "Vehicle Already Registered"})
        }
        else{
            const vehicle_register=new Vehicle_Register({
                name,
                email,
                plate_no,
                cnic,
            })

            vehicle_register.save(err=>{
                if(err){
                  res.send(err)  
                }
                else
                {
                    res.send({message:"Successfully Registered"})
                }
            }) 
        }
    })
   
})

//define route for user registeration
//user login method
app.post("/user_login", (req, res)=> {
    const { email, password} = req.body
    User_Register.findOne({ email: email}, (err, user_register) => {
        if(user_register){
            if(password === user_register.password ) {
                res.send({message: "Login Successfull", user_register: user_register})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 
//user register method
app.post("/user_register", (req, res)=> {
    const { name, email,cnic, password} = req.body
    User_Register.findOne({email: email}, (err, user_register) => {
        if(user_register){
            res.send({message: "User already registerd"})
        } else {
            const user_register = new User_Register({
                name,
                email,
                password
            })
            user_register.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



//admin login method
app.post("/admin_login", (req, res)=> {
    const { email, password} = req.body
    Admin_Register.findOne({ email: email}, (err, admin_register) => {
        if(admin_register){
            if(password === admin_register.password && email === admin_register.email) {
                res.send({message: "Login Successfull", admin_register: admin_register})
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({message: "Admin not registered"})
        }
    })
}) 
//admin register method
app.post("/admin_register", (req, res)=> {
    const { name, email,cnic, password} = req.body
    Admin_Register.findOne({email: email}, (err, admin_register) => {
        if(admin_register){
            res.send({message: "User already registerd"})

        } else {
            const admin_register = new Admin_Register({
                name,
                email,
                cnic,
                password
            })
            admin_register.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 
//contact us 
// app.post("/contact", (req, res)=> {
//     const { name, email,contact_no} = req.body
//     Contact( (err) => {
//             const contact = new Contact({
//                 name,
//                 email,
//                 contact_no,
//             })
//             contact.save(err => {
//                 if(err) {
//                     res.send(err)
//                 } else {
//                     res.send( { message: "Successfully Submitted." })
//                 }
//             })
//         }
//     )
    
// }) 
app.post("/contact", (req, res) => {
    const { name, email, contact_no } = req.body;
    
    const contact = new Contact({
      name,
      email,
      contact_no,
    });
  
    contact.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successfully Submitted." });
      }
    });
  });
  
//log or match method
app.post("/match", (req, res) => {
    const { plate_no } = req.body;
    console.log(">>>>>>",plate_no);
    Vehicle_Register.findOne({ plate_no: plate_no }, (err, vehicle_register) => {
        if (vehicle_register) {

            port.on('open', () => {
                console.log('Serial port opened');
              });

            const log = new Log({
                plate_no,
                entry_date: new Date()
            });
            log.save(err => {
                if (err) {
                    res.send(err);
                } else {
                    port.write('0')
                    res.send({ message: "Match Successfull", vehicle_register: vehicle_register.plate_no });
                    setTimeout(() => {
                        port.write('1')
                    }, 15000);
                }
            });
        } else {
            res.send({ message: "Vehicle not registered" });
        }
    });
});

// app.post("/match", (req, res)=> {
//     const { plate_no} = req.body
//     Vehicle_Register.findOne({ plate_no:plate_no}, (err, vehicle_register) => {
//         if(vehicle_register){
//                 res.send({message: "Match Successfull", vehicle_register: vehicle_register.plate_no})
//                 const log = new Log({
//                     plate_no,
//                     entry_date: new Date(),  
//                 })
//                 log.save(err => {
//                     if(err) {
//                         res.send(err)
//                     } else {
//                         res.send( { message: "Successfully Saved." })
//                     }
//                 })
        
//             }
//          else {
//             res.send({message: "Vehicle not registered"})
//         }
//     })
// }) 

//view
app.get("/view", async (req,res)=>{       
    try{
     const  vehicle_register= await Vehicle_Register.find() 
   
    res.status(200).json(vehicle_register);
}
 catch(error)
    { res.send({message: error.message})}
})


//log_view
app.get("/log", async (req,res)=>{       
    try{
     const  log= await Log.find() 
    res.status(200).json(log);
    
}
 catch(error)
    { res.send({message: error.message})}
})

//new log_view
// app.get("/log_view", async (req,res)=>{       
//     try{
//      const  log_view= await Vehicle_Register.find() 
//     res.status(200).json(log_view);
    
// }
//  catch(error)
//     { res.send({message: error.message})}
// })

//search log_view
// app.get("/SearchLog", async (req,res)=>{  
//     const {plate_no}  = req.body;  
//    const searchLog= await Log.find({plate_no:plate_no}) 
//             if(plate_no === log.plate_no)
//             res.status(200).json(searchLog);
        
//         else{
//             res.status(404)
//         }
//     }
    
// )


// app.post("/SearchLog", (req, res)=> {
//     const { plate_no} = req.body
//     Log.find({ plate_no: plate_no}, (err, log) => {
//         if(log){
//             if(plate_no === log.plate_no ) {
//                 res.send({message: "Successfull", log: log})

//             } else {
//                 res.send({ message: "Plate Number didn't match" })
//             }
//         } else {
//             res.send({message: "Vehicle not registered"})
//         }
//     })
// }) 
 
// app.get("/search/:id", async (req,res)=>{       
//     try{
//       const  log= await Log.find({id:req.params.id}) 
//     res.status(200).json(log);
    
// }
//  catch(error)
//     { res.send({message: "not found"})}
// })      


//edit

//Update user route
app.patch('/update/:id',async (req, res) => {
    // const id = req.params.id;
    // const { name, email, plate_no, cnic } = req.body;
  
    // // Find the vehicle with the given ID
    // const update_vehicle = vehicle_register.find((vehicle) => vehicle.id === id);
    // if (!update_vehicle) {
    //   return res.status(404).json({ message: 'Vehicle not found' });
    // }
  
    // // Update the vehicle's details
    // update_vehicle.name = name;
    // update_vehicle.email = email;
    // update_vehicle.plate_no = plate_no;
    // update_vehicle.cnic = cnic;
  
    // res.json({ message: 'Vehicle details updated successfully' });



    //code
    try {
        // const {name,avatar}=req.body;
        const {name,email,cnic,plate_no}=req.body;
        const id=req.params.id;
        await Vehicle_Register.findOneAndUpdate({_id:id},{
           name:name,email:email,cnic:cnic,plate_no:plate_no
            // name,avatar
        },{ new: true })

        console.log("updated")
        const user=await Vehicle_Register.findOne({id});
        res.json({msg:"Update Successful", data:{user}});
    }catch(err){
        return res.status(500).json({msg:err.message});
    }

  });
  
  
// app.get("/edit/:id", async (req,res)=>{       
//     try{
//       const  vehicle_register= await Vehicle_Register.find({_id:req.params.id}) 
//     // const record= await Record.findById(req.params._id)
//     res.status(200).json(vehicle_register);
//     console.log(vehicle_register)
    
// }
//  catch(error)
//     { res.send({message: error.message})}
// })

// //edit post
// app.put("/edit/:id", async (req,res)=>{       
   
//         let vehicle_register= req.body;

//     // const editUser = new Vehicle_Register(vehicle_register)

// try{
//    const result=  await Vehicle_Register.findOneAndUpdate({_id: req.params.id},{
//         name:vehicle_register.name,
//         email: vehicle_register.email,
//         plate_no:vehicle_register.plate_no,
//         cnic: vehicle_register.cnic
//     },
//     {
//         new:true
//     })
//     res.status(200).json(result)
// }
//  catch(error)
//     { res.send({message: error.message})}
// })
//delete
app.delete("/view/:id", async (req,res)=>{       
   
    try{
        await Vehicle_Register.deleteOne({_id: req.params.id});
        res.status(201).json("User deleted Successfully");
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
})


//update
app.get('/update/:id',(req,res)=>{
    const sql="SELECT *FROM  vehicle_register";
})




// Endpoint to get the log of a specific vehicle
app.get("/logview/:id", async (req, res) => {
    try {
      const vehicleId = req.params.id;
      const log = await Log.find({ plate_no: vehicleId });
      console.log(log)
      res.json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch log data" });
    }
  });
  



app.listen(9002,()=>{
    console.log("BE started at port 9002")
})