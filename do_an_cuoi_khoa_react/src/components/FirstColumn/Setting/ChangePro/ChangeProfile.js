import React, { useState } from "react";
import "./ChangeProfile.css";
import Navigation from "../../../Navigation/Navigation";
import { Button, DatePicker, Input, message } from "antd";

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
  };
  const handleChangeEmail = async () => {
    if (!newEmail) {
      message.error("Plese fill in your new email");
      return;
    }
  };
  const handleChangeDateOfBirth = async () => {
    if (!newDateOfBirth) {
      message.error("Plese fill in your new date of birth");
      return;
    }
  };
  return (
    <div className="body-setting-profile">
      <Navigation />
      <div className="changePro-container">
        <h3>Change Profile</h3>
        <div>
          Name
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
          <Button type="primary" onClick={handleChangeName}>
            Update Name
          </Button>
        </div>
        <div>
          Email
          <Input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
          />
          <Button type="primary" onClick={handleChangeEmail}>
            Update Name
          </Button>
        </div>
        <div>
          Date of Birth
          <DatePicker
            value={newDateOfBirth} // Bind value từ state
            onChange={(date) => setNewDateOfBirth(date)} // Cập nhật state khi chọn ngày
            placeholder="Select your date of birth"
          />
          <Button type="primary" onClick={handleChangeDateOfBirth}>
            Update Name
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
