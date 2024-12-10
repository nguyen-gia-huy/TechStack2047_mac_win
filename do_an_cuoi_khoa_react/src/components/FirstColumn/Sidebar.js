import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaUserFriends, FaUserPlus  } from "react-icons/fa";

const Sidebar = () => {
  // Lấy userId từ localStorage
  const userId = localStorage.getItem("loggedInUserId");

  return (
    <div className="first-colum">
      <nav>
        {/* Chuyển đường dẫn tới Profile */}
        <Link to={`/profile/${userId}`} className="nav-link">
        <FaUser />
        Profile
        </Link>
        
        {/* Các liên kết khác */}
        <Link to="/friends-list" className="nav-link" >
        <FaUserFriends />
        Your Friends 
        </Link>
     
        <Link to="/friends-request-list" className="nav-link">
        <FaUserPlus />
        Friend Request List
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
