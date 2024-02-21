import React, {useState} from "react"
import "./AdminLoginStyle.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const SearchLog = () => {
    const navigate = useNavigate();
    const [ search_log, setSearch_Log] = useState({
        plate_no:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setSearch_Log({
            ...search_log,
            [name]: value
        })
    }

    const log = () => {
        axios.post("http://localhost:9002/SearchLog", search_log)
        .then(res => {
            if((res.data.message) === "Successfull")
            { navigate("/view_slog")}
         else{
            alert(res.data.message)
            navigate("/SearchLog")
         }
        })
    }

    return (
        <div className="login">
            <h2>Search Vehicle Log by Plate number</h2>
            <input type="text" name="plate_no" value={search_log.plate_no} onChange={handleChange} placeholder="Enter plate Number"></input>
           
            <div className="button" onClick={log}>Search Log</div>
           
        </div>
    )
}

export default SearchLog