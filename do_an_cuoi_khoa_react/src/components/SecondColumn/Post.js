import React, { useContext } from "react";
import "./Post.css";
import { Button } from "antd";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ProfileContext } from "../../ProfileContext";
const Post = () => {
  const { profileData, setProfileData } = useContext(ProfileContext);
  
  const userId = localStorage.getItem("loggedInUserId");
  const fetchAllPosts = async () => {
    const response = await axios.get("http://localhost:3000/users");
    const users = response.data; // Danh sách toàn bộ người dùng
  
    // Gom tất cả posts từ mỗi user
    const allPosts = users.flatMap((user) => user.posts || []);
    return allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: fetchAllPosts,
  });
  
if(isLoading){
  return <h1>loading</h1>
}
if( error){
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
    ) : profileData.posts ||posts.length > 0 ? (
      posts.map((post) => (
        
        <div key={post.id} className="post" style={{ marginTop: "10px" }}>
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
