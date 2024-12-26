import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaUserFriends, FaUserPlus, FaStore } from "react-icons/fa";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { MdGroups3, MdOndemandVideo } from "react-icons/md";
const Sidebar = () => {
  // Lấy userId từ localStorage
  const userId = localStorage.getItem("loggedInUserId");

  return (
    <div className="first-colum">
      <ul
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "15px",
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
        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to=""
          className="nav-link"
        >
          <MdGroups3
            style={{
              backgroundColor: "#6A6D64",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Groups
        </Link>
        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to=""
          className="nav-link"
        >
          <FaStore
            style={{
              backgroundColor: "#44BA5E",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Market
        </Link>
        <Link
          style={{ marginTop: "20px", color: "gray" }}
          to=""
          className="nav-link"
        >
          <MdOndemandVideo
            style={{
              backgroundColor: "#C53718",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Videos
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
            marginBottom: "15px",
          }}
        >
          Account
        </span>
        {/* <Link
          style={{ marginTop: "20px", color: "gray" }}
          to="/notification"
          className="nav-link"
        >
          <IoNotificationsOutline
            style={{
              backgroundColor: "#F2BF4B",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
              marginBottom: "15px",
            }}
          />
         Notification
        </Link> */}
        <Link to="/setting">
          {" "}
          <IoSettingsOutline
            style={{
              backgroundColor: "#F0156B",
              color: "white",
              width: "45px",
              height: "45px",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          Settings
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
