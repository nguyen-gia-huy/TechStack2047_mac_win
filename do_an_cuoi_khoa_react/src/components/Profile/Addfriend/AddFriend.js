import { Button, message } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const userIdSender = localStorage.getItem("loggedInUserId");
  const { userId } = useParams(); // Đây là userId của người nhận

  const handleSendFriendRequest = async () => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      // Lấy dữ liệu của cả hai người dùng
      const responseSender = await fetch(`http://localhost:3000/users/${userIdSender}`);
      const responseReceiver = await fetch(`http://localhost:3000/users/${userId}`);
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      // Cập nhật dữ liệu cho người gửi
      const updatedSender = {
        ...userDataSender,
        OutcomingFriendRequest: [
          ...(userDataSender.OutcomingFriendRequest || []),
          userId,
        ],
      };

      // Cập nhật dữ liệu cho người nhận
      const updatedReceiver = {
        ...userDataReceiver,
        IncomingFriendRequest: [
          ...(userDataReceiver.IncomingFriendRequest || []),
          userIdSender,
        ],
      };

      // Gửi dữ liệu cập nhật lên server
      await fetch(`http://localhost:3000/users/${userIdSender}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSender),
      });

      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReceiver),
      });

      // Hiển thị thông báo thành công
      message.success("Gửi lời mời kết bạn thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi lời mời kết bạn:", error);
      message.error("Gửi lời mời kết bạn thất bại!");
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <Button
      onClick={handleSendFriendRequest}
      loading={loading}
      style={{ width: "300px" }}
      type="primary"
    >
      Add Friend
    </Button>
  );
};

export default AddFriend;
