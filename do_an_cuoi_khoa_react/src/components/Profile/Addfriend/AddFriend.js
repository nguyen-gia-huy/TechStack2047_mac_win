import { Button, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false); // Kiểm tra trạng thái bạn bè
  const userIdSender = localStorage.getItem("loggedInUserId");
  const { userId } = useParams(); // ID người nhận

  // Kiểm tra trạng thái bạn bè và lời mời
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const [senderData, receiverData] = await Promise.all([
          axios.get(`http://localhost:3000/users/${userIdSender}`),
          axios.get(`http://localhost:3000/users/${userId}`),
        ]);

        const sender = senderData.data;
        const receiver = receiverData.data;

        // Kiểm tra trạng thái bạn bè
        if (sender.friends.includes(userId) && receiver.friends.includes(userIdSender)) {
          setIsFriend(true);
        }

        // Kiểm tra trạng thái lời mời kết bạn
        if (
          sender.OutcomingFriendRequest?.includes(userId) ||
          receiver.IncomingFriendRequest?.includes(userIdSender)
        ) {
          setFriendRequestSent(true);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái:", error);
      }
    };

    checkStatus();
  }, [userIdSender, userId]);

  // Gửi hoặc hủy lời mời kết bạn
  const handleSendFriendRequest = async () => {
    setLoading(true);
    try {
      const [senderData, receiverData] = await Promise.all([
        axios.get(`http://localhost:3000/users/${userIdSender}`),
        axios.get(`http://localhost:3000/users/${userId}`),
      ]);

      const sender = senderData.data;
      const receiver = receiverData.data;

      if (friendRequestSent) {
        // Hủy lời mời kết bạn
        await Promise.all([
          axios.put(`http://localhost:3000/users/${userIdSender}`, {
            ...sender,
            OutcomingFriendRequest: sender.OutcomingFriendRequest.filter((id) => id !== userId),
          }),
          axios.put(`http://localhost:3000/users/${userId}`, {
            ...receiver,
            IncomingFriendRequest: receiver.IncomingFriendRequest.filter((id) => id !== userIdSender),
          }),
        ]);
        message.success("Friend Request Cancelled!");
      } else {
        // Gửi lời mời kết bạn
        await Promise.all([
          axios.put(`http://localhost:3000/users/${userIdSender}`, {
            ...sender,
            OutcomingFriendRequest: [...(sender.OutcomingFriendRequest || []), userId],
          }),
          axios.put(`http://localhost:3000/users/${userId}`, {
            ...receiver,
            IncomingFriendRequest: [...(receiver.IncomingFriendRequest || []), userIdSender],
          }),
        ]);
        message.success("Friend Request Success!");
      }

      setFriendRequestSent(!friendRequestSent);
    } catch (error) {
      console.error("Error sendding friend request:", error);
      message.error("Error sendding friend request!");
    } finally {
      setLoading(false);
    }
  };

  // Hủy bạn bè
  const handleDeleteFriend = async () => {
    setLoading(true);
    try {
      const [senderData, receiverData] = await Promise.all([
        axios.get(`http://localhost:3000/users/${userIdSender}`),
        axios.get(`http://localhost:3000/users/${userId}`),
      ]);

      const sender = senderData.data;
      const receiver = receiverData.data;

      await Promise.all([
        axios.put(`http://localhost:3000/users/${userIdSender}`, {
          ...sender,
          friends: sender.friends.filter((id) => id !== userId),
        }),
        axios.put(`http://localhost:3000/users/${userId}`, {
          ...receiver,
          friends: receiver.friends.filter((id) => id !== userIdSender),
        }),
      ]);
      message.success("Unfriend succes!");
      setIsFriend(false);
    } catch (error) {
      console.error("Error Unfriend:", error);
      message.error("Error Unfriend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={isFriend ? handleDeleteFriend : handleSendFriendRequest}
      loading={loading}
      style={{ width: "300px" }}
      type="primary"
    >
      {isFriend ? "Unfriend" : friendRequestSent ? "Cancel Friend Request" : "Send Friend Request"}
    </Button>
  );
};

export default AddFriend;
