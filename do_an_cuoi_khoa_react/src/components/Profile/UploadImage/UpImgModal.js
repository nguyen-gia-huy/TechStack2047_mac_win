import React, { useState, useContext } from "react";
import { Button, Modal } from "antd";
import UploadImage from "./UploadImage";
import { ProfileContext } from "../../../ProfileContext";
import "./index.css";
const UpImgModal = () => {
  const { profileData, setProfileData } = useContext(ProfileContext);

  const handleCoverUpload = async (base64Image) => {
    const updatedProfile = { ...profileData, coverPhoto: base64Image };
    setProfileData(updatedProfile);

    const userId = localStorage.getItem("loggedInUserId");
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coverPhoto: base64Image }),
    });
  };

  const handleAvatarUpload = async (base64Image) => {
    const updatedProfile = { ...profileData, avatar: base64Image };
    setProfileData(updatedProfile);

    const userId = localStorage.getItem("loggedInUserId");
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: base64Image }),
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{width:'300px', marginRight:'10px'}} className="modal-btn" type="primary" onClick={showModal}>
        Upload Picture
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UploadImage type="cover" onImageUpload={handleCoverUpload} />
        <UploadImage type="avatar" onImageUpload={handleAvatarUpload} />
      </Modal>
    </>
  );
};

export default UpImgModal;
