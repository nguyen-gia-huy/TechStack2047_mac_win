import { useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

const fetchData = async ({ queryKey }) => {
  const userId = queryKey[1]; // Lấy userId từ queryKey
  const response = await fetch(`http://localhost:3000/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }

  return response.json();
};

const Profile = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("loggedUserId");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: fetchData,
    enabled: !!userId,
    onError: (err) => {
      message.error(err.message);
    },
  });

  // Console log for debugging
  console.log("Data:", data);
  console.log("Loading:", isLoading);
  console.log("Error:", isError);
  console.log("Error message:", error?.message);

  return (
    <div>
      <h1>User ID: {userId}</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>user name: {data.username}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
