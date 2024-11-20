import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div
      style={{
        border: "2px solid black",
        width: "300px",
        height: "100vh",
      }}
    >
      <nav className="sidebar">
        <Link to={"/profile"}>Profile</Link>
        <a className="nav-link" href="#">
          your frend
        </a>
        <a className="nav-link" href="#">
          Add new blog
        </a>
       
      </nav>
    </div>
  );
};

export default Sidebar;
