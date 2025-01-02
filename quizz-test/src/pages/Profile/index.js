import React, { useEffect } from "react";

const featchData = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(`http://localhost:3001/api/user/${user}`);
  if (!response.ok) throw new Error("Failed to fetch profile data");
  return response.json();
};
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return <h1>Profile</h1>;
};

export default Profile;
