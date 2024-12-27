import { Button, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [incomingFriendRequest, setIncomingFriendRequest] = useState(false); // Trạng thái kiểm tra lời mời đến
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
        if (
          sender.friends.includes(userId) &&
          receiver.friends.includes(userIdSender)
        ) {
          setIsFriend(true);
        }

        // Kiểm tra trạng thái lời mời kết bạn
        if (
          sender.OutcomingFriendRequest?.includes(userId) ||
          receiver.IncomingFriendRequest?.includes(userIdSender)
        ) {
          setFriendRequestSent(true);
        }

        // Kiểm tra nếu người dùng khác đã gửi lời mời kết bạn
        if (receiver.OutcomingFriendRequest?.includes(userIdSender)) {
          setIncomingFriendRequest(true);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái:", error);
      }
    };

    checkStatus();
  }, [userIdSender, userId]);

  // Gửi lời mời kết bạn
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
            OutcomingFriendRequest: sender.OutcomingFriendRequest.filter(
              (id) => id !== userId
            ),
          }),
          axios.put(`http://localhost:3000/users/${userId}`, {
            ...receiver,
            IncomingFriendRequest: receiver.IncomingFriendRequest.filter(
              (id) => id !== userIdSender
            ),
          }),
        ]);
        message.success("Friend Request Cancelled!");
      } else {
        // Gửi lời mời kết bạn
        await Promise.all([
          axios.put(`http://localhost:3000/users/${userIdSender}`, {
            ...sender,
            OutcomingFriendRequest: [
              ...(sender.OutcomingFriendRequest || []),
              userId,
            ],
          }),
          axios.put(`http://localhost:3000/users/${userId}`, {
            ...receiver,
            IncomingFriendRequest: [
              ...(receiver.IncomingFriendRequest || []),
              userIdSender,
            ],
          }),
        ]);
        message.success("Friend Request Sent!");
      }

      setFriendRequestSent(!friendRequestSent);
    } catch (error) {
      console.error("Error sending friend request:", error);
      message.error("Error sending friend request!");
    } finally {
      setLoading(false);
    }
  };

  // Chấp nhận lời mời kết bạn
  const handleAcceptFriendRequest = async () => {
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
          friends: [...(sender.friends || []), userId],
          IncomingFriendRequest: sender.IncomingFriendRequest.filter(
            (id) => id !== userId
          ),
        }),
        axios.put(`http://localhost:3000/users/${userId}`, {
          ...receiver,
          friends: [...(receiver.friends || []), userIdSender],
          OutcomingFriendRequest: receiver.OutcomingFriendRequest.filter(
            (id) => id !== userIdSender
          ),
        }),
      ]);

      message.success("Friend Request Accepted!");
      setIsFriend(true);
      setIncomingFriendRequest(false);
    } catch (error) {
      console.error("Error accepting friend request:", error);
      message.error("Error accepting friend request!");
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

      message.success("Unfriend successful!");
      setIsFriend(false);
    } catch (error) {
      console.error("Error unfriending:", error);
      message.error("Error unfriending!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
    onClick={
      isFriend
        ? handleDeleteFriend
        : incomingFriendRequest
        ? handleAcceptFriendRequest
        : handleSendFriendRequest
    }
    loading={loading}
    style={{
      width: "300px",
      backgroundColor: isFriend ? "red" : undefined, // Thay đổi màu nếu là bạn bè
    }}
    type="primary"
  >
    {isFriend
      ? "Unfriend"
      : incomingFriendRequest
      ? "Accept Friend Request"
      : friendRequestSent
      ? "Cancel Friend Request"
      : "Send Friend Request"}
  </Button>
  
  );
};

export default AddFriend;
