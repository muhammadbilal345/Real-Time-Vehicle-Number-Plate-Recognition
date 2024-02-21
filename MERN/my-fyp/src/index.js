import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Screening from './components/Screening'
import About from './components/About'
import Contact from './components/ContactUs'
import UserRegister from './components/UserRegister'
import Log from './components/Log';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UserLogin from './components/UserLogin'
import Panel from './components/Panel'
import Management from './components/Management'
import Home2 from './components/Home2'
import Match from './components/Match';
import EditRegister from './components/EditRegister'
import SearchLog from './components/SearchLog';
import ViewSLog from './components/ViewSLog'
import Searchh from './components/Searchh'
import Video from './components/Video'
import LogView from './components/LogView';
import Form from './components/Form';
import Update from './components/Update'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([

  {
    path: "/",
    element: <Panel />,
    
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/viewSlog",
    element: <ViewSLog />,
  },
  {
    path: "/search",
    element: <Searchh />,
  },
  {
    path: "/screening",
    element: <Screening />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/log",
    element: <Log />,
  },
  {
    path: "/user_register",
    element: <UserRegister />,
  },
  {
    path: "/admin_login",
    element: <AdminLogin />,
  },
  {
    path: "/admin_register",
    element: <AdminRegister />,
  },
  {
    path: "/user_login",
    element: <UserLogin />,
  },
  {
    path: "/management",
    element: <Management />,
  },
  {
    path: "/match",
    element: <Match />,
  },
  {
    path: "/edit/:id",
    element: <EditRegister />,
  },
  {
    path: "/SearchLog",
    element: <SearchLog />,
  },
  {
    path: "/home2",
    element: <Home2 />,
  },
  {
    path: "/logview/:id",
    element: <LogView />,
  },
  {
    path: "/update/:plate_no",
    element: <EditRegister />,
  },

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <React.StrictMode>

          <RouterProvider router={router}/> 
 </React.StrictMode>
);
 reportWebVitals();
