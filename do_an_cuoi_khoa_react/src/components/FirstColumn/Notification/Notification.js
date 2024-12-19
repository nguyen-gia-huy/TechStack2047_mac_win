import React from 'react'
import Navigation from '../../Navigation/Navigation'
import './Notification.css'
const Notification = () => {
    const CurrentUserId = localStorage.getItem("loggedInUserId");
  return (
    <div>
        <Navigation/>
        <div className='container-Notification'>
            <h2>Notification</h2>
        </div>
    </div>
  )
}

export default Notification