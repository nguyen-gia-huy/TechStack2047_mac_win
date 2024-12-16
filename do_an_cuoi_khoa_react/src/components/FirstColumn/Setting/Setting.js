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
        <h3>Settings</h3>
        <ul style={{display:'flex', flexDirection:'column'}}>
          <Link to="/setting/changepassword"> <MdOutlinePassword />Change Password</Link>
          <Link><GrDocumentUpdate />Update Profile</Link>
          <Link><CgMoreR />Other Settings</Link>
        </ul>
      </div>
    </div>
  );
};

export default Setting;
