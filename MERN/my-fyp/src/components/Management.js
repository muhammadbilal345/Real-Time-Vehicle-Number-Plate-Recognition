import React, {useEffect , useState} from "react"
import "./ManagementStyle.css";
import { getUsers, deleteUser } from './api';
import Navbar from "./Navbar";
import axios from "axios"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
   
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: black;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


const  Management = () => {
    const navigate = useNavigate();

const [views, setViews]= useState([])

 useEffect(()=>{
  allView();  }  ,[])

    const allView = async() => {
        let response = await getUsers();
        setViews(response.data);
    }
    const deleteUserData = async (id) => {
        await deleteUser(id);
        allView();
    }
    // const handleClick = async (id) => {
    //     history.push('/viewlog', { plate_no });
    // }
   
    const handleViewLogClick = (plateNumber) => {
        navigate(`/logview/${plateNumber}`);
      };
    return (
    <div className="management">
        <Navbar></Navbar>
        <h2>Vehicles Management</h2>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>ID </TableCell>
                <TableCell>Name </TableCell>
                <TableCell>Email </TableCell>
                <TableCell>Plate Number </TableCell>
                <TableCell>CNIC </TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="view">
                {
                    views.map((v_r)=>(
                        <TRow key={v_r._id}>
                             
                             <TableCell>{v_r._id}</TableCell>
                            <TableCell>{v_r.name}</TableCell>
                            <TableCell>{v_r.email}</TableCell>
                            <TableCell>{v_r.plate_no}</TableCell>
                            <TableCell>{v_r.cnic}</TableCell>
                            <TableCell>
                        <Button className="button" color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/update/${v_r._id}`}>Edit</Button>  
                        <Button className="button"color="secondary" variant="contained" onClick={() => deleteUserData(v_r._id)}>Delete</Button> 
                      {/* <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/logview/${v_r._id}`}>View Log</Button>   */}
                        <Button className="button" color="primary" variant="contained" onClick={()=> handleViewLogClick(v_r.plate_no)}  >View Log</Button>  
                        </TableCell>
                        
                        </TRow>
                    ))
                }


            </TableBody>
        </Table>  
    </div>
     
    )
}

export default Management