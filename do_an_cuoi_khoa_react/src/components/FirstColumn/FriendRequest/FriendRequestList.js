import React from 'react'
import './FriendRequestList.css'
import Navigation from '../../Navigation/Navigation'
const FriendRequestList = () => {
  const userId = localStorage.getItem("loggedInUserId");
  const abc = () => {
    console.log(userId)
  }
  return (

    <>
      <Navigation />
      <div className='FriendRequestList-container'>
        friend list
        <div className='content'>
          <button onClick={abc}>id</button>
        </div>
      </div>
    </>
  )
}

export default FriendRequestList