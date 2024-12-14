import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comment = ({ comments, setComments }) => {
  const [users, setUsers] = useState([]);
  const CurrentUserId = localStorage.getItem("loggedInUserId");
  // Fetch dữ liệu user khi component được render
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data); // Lưu thông tin users vào state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Tìm user dựa vào userId trong comment
  const findUserById = (userId) => users.find((user) => user.id === userId);

  // Hàm tìm user của người đăng bài
  const findUserPostByIdPost = (postId) => {
    const userWithPost = users.find(
      (user) =>
        user.posts &&
        Array.isArray(user.posts) &&
        user.posts.some((post) => post.id === postId)
    );
    return userWithPost ? userWithPost.id : null; // Trả về userId nếu tìm thấy, ngược lại trả về null
  };
  const abc = () => {
    console.log(CurrentUserId);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Gửi yêu cầu xóa comment
      await axios.delete(`http://localhost:3000/comments/${commentId}`);

      // Cập nhật lại state để loại bỏ comment đã xóa
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Error deleting comment!");
    }
  };

  return (
    <div>
      <h5>Comments</h5>

      {comments.length > 0 ? (
        comments.map((comment) => {
          const user = findUserById(comment.userId); // Lấy thông tin user tương ứng
          const postOwnerId = findUserPostByIdPost(comment.postId); // Lấy userId của người đăng bài

          return (
            <div
              key={comment.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#f0f2f5",
                marginBottom: "10px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Avatar người dùng */}
              <img
                src={user?.avatar || "default-avatar-url"}
                alt="User Avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />

              {/* Nội dung bình luận */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {/* Tên người dùng và thời gian bình luận */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Link
                      to={`/profile/${comment.userId}`}
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#050505",
                        textDecoration: "none",
                        marginRight: "10px",
                      }}
                    >
                      {user?.nickname || "Unknown User"}
                    </Link>
                    <span style={{ fontSize: "12px", color: "gray" }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Nội dung bình luận */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#050505",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {comment.content}
                  </p>
                </div>

                {/* Nút xóa bình luận */}
                {(CurrentUserId === postOwnerId ||
                  CurrentUserId === comment.userId) && (
                  <button
                  
                    onClick={() => handleDeleteComment(comment.id)}
                    style={{
                      marginTop: "5px",
                      padding: "5px 10px",
                     
                      color: "white",
                      borderRadius:'10px',
                      backgroundColor:'red',
                      fontSize: "12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No comments yet!</p>
      )}
    </div>
  );
};

export default Comment;
