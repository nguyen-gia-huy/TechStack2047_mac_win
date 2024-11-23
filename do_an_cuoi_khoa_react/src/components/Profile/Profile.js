import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import UpImgModal from "./UploadImage/UpImgModal";
import { ProfileContext } from "../../ProfileContext";
import UploadBlog from "./UploadBlog/UploadBlog";
import { Button, message } from "antd";

// API Fetch Profile Data
const fetchProfileData = async ({ queryKey }) => {
  const userId = queryKey[1]; // Lấy userId từ queryKey
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profile data");
  return response.json();
};

// API Update User Data
const updateUserPosts = async ({ userId, updatedData }) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update user posts");
  return response.json();
};

const Profile = () => {
  const queryClient = useQueryClient();
  const { setProfileData } = useContext(ProfileContext);

  // Lấy userId từ localStorage
  const userId = localStorage.getItem("loggedInUserId");

  // Fetch profile data using useQuery
  const { data: profileData, isLoading, isError, error } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: fetchProfileData,
    onSuccess: (data) => setProfileData(data), // Cập nhật Context khi fetch thành công
  });

  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: updateUserPosts,
    onSuccess: (updatedData) => {
      // Cập nhật lại cache dữ liệu sau khi xóa
      queryClient.setQueryData(["profileData", userId], updatedData);
      message.success("Post deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete post!");
    },
  });

  // Hàm xóa bài viết
  const handleDeletePost = (postId) => {
    if (!profileData) return;

    // Lọc bỏ bài viết bị xóa
    const updatedPosts = profileData.posts.filter((post) => post.id !== postId);
    const updatedUserData = { ...profileData, posts: updatedPosts };

    // Gửi mutation
    deletePostMutation.mutate({ userId, updatedData: updatedUserData });
  };

  // Loading and Error handling
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container" >
      <Navigation />
      <div className="profile" >
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
    <hr/>
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
        <div ><UpImgModal />
          <UploadBlog /></div>
        <h2>Posts</h2>
        <hr/>
        <div className="post-container" >
          {profileData.posts && profileData.posts.length > 0 ? (
            profileData.posts.map((post) => (
              <div key={post.id} className="post" style={{ marginTop: "10px" }}>
                <div style={{ display: "flex" }}>
                  <img
                    className="post-avatar"
                    src={profileData.avatar || "default-avatar-url"}
                    alt=""
                  />
                  <p>
                    <h4>{profileData.nickname}</h4>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </p>
                </div>
                <p>{post.content}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {post.image && <img src={post.image} alt="Post" />}
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
