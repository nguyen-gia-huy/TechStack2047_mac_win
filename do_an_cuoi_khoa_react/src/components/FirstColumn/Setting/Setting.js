import React from 'react';
import Navigation from '../../Navigation/Navigation';
import './Setting.css';
import { Link, Route, Routes } from 'react-router-dom';
import { MdOutlinePassword } from "react-icons/md";
import { CgMoreR } from "react-icons/cg";
import { GrDocumentUpdate } from "react-icons/gr";
const Setting = () => {
  const userId = localStorage.getItem("loggedInUserId");

  return (
    <div className='body-setting'>
      <Navigation />
      <div className="setting-container">
        <h3 >Settings</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link to="changepassword"> <MdOutlinePassword style={{
            backgroundColor: "#F43659",
            color: "white",
            width: "45px",
            height: "45px",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "50%",
          }} />Change Password</Link>
          <Link to={'changeprofile'}><GrDocumentUpdate style={{
            backgroundColor: "#F2BF4B",
            color: "white",
            width: "45px",
            height: "45px",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "50%",
          }} />Update Profile</Link>
          <Link><CgMoreR style={{
            backgroundColor: "#0369D9",
            color: "white",
            width: "45px",
            height: "45px",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "50%",
          }} />Other Settings</Link>
        </ul>
      </div>
    </div>
  );
};

export default Setting;
