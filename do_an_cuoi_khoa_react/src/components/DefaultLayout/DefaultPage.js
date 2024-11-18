import React from "react";
import Navigation from "../Navigation/Navigation";
import { Route, Router, Routes } from "react-router-dom";
import Sidebar from "../FirstColumn/Sidebar";
import Post from "../SecondColumn/Post";
import ThirdColunms from "../ThirdColumn/ThirdColunms";
import './DefaultPage'
const DefaultPage = () => {
  return (
    <>
      <Navigation style={{with:'100vw'}}></Navigation>
      <div  style={{ display: "flex", flexWrap:'wrap', padding:"30px", width:"100vw",justifyContent: "space-between"}}>
        <div className="sidebar" >
          <Sidebar></Sidebar>
        </div>
        <div className="post">
          <Post />
        </div>
        <div className="third-column">
          <ThirdColunms />
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
