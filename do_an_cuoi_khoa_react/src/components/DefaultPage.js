import React from "react";
import Navigation from "./Navigation/Navigation";
import { Route, Router, Routes } from "react-router-dom";
import Sidebar from "./FirstColumn/Sidebar";
import Post from "./SecondColumn/Post";
import ThirdColunms from "./ThirdColumn/ThirdColunms";

const DefaultPage = () => {
  return (
    <>
      <Navigation></Navigation>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Sidebar></Sidebar>
        </div>
        <div>
          <Post />
        </div>
        <div>
          <ThirdColunms />
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
