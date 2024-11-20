import React, { useEffect, useContext } from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import UpImgModal from "./UploadImage/UpImgModal";
import { ProfileContext } from "../../ProfileContext";
import UploadBlog from "./UploadBlog/UploadBlog";
const Profile = () => {
  const { profileData, setProfileData } = useContext(ProfileContext);

  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
   

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setProfileData]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className="profile">
        <div className="cover-photo">
          <img
            src={profileData.coverPhoto || "default-cover-photo-url"}
            alt="Cover"
          />
        </div>
        <div className="profile-details">
          <img
            className="avatar"
            src={profileData.avatar || "default-avatar-url"}
            alt=""
          />
          <h1>{profileData.nickname}</h1>
        </div>

        <div className="profile-info">
          <div className="info-section">
            <h2>About</h2>
            <p>
              <strong>Name:</strong> {profileData.nickname}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profileData.dateOfBirth}
            </p>
          </div>
          <div className="friends-section">
            <h2>Friends</h2>
            {/* Render danh sách bạn bè nếu có */}
          </div>
        </div>
        <UpImgModal />
        <UploadBlog />
        <h2>Posts</h2>
        {profileData.posts && profileData.posts.length > 0 ? (
          profileData.posts.map((post) => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post" />}
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
    </>
  );
};

export default Profile;
