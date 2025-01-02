import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";

const fetchData = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await fetch(`http://localhost:3000/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }

  return response.json();
};

const Profile = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("loggedUserId");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: fetchData,
    enabled: !!userId,
    onError: (err) => {
      message.error(err.message);
    },
  });

  const handleChangeName = async () => {
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`,
        {}
      );
      const updatedUserName = { ...userData, username: newName };
      await axios.put(`http://localhost:3000/users/${userId}`, updatedUserName);
      message.success("Name updated successfully");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleChangeEmail = async () => {
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`,
        {}
      );
      const updatedUserEmail = { ...userData, email: newEmail };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserEmail
      );
      message.success("Email updated successfully");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleSubmit = () => {
    if (newName && newName !== data.username) {
      handleChangeName();
    }
    if (newEmail && newEmail !== data.email) {
      handleChangeEmail();
    }
  };

  return (
    <div>
      <h1>User ID: {userId}</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <form>
          <div className="col-12 p-1 justify-content-start d-flex">
            <label className="col-3 col-form-label p-1">
              <strong>Họ và tên:</strong>
            </label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="username"
              value={newName || data.username}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="col-12 p-1 justify-content-start d-flex">
            <label className="col-3 col-form-label p-1">
              <strong>Email:</strong>
            </label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="email"
              value={newEmail || data.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="col-12 p-1 justify-content-start d-flex">
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
