import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  // Lấy userId từ localStorage
  const userId = localStorage.getItem("loggedInUserId");

  return (
    <div className="first-colum" >
      <ul
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        marginBottom:'15px'
        }}
      >
        <span
          style={{
            display: "flex",
            fontSize: "20px",
            color: "gray",
          }}
        >
          New feeds
        </span>
        {/* Chuyển đường dẫn tới Profile */}
        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to={`/profile/${userId}`}
          className="nav-link"
        >
          <FaUser
            style={{
              backgroundColor: "#0369D9",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Profile
        </Link>

        {/* Các liên kết khác */}
        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to="/friends-list"
          className="nav-link"
        >
          <FaUserFriends
            style={{
              backgroundColor: "#F43659",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Your Friends
        </Link>

        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to="/friends-request-list"
          className="nav-link"
        >
          <FaUserPlus
            style={{
              backgroundColor: "#F2BF4B",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Friend Request List
        </Link>
      </ul>
      <ul
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}

      >
         <span
          style={{
            display: "flex",
            fontSize: "20px",
            color: "gray",
            marginBottom:'15px'
          }}
        >
          Account
        </span>
        <Link to="/setting" > <IoSettingsOutline style={{
              backgroundColor: "#F0156B",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}/>Settings</Link>
      </ul>
    </div>
  );
};

export default Sidebar;
