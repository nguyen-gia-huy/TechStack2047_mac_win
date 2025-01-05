import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
// Đường dẫn thay đổi tùy thuộc vào nơi bạn lưu AuthContext

const UserProfile = () => {
  const { userCurrent, userID, setUserCurrent } = useAuth(); // Sử dụng `setUserCurrent` để cập nhật thông tin người dùng
  const [formData, setFormData] = useState({
    name: userCurrent.username,
    email: userCurrent.email,
  });
  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData({ ...formData, [username]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userID}`, // URL API để cập nhật thông tin
        formData
      );
      setUserCurrent(response.data); // Cập nhật thông tin người dùng trong Context
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };
  return (
    <div>
      <h1>Thông tin người dùng</h1>

      <form onSubmit={handleSubmit}>
        <div>Tên: {userCurrent.username}</div>
        <div>Email: {userCurrent.email}</div>
        <div>User ID: {userID}</div>
      </form>
    </div>
  );
};

export default UserProfile;
