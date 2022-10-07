import "./sidebar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useContext } from "react";

const Sidebar = () => {

const logout =()=>{

  localStorage.clear();
  window.location.href = '/';
}

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr className="horizontal"/>
      <div className="center">
        <ul className="unorderedlist">
        
         
         
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
        
          
         
         
          <li>
            <ExitToAppIcon    onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to logout"
    )
    if (confirmBox === true) {
     logout();
    }
  }} className="icon" />
            <span  onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to logout"
    )
    if (confirmBox === true) {
     logout();
    }
  }}>Logout</span>
          </li>
          
        </ul>
      </div>
      <div className="bottom">
        
        
      </div>
    </div>
  );
};

export default Sidebar;