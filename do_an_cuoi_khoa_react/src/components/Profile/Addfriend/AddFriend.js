import { Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false); // Trạng thái gửi lời mời
  const userIdSender = localStorage.getItem("loggedInUserId");
  const { userId } = useParams(); // Đây là userId của người nhận

  // Kiểm tra xem người gửi đã gửi lời mời hay chưa
  useEffect(() => {
    const checkFriendRequestStatus = async () => {
      const responseSender = await fetch(`http://localhost:3000/users/${userIdSender}`);
      const responseReceiver = await fetch(`http://localhost:3000/users/${userId}`);
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      // Kiểm tra nếu người gửi đã gửi lời mời
      if (userDataSender.OutcomingFriendRequest.includes(userId) || userDataReceiver.IncomingFriendRequest.includes(userIdSender)) {
        setFriendRequestSent(true); // Đánh dấu là đã gửi lời mời
      }
    };

    checkFriendRequestStatus();
  }, [userIdSender, userId]);

  const handleSendFriendRequest = async () => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const responseSender = await fetch(`http://localhost:3000/users/${userIdSender}`);
      const responseReceiver = await fetch(`http://localhost:3000/users/${userId}`);
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      if (friendRequestSent) {
        // Hủy lời mời nếu đã gửi
        const updatedSender = {
          ...userDataSender,
          OutcomingFriendRequest: userDataSender.OutcomingFriendRequest.filter(id => id !== userId),
        };
        const updatedReceiver = {
          ...userDataReceiver,
          IncomingFriendRequest: userDataReceiver.IncomingFriendRequest.filter(id => id !== userIdSender),
        };

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

        message.success("Lời mời kết bạn đã bị hủy!");
      } else {
        // Gửi lời mời kết bạn
        const updatedSender = {
          ...userDataSender,
          OutcomingFriendRequest: [
            ...(userDataSender.OutcomingFriendRequest || []),
            userId,
          ],
        };

        const updatedReceiver = {
          ...userDataReceiver,
          IncomingFriendRequest: [
            ...(userDataReceiver.IncomingFriendRequest || []),
            userIdSender,
          ],
        };

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

        message.success("Gửi lời mời kết bạn thành công!");
      }

      // Toggle trạng thái lời mời
      setFriendRequestSent(!friendRequestSent);
    } catch (error) {
      console.error("Lỗi khi gửi hoặc hủy lời mời kết bạn:", error);
      message.error("Lỗi khi xử lý lời mời kết bạn!");
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
      {friendRequestSent ? "Sent , click one more to reject" : "Add Friend"}
    </Button>
  );
};

export default AddFriend;
