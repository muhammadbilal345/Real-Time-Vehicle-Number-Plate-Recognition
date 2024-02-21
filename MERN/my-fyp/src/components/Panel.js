import React from 'react'
import AdminLogin from './AdminLogin'
import UserLogin from './UserLogin'
import "./PanelStyle.css";
import { useNavigate } from 'react-router-dom';

const Panel = () => {
  const navigate = useNavigate();
  return (
    <div className='body'>
      <div className='form'>
      <h2>SVMU</h2>
    <div className="button" onClick={() => navigate('/admin_login')}>Admin Login</div>
    <div className="button" onClick={() => navigate('/user_login')}>User Login</div>
    </div>
    </div>
  )
}

export default Panel