
import React, {useEffect, useState } from "react"
import Navbar from "./Navbar";
import "./ManagementStyle.css";
import "./LogStyle.css";
import axios from "axios"
import { Table, TableHead, TableCell,  TableRow, TableBody } from '@mui/material';

const  Log = () => {
  const [log, setLog]= useState([])
    
 
useEffect(()=>{
log_view();
},[])
    const log_view = async() => {
       try{
        
         return await axios.get("http://localhost:9002/log")

                .then(res=>setLog(res.data)) 
                
        } catch (error){alert("error ",error)}   
    }

    const searchHandle= async (event)=>{
    
    let key=event.target.value;
    if(key){
        let result= await fetch(`http://localhost:9002/log/${key}`)
        result= await result.json();   
        // if(result){
        //    setLog(result)
    // }
   
     }else{
        log_view();
     }
}
    return (
    <div className="management">
      <Navbar></Navbar>
        
        
      <h2>Log of Vehicles</h2>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Plate Number </TableCell>
                <TableCell>Entry Time </TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="view">
            {
                  log.length>0?  log.map((v_r)=>(
                        <TableRow key={v_r._id}>
                            <TableCell>{v_r.plate_no}</TableCell>
                            <TableCell>{v_r.entry_date}</TableCell>

                        </TableRow>
                    )):<h2>NO Reults</h2>
                }

            </TableBody>
        </Table>
    </div>
     
    )
}

export default Log