import React, { useEffect, useContext } from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import UpImgModal from "./UploadImage/UpImgModal";
import { ProfileContext } from "../../ProfileContext";
import UploadBlog from "./UploadBlog/UploadBlog";
import { Button, message } from "antd";

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

  // Hàm xóa bài viết
  const handleDeletePost = async (postId) => {
    const userId = localStorage.getItem("loggedInUserId");

    try {
      // Fetch dữ liệu hiện tại của user
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();

      // Lọc bỏ bài viết bị xóa
      const updatedPosts = userData.posts.filter((post) => post.id !== postId);
      const updatedUserData = { ...userData, posts: updatedPosts };

      // Gửi cập nhật lên API
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      // Cập nhật lại state
      setProfileData(updatedUserData);

      message.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post!");
    }
  };

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
        <div >
          {profileData.posts && profileData.posts.length > 0 ? (
            profileData.posts.map((post) => (
              <div key={post.id} className="post" style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex' }}><img
                  className="post-avatar"
                  src={profileData.avatar || "default-avatar-url"}
                  alt=""
                />

                  <p>
                    <h4>{profileData.nickname}</h4>

                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </p>

                </div>
                <p>{post.content}  </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {post.image && <img src={post.image} alt="Post" />}</div>
                <hr />

                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeletePost(post.id)}
                  style={{ marginTop: "10px" }}
                >
                  Delete
                </Button>

              </div>


            ))
          ) : (
            <p>No posts yet!</p>
          )}
          <div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
