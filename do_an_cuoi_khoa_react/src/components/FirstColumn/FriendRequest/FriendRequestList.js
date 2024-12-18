import React, { useState } from "react";
import "./FriendRequestList.css";
import Navigation from "../../Navigation/Navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, message } from "antd";

const FriendRequestList = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("loggedInUserId"); //receiver

  // Hàm fetch dữ liệu user và các yêu cầu kết bạn
  const fetchFriendRequestList = async () => {
    // Lấy thông tin của user hiện tại
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${userId}`
    );

    // Lấy thông tin chi tiết từng ID trong danh sách IncomingFriendRequest
    const friendRequests = await Promise.all(
      userData.IncomingFriendRequest.map((friendId) =>
        axios
          .get(`http://localhost:3000/users/${friendId}`)
          .then((res) => res.data)
      )
    );

    return friendRequests; // Trả về danh sách thông tin chi tiết
  };
  const handleAcceptFriendRequest = async (friendId) => {
    setLoading(true);
    try {
      const responseSender = await fetch(
        `http://localhost:3000/users/${friendId}`
      );
      const responseReceiver = await fetch(
        `http://localhost:3000/users/${userId}`
      );
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      // Cập nhật danh sách bạn bè và xóa lời mời kết bạn
      const updatedSender = {
        ...userDataSender,
        friends: [...(userDataSender.friends || []), userId],
        OutcomingFriendRequest: userDataSender.OutcomingFriendRequest.filter(
          (id) => id !== userId
        ),
      };

      const updatedReceiver = {
        ...userDataReceiver,
        friends: [...(userDataReceiver.friends || []), friendId],
        IncomingFriendRequest: userDataReceiver.IncomingFriendRequest.filter(
          (id) => id !== friendId
        ),
      };

      // Cập nhật dữ liệu người gửi
      await fetch(`http://localhost:3000/users/${friendId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSender),
      });

      // Cập nhật dữ liệu người nhận
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReceiver),
      });

      // Hiển thị thông báo thành công
      message.success("Đã chấp nhận lời mời kết bạn!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
      message.error("Lỗi khi chấp nhận lời mời kết bạn!");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectFriendRequest = async (friendId) => {
    setLoading(true);
    try {
      const responseSender = await fetch(
        `http://localhost:3000/users/${friendId}`
      );
      const responseReceiver = await fetch(
        `http://localhost:3000/users/${userId}`
      );
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      // Cập nhật danh sách bạn bè và xóa lời mời kết bạn
      const updatedSender = {
        ...userDataSender,

        OutcomingFriendRequest: userDataSender.OutcomingFriendRequest.filter(
          (id) => id !== userId
        ),
      };

      const updatedReceiver = {
        ...userDataReceiver,

        IncomingFriendRequest: userDataReceiver.IncomingFriendRequest.filter(
          (id) => id !== friendId
        ),
      };

      // Cập nhật dữ liệu người gửi
      await fetch(`http://localhost:3000/users/${friendId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSender),
      });

      // Cập nhật dữ liệu người nhận
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReceiver),
      });

      // Hiển thị thông báo thành công
      message.success("Đã từ chối lời mời kết bạn!");
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      message.error("Lỗi khi từ chối lời mời kết bạn!");
    } finally {
      setLoading(false);
    }
  };
  // Sử dụng React Query để quản lý dữ liệu
  const query = useQuery({
    queryKey: ["friendRequests", userId],
    queryFn: fetchFriendRequestList,
  });

  const { data, error, isLoading } = query;

  // Xử lý trạng thái khi đang loading hoặc lỗi
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // Hiển thị danh sách yêu cầu kết bạn
  return (
    <>
      <Navigation />

      <div className="FriendRequestList-container">
        <h1>Friend Requests</h1>

        <div className="friendRequestUnique">
          {data.map((friend) => (
            <div key={friend.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  
                }}
              >
                <div style={{ display: "flex", justifyContent:'space-between', width:'200px' }}>
                  <img src={friend.avatar}></img>
                  <h2>{friend.nickname}</h2>
                </div>
            
                <div>
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => handleAcceptFriendRequest(friend.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    loading={loading}
                    type="primary"
                    danger
                    onClick={() => handleRejectFriendRequest(friend.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendRequestList;
