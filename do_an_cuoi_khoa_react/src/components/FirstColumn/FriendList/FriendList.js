import React from "react";
import Navigation from "../../Navigation/Navigation";
import "./FriendList.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, message } from "antd";
import { Link } from "react-router-dom";

const FriendList = () => {
  const userIdSender = localStorage.getItem("loggedInUserId");

  const fetchFriendList = async () => {
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${userIdSender}`
    );
    const friendList = await Promise.all(
      userData.friends.map((friendId) =>
        axios
          .get(`http://localhost:3000/users/${friendId}`)
          .then((res) => res.data)
      )
    );
    return friendList;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["friends", userIdSender],
    queryFn: fetchFriendList,
    enabled: !!userIdSender, // Ngăn chặn fetch nếu userIdSender là null
  });

  const handleDeleteFriend = async (friendId) => {
    try {
      const responseSender = await fetch(
        `http://localhost:3000/users/${userIdSender}`
      );
      const responseReceiver = await fetch(
        `http://localhost:3000/users/${friendId}`
      );
      const userDataSender = await responseSender.json();
      const userDataReceiver = await responseReceiver.json();

      const updatedSender = {
        ...userDataSender,
        friends: userDataSender.friends.filter((id) => id !== friendId),
      };
      const updatedReceiver = {
        ...userDataReceiver,
        friends: userDataReceiver.friends.filter((id) => id !== userIdSender),
      };

      await fetch(`http://localhost:3000/users/${userIdSender}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSender),
      });
      await fetch(`http://localhost:3000/users/${friendId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReceiver),
      });

      message.success("Đã hủy kết bạn!");
    } catch (error) {
      console.error("Error refuse friend :", error);
      message.error("Lỗi khi hủy kết bạn!");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="container">
      <Navigation />
      <div className="container-noidung">
        <h2>Friend List</h2>

        {/* Kiểm tra danh sách bạn bè */}
        {data.length > 0 ? (
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
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ marginRight: "20px", width: "120px" }}
                      src={friend.avatar || "default-avatar-url.png"}
                      alt="Avatar"
                    />
                    <Link to={`/profile/${friend.id}`}>
                      <h4>{friend.nickname || "No nickname"}</h4>
                    </Link>
                  </div>
                  <Button
                    style={{
                      width: "200px",
                      marginRight: "10px",
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteFriend(friend.id)}
                  >
                    Hủy kết bạn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Hiển thị thông báo khi danh sách bạn bè trống
          <span>Let's find people you know</span>
        )}
      </div>
    </div>
  );
};

export default FriendList;
