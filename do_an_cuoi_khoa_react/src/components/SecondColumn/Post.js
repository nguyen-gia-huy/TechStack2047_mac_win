import React, { useContext } from "react";
import "./Post.css";
import { Button } from "antd";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ProfileContext } from "../../ProfileContext";
import { Link, NavLink } from "react-router-dom";
// API Fetch Profile Data
const fetchProfileData = async ({ queryKey }) => {
  const userId = queryKey[1]; // Lấy userId từ queryKey
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profile data");
  return response.json();
};
const fetchAllPosts = async () => {
  const response = await axios.get(`http://localhost:3000/users/`);
  const users = response.data; // Danh sách toàn bộ người dùng

  // Gom tất cả posts từ mỗi user và thêm thông tin author
  const allPosts = users.flatMap((user) =>
    (user.posts || []).map((post) => ({
      ...post,
      author: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    }))
  );

  return allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const Post = () => {
  const queryClient = useQueryClient();
  const { setProfileData } = useContext(ProfileContext);

  const userId = localStorage.getItem("loggedInUserId");

  const { data: profileData } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: fetchProfileData,
    onSuccess: (data) => setProfileData(data),
  })
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: fetchAllPosts,

  });

  if (isLoading) {
    return <h1>loading</h1>
  }
  if (error) {
    return <h1>error: {error.message}</h1>
  }
  return (
    <div className="containerPostDefault">
      <h2>All Posts</h2>
      <div>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts: {error.message}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post" style={{ marginTop: "10px" }}>
              <div style={{ display: 'flex' }}>
                <img
                  className="post-avatar"
                  src={post.author.avatar || "default-avatar-url"}
                  alt=""
                />
                <p>
                  <NavLink ><h4>{post.author.nickname}</h4></NavLink>
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                </p>
              </div>
              <p><strong>Content:</strong> {post.content}</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {post.image && <img src={post.image} alt="Post" />}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No posts available!</p>
        )}
      </div>
    </div>
  );


};

export default Post;
