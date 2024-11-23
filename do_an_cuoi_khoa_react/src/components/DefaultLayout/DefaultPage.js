import React from "react";
import Navigation from "../Navigation/Navigation";
import { Route, Router, Routes } from "react-router-dom";
import Sidebar from "../FirstColumn/Sidebar";
import Post from "../SecondColumn/Post";
import ThirdColunms from "../ThirdColumn/ThirdColunms";
import './DefaultPage.css'
const DefaultPage = () => {
  return (
  <> <header style={{ position:'fixed'}}><Navigation style={{with:'100vw'}}></Navigation> </header> 
  <>
 
  <div className="defaultContainer" style={{  display:'flex', flexWrap:'nowrap', justifyContent:'center'}}>
  <div className="sidebar" >
    <Sidebar />
  </div>
  <div className="post-default">
    <Post />
  </div>
  <div className="third-column" >
    <ThirdColunms />
  </div>
</div>

</></>
  );
};

export default DefaultPage;
