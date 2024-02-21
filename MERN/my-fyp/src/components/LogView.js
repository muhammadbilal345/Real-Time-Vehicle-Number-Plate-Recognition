
// import React, {useEffect, useState } from "react"
// import {useParams} from 'react-router-dom'
// import Navbar from "./Navbar";
// import "./ManagementStyle.css";
// import "./LogStyle.css";
// import axios from "axios"
// import { Table, TableHead, TableCell,  TableRow, TableBody } from '@mui/material';

// const LogUrl = 'http://localhost:9002/logview/';
// const vehicle_array =[]



// const  LogView = () => {
//   const [log, setLog]= useState([])
//   const { id } = useParams();
//   const [data,setData]=useState({
//     id:""
//   })
// useEffect(()=>{
// // log_view(id);
// axios.get("http://localhost:9002/logview/"+id).then(response=>{console.log("data",response.data);

// vehicle_array=response.data
//     // setData(response.data.data._id)})
// })
// },[])
//     // const log_view = async(id) => {
//     //     try {
//     //         return await axios.get(`${LogUrl}/${id}`)
//     //         .then(res=>setLog(res.data)) 
                
//     //     } catch (error){alert("error ",error)} 
         
//     // }

    
//     return (
//     <div className="management">
//       <Navbar></Navbar>
        
        
//       <h2>Log of Vehicles</h2>
//         <Table>
//             <TableHead>
//                 <TableRow>
//                 <TableCell>Plate Number </TableCell>
//                 <TableCell>Entry Time </TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody className="view">
//             {
//                   log.length>0?  log.map((v_r)=>(
//                         <TableRow key={v_r._id}>
//                             <TableCell>{v_r.plate_no}</TableCell>
//                             <TableCell>{v_r.entry_date}</TableCell>

//                         </TableRow>
//                     )):<h2>NO Reults</h2>
//                 },
//             {
//                 vehicle_array.map((p_n)=>(
//                 <TableRow key={p_n._id}>
//                             <TableCell>{p_n.plate_no}</TableCell>
//                             <TableCell>{p_n.entry_date}</TableCell>

//             </TableRow>
//                 ))
//                 }
                
//             </TableBody>
         
//         </Table>
        
//     </div>
     
//     )
// }

// export default LogView;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from "axios"
import { Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';

const LogView = () => {
  const [log, setLog] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    logView(id);
  }, [id]);

  const logView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9002/logview/${id}`);
      setLog(response.data);
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  };

  return (
    <div className="management">
      <Navbar />
      <h2>Log of Vehicles</h2>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Plate Number</TableCell>
            <TableCell>Entry Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="view">
          {log.length > 0 ? (
            log.map((v_r) => (
              <TableRow key={v_r._id}>
                <TableCell>{v_r._id}</TableCell>
                <TableCell>{v_r.plate_no}</TableCell>
                <TableCell>{v_r.entry_date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                <h2>No Results</h2>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogView;
