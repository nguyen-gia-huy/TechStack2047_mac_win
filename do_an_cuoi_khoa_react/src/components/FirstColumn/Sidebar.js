import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  // Lấy userId từ localStorage
  const userId = localStorage.getItem("loggedInUserId");

  return (
    <div className="first-colum">
      <nav>
        {/* Chuyển đường dẫn tới Profile */}
        <Link to={`/profile/${userId}`} className="nav-link">
          Profile
        </Link>
        
        {/* Các liên kết khác */}
        <Link to="/friends-list" className="nav-link" >
          Your Friends 
        </Link>
        <Link to="/add-blog" className="nav-link">
          Add New Blog
        </Link>
        <Link to="/friends-request-list" className="nav-link">
          Friend Request List
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
