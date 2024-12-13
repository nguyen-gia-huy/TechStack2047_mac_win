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
                height: "150px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  className="avatar"
                  src={user?.avatar || "default-avatar-url"}
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      height: "30px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/profile/${comment.userId}`}
                      >
                        {user?.nickname || "Unknown User"}
                      </Link>
                    </p>
                  </div>
                  <p>{comment.content}</p>
                  <span
                    style={{
                      fontSize: "15px",
                      color: "gray",
                    }}
                  >
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div key={comment.id}>
                {/* Điều kiện hiển thị nút xóa cho người đăng bài hoặc người bình luận */}
                {(CurrentUserId === postOwnerId ||
                  CurrentUserId === comment.userId) && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    style={{
                      marginBottom: "100px",
                      borderRadius: "10px",
                      marginLeft: "auto",
                      padding: "5px 10px",
                      backgroundColor: "#ff4d4f",
                      color: "white",
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
