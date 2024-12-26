import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import UpImgModal from "./UploadImage/UpImgModal";
import { ProfileContext } from "../../ProfileContext";
import UploadBlog from "./UploadBlog/UploadBlog";
import { Button, message } from "antd";
import { Link, useParams } from "react-router-dom";
import AddFriend from "./Addfriend/AddFriend";
import Like from "../SecondColumn/Like/Like";
import CmtModal from "../SecondColumn/commentModal/CmtsModal";
import Comment from "../SecondColumn/Comment/Comment";
import EditPost from "./EditPost/EditPost";
import axios from "axios";

// API Fetch Profile Data
const fetchProfileData = async ({ queryKey }) => {
  const userId = queryKey[1]; // Lấy userId từ queryKey
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profile data");
  return response.json();
};
const fetchComments = async () => {
  const response = await fetch("http://localhost:3000/comments");
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};
const fetchLikes = async () => {
  const response = await fetch("http://localhost:3000/likes");
  if (!response.ok) throw new Error("Failed to fetch likes");
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
  const { setProfileData, setCommentProfile } = useContext(ProfileContext);

  const CurrentUserId = localStorage.getItem("loggedInUserId");
  const fetchFriendList = async () => {
    const { data: userData } = await axios.get(
      `http://localhost:3000/users/${CurrentUserId}`
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
  // Lấy userId từ URL qua useParams
  const { userId } = useParams();

  // Fetch profile data using useQuery
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: fetchProfileData,
    onSuccess: (data) => setProfileData(data), // Cập nhật Context khi fetch thành công
  });
  // Fetch comments
  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });
  const { data: likes, isLoading: loadingLikes } = useQuery({
    queryKey: ["likes"],
    queryFn: fetchLikes,
  });
  const { data } = useQuery({
    queryKey: ["friends", CurrentUserId],
    queryFn: fetchFriendList,
    enabled: !!CurrentUserId, // Ngăn chặn việc fetch nếu userIdSender là null
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
    const updatedPosts = profileData.posts.filter(
      (post) => post.id !== postId || null
    );
    const updatedUserData = { ...profileData, posts: updatedPosts };

    // Gửi mutation
    deletePostMutation.mutate({ userId, updatedData: updatedUserData });
  };
  const handleUpdatePost = (postId, newContent) => {
    if (!profileData) return;

    // Tìm và cập nhật bài viết cần thay đổi nội dung
    const updatedPosts = profileData.posts.map((post) =>
      post.id === postId ? { ...post, content: newContent } : post
    );

    // Cập nhật dữ liệu người dùng với danh sách bài viết mới
    const updatedUserData = { ...profileData, posts: updatedPosts };

    // Gửi mutation để cập nhật server
    deletePostMutation.mutate({
      userId,
      updatedData: updatedUserData,
    });
  };

  // Loading and Error handling
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
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
          <p>User ID: {userId}</p>
        </div>
        <hr />
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
        </div>
        <div>
          {CurrentUserId === userId && (
            <div>
              <UpImgModal />
              <UploadBlog />
            </div>
          )}
          {CurrentUserId !== userId && (
            <div>
              <AddFriend />
            </div>
          )}
        </div>
        <h2>Posts</h2>
        <hr />
        <div className="post-container">
          {profileData.posts && profileData.posts.length > 0 ? (
            [...profileData.posts]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
                <div
                  key={post.id}
                  className="post"
                  style={{ marginTop: "10px" }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                    <div>
                      <EditPost
                        style={{}}
                        key={post.id}
                        post={post}
                        isEditable={CurrentUserId === userId} // Chỉ cho phép chỉnh sửa nếu là bài viết của người dùng
                        onUpdatePost={handleUpdatePost}
                      />
                      {CurrentUserId === userId && (
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleDeletePost(post.id)}
                          style={{ marginTop: "10px" }}
                        >
                          Delete Post
                        </Button>
                      )}
                    </div>
                  </div>

                  <p>{post.content}</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {post.image && <img src={post.image} alt="Post" />}
                  </div>
                  <hr />
                  {/* Hiển thị các bình luận liên quan đến bài viết */}
                  <div></div>

                  <Comment
                    comments={
                      Array.isArray(comments)
                        ? comments.filter(
                            (comment) => comment.postId === post.id
                          )
                        : []
                    }
                  />
                  {/* Modal để thêm bình luận */}
                  <div style={{ display: "flex" }}>
                    <Like
                      likes={likes.filter(
                        (like) => like.postId === post.id || null
                      )}
                      postId={post.id}
                    />
                    <CmtModal postId={post.id} />
                  </div>
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
