import React, { useState } from "react";
import "./ChangeProfile.css";
import Navigation from "../../../Navigation/Navigation";
import { Button, DatePicker, Input, message } from "antd";
import axios from "axios";

const ChangeProfile = () => {
  const userId = localStorage.getItem("loggedInUserId"); // Lấy userId từ localStorage
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState(null); // Chứa ngày sinh (moment object)

  const handleChangeName = async () => {
    if (!newName) {
      message.error("Plese fill in your new name");
      return;
    }
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      const updatedUserName = { ...userData, nickname: newName };
      await axios.put(`http://localhost:3000/users/${userId}`, updatedUserName);
      message.success("Name changed successfully!");
      setNewName("");
    } catch (error) {
      console.error("Error when changing name:", error);
      message.error("Failed to change name. Please try again later.");
    }
  };
  const handleChangeEmail = async () => {
    if (!newEmail) {
      message.error("Plese fill in your new email");
      return;
    }
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      const updatedUserEmail = { ...userData, email: newEmail };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserEmail
      );
      message.success("Email changed successfully!");
      setNewEmail("");
    } catch (error) {
      console.error("Error when changing email:", error);
      message.error("Failed to change email. Please try again later.");
    }
  };
  const handleChangeDateOfBirth = async () => {
    if (!newDateOfBirth) {
      message.error("Plese fill in your new date of birth");
      return;
    }
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      const updatedUserDateOfBirth = {
        ...userData,
        dateOfBirth: newDateOfBirth.format("YYYY-MM-DD"),
      };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserDateOfBirth
      );
      message.success("Date of Birth changed successfully!");
      setNewDateOfBirth(null); // Reset field sau khi cập nhật thành công
    } catch (error) {
      console.error("Error when changing date of birth:", error);
      message.error("Failed to change date of birth. Please try again later.");
    }
  };
  return (
    <div className="body-setting-profile">
      <Navigation />
      <div className="changePro-container">
        <h3>Change Profile</h3>
        Name
        <Input
          style={{ marginBottom: "15px" }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
        />
        <Button type="primary" onClick={handleChangeName}>
          Update Name
        </Button>
        Email
        <Input
          style={{ marginBottom: "15px" }}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
        />
        <Button type="primary" onClick={handleChangeEmail}>
          Update Email
        </Button>
        Date of Birth
        <DatePicker
          style={{ marginBottom: "15px" }}
          value={newDateOfBirth} // Bind value từ state
          onChange={(date) => setNewDateOfBirth(date)} // Cập nhật state khi chọn ngày
          placeholder="Select your new date of birth"
        />
        <Button type="primary" onClick={handleChangeDateOfBirth}>
          Update Date Of Birth
        </Button>
      </div>
    </div>
  );
};

export default ChangeProfile;
