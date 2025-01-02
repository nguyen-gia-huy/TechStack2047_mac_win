import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const fetchData = async ({ queryKey }) => {
  const userId = queryKey[1]; // Lấy userId từ queryKey
  const response = await fetch(`http://localhost:3001/api/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profile data");
  return response.json();
};
const Profile = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("loggedUserId");

  return (
    <>
      <h1>userID: {userId}</h1>
    </>
  );
};

export default Profile;
