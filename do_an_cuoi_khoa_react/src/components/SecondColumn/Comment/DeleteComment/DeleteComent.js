import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteComent = ({ comments, setComments }) => {
  const [users, setUsers] = useState([]);
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
      {comments.length > 0 ? (
        comments.map((comment) => {
          const user = findUserById(comment.userId); // Lấy thông tin user tương ứng
          return (
            <div key={comment.id}>
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
            </div>
          );
        })
      ) : (
        <p>No comments yet!</p>
      )}
    </div>
  );
};

export default DeleteComent;
