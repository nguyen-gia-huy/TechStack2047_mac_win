import React, { useState } from 'react';
import Navigation from '../../../Navigation/Navigation';
import './ChangePassword.css';
import { Input, Button, message } from 'antd';
import axios from 'axios';

const ChangePassword = () => {
  const userId = localStorage.getItem('loggedInUserId'); // Lấy userId từ localStorage
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error('Please fill in all fields!');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      // Lấy thông tin người dùng từ JSON Server
      const { data: userData } = await axios.get(`http://localhost:3000/users/${userId}`);

      // Kiểm tra mật khẩu cũ có khớp không
      if (oldPassword !== userData.password) {
        message.error('Old password is incorrect!');
        return;
      }

      // Kiểm tra mật khẩu mới có trùng mật khẩu cũ không
      if (newPassword === oldPassword) {
        message.error('New password cannot be the same as the old password!');
        return;
      }

      // Cập nhật mật khẩu
      const updatedUser = { ...userData, password: newPassword };
      await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);

      // Thông báo thành công
      message.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error when changing password:', error);
      message.error('Failed to change password. Please try again later.');
    }
  };

  return (
    <div className="body-setting-pass">
      <Navigation />
      <div className="changePass-container">
        <h3>Change Password</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input.Password
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="primary" onClick={handleChangePassword}>
            Update Password
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default ChangePassword;
