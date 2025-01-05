import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Button, Input, message, DatePicker, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
// Hàm để lấy dữ liệu người dùng từ API
const fetchData = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await fetch(`http://localhost:8080/users/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch profile data. Status: ${response.status}`);
  }

  return response.json();
};
const UserProfile = () => {
  const { userCurrent, userID, setUserCurrent } = useAuth();
  const userId = userCurrent.id;
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState(null);
  const [newGender, setNewGender] = useState(""); // Thêm state để lưu giới tính
  const [newAddress, setNewAddress] = useState(""); // Thêm state để lưu giới tính
  // Sử dụng React Query để lấy dữ liệu người dùng
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: fetchData,
    enabled: !!userId,
    onError: (err) => {
      console.error("Error fetching data:", err);
      message.error(err.message);
    },
  });

  // Hàm cập nhật tên người dùng
  const handleChangeName = async () => {
    try {
      const { data: userData } = await axios.get(
        ` http://localhost:3000/users/${userId}`
      );

      const updatedUserName = { ...userData, username: newName };

      const response = await axios.put(
        ` http://localhost:3000/users/${userId}`,
        updatedUserName
      );

      if (response.status === 200) {
        message.success("Name updated successfully");
      } else {
        message.error("Failed to update name");
      }
    } catch (err) {
      message.error(`Error: ${err.message}`);
    }
  };

  // Hàm cập nhật email người dùng
  const handleChangeEmail = async () => {
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`
      );

      const updatedUserEmail = { ...userData, email: newEmail };

      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserEmail
      );

      if (response.status === 200) {
        message.success("Email updated successfully");
      } else {
        message.error("Failed to update email");
      }
    } catch (err) {
      message.error(`Error: ${err.message}`);
    }
  };

  // Hàm cập nhật ngày sinh người dùng
  const handleChangeDateOfBirth = async () => {
    try {
      const { data: userData } = await axios.get(
        ` http://localhost:3000/users/${userId}`
      );
      const updatedUserDateOfBirth = {
        ...userData,
        dateOfBirth: newDateOfBirth.format("YYYY-MM-DD"), // Chuyển định dạng ngày
      };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserDateOfBirth
      );
      message.success("Date of Birth changed successfully!");
    } catch (error) {
      console.error("Error when changing date of birth:", error);
      message.error("Failed to change date of birth. Please try again later.");
    }
  };

  // Hàm cập nhật giới tính người dùng
  const handleChangeGender = async () => {
    try {
      const { data: userData } = await axios.get(
        ` http://localhost:3000/users/${userId}`
      );
      const updatedUserGender = {
        ...userData,
        gender: newGender,
      };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserGender
      );
      message.success("Gender updated successfully!");
    } catch (error) {
      console.error("Error when changing gender:", error);
      message.error("Failed to change gender. Please try again later.");
    }
  };
  const renderRole = (role) => {
    return role === "admin" ? "Admin" : "Free User";
  };
  const handleChangeAddress = async () => {
    try {
      const { data: userData } = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      const updatedUserAddress = {
        ...userData,
        address: newAddress,
      };
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedUserAddress
      );
      message.success("Address updated successfully!");
    } catch (error) {
      console.error("Error when changing address:", error);
      message.error("Failed to change address. Please try again later.");
    }
  };
  // Hàm xử lý submit form
  const handleSubmit = () => {
    if (newName && newName !== data.username) {
      handleChangeName();
    }
    if (newEmail && newEmail !== data.email) {
      handleChangeEmail();
    }
    if (
      newDateOfBirth &&
      newDateOfBirth.format("YYYY-MM-DD") !== data.dateOfBirth
    ) {
      handleChangeDateOfBirth();
    }
    if (newGender && newGender !== data.gender) {
      handleChangeGender();
    }
    if (newAddress && newAddress !== data.address) {
      handleChangeAddress();
    }
  };

  // Khi data được tải thành công, chuyển đổi ngày sinh từ chuỗi sang moment object
  const initialDateOfBirth = data?.dateOfBirth
    ? moment(data.dateOfBirth) // Chuyển đổi ngày sinh từ chuỗi sang moment
    : null;

  return (
    <div className="col-md-10 col-lg-8 pb-2 text-left bg-white">
      <div
        className="col-12 p-1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Thông Tin Cá Nhân</h2>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <form>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Họ và tên:</label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="username"
              value={newName || data.username}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Email:</label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="email"
              value={newEmail || data.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Giới tính:</label>
            <Select
              style={{ width: "80%" }}
              value={newGender || data.gender}
              onChange={(value) => setNewGender(value)} // Lưu giá trị giới tính khi thay đổi
              placeholder="Select your gender"
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Ngày sinh:</label>
            <DatePicker
              style={{ width: "80%" }}
              value={newDateOfBirth || initialDateOfBirth} // Gán giá trị ngày sinh từ dữ liệu
              onChange={(date) => setNewDateOfBirth(date)} // Cập nhật ngày khi người dùng chọn
            />
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Phân Quyền:</label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="role"
              value={renderRole(data?.role)} // Gọi hàm renderRole
              disabled // Không cho phép chỉnh sửa
            />
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label className="col-3 col-form-label p-1">Address:</label>
            <Input
              style={{ width: "80%" }}
              size="large"
              name="address"
              value={newAddress || data.address}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div
            className="col-12 p-1 justify-content-start d-flex"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={handleSubmit}>
              Cập nhật thông tin
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
