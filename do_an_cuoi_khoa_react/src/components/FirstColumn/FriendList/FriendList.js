import React, { useState } from 'react'
import Navigation from '../../Navigation/Navigation'
import './FriendList.css'
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

const FriendList = () => {

  const userIdSender = localStorage.getItem("loggedInUserId");
  const fetchFriendList = async () => {
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${userIdSender}`
    );
    const friendList = await Promise.all(
      userData.friends.map((friendId) =>
        axios.get(`http://localhost:3000/users/${friendId}`).then((res) => res.data)
      )
    )
    return friendList
  }
  // Sử dụng React Query để quản lý dữ liệu
  const query = useQuery({
    queryKey: ["friends", userIdSender],
    queryFn: fetchFriendList,
  });

  const { data, error, isLoading } = query;


  // Xử lý trạng thái khi đang loading hoặc lỗi
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  return (

    <div className='container'>
      <Navigation />

      <div className='container-noidung'>
        <h1>Friend List </h1>
        <p>`{userIdSender}`</p>
        <div className="friendRequestUnique">
          {data.map((friend) => (
            <div key={friend.id} >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ display: 'flex' }}>
                  <img src={friend.avatar}></img>
                  <h2>{friend.nickname}</h2></div>
                <h3>{friend.id}</h3>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default FriendList