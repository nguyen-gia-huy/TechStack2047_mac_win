import React from "react";
import "./FriendRequestList.css";
import Navigation from "../../Navigation/Navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Sidebar from "../Sidebar";

const FriendRequestList = () => {
  const userId = localStorage.getItem("loggedInUserId");

  // Hàm fetch dữ liệu user và các yêu cầu kết bạn
  const fetchFriendRequestList = async () => {
    // Lấy thông tin của user hiện tại
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${userId}`
    );

    // Lấy thông tin chi tiết từng ID trong danh sách IncomingFriendRequest
    const friendRequests = await Promise.all(
      userData.IncomingFriendRequest.map((friendId) =>
        axios.get(`http://localhost:3000/users/${friendId}`).then((res) => res.data)
      )
    );

    return friendRequests; // Trả về danh sách thông tin chi tiết
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

  // Trường hợp không có yêu cầu kết bạn
  if (!data || data.length === 0) {
    return <h1>No friend requests found</h1>;
  }

  // Hiển thị danh sách yêu cầu kết bạn
  return (
    <>
      <Navigation />
      
      <div className="FriendRequestList-container">
        <h1>Friend Requests</h1>
        <hr/>
        <div className="friendRequestUnique">
          {data.map((friend) => (
            <div key={friend.id} >
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
               <div style={{display:'flex'}}>
                <img src={friend.avatar}></img>
               <h2>{friend.nickname}</h2></div>
               <div>
                <Button type="primary">Accept</Button>
                <Button type="primary" danger>Reject</Button>
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
