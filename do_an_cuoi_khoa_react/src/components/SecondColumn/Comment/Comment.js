import React, { useEffect, useState } from "react";

const Comment = ({ comments, setComments }) => {
    const [users, setUsers] = useState([]);

    // Fetch dữ liệu user khi component được render
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/users");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data); // Lưu thông tin users vào state
                } else {
                    console.error("Failed to fetch users");
                }
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
            const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                );
                alert("Comment deleted successfully!");
            } else {
                alert("Failed to delete comment!");
            }
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
                    return (
                        <div
                            key={comment.id}
                            style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                                borderRadius: "10px",
                                padding: "10px",

                            }}
                        >
                            <div style={{ display: 'flex' }}>
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
                                <div >
                                    <div style={{ display: 'flex', height: '40px' }}>
                                        <p style={{ fontWeight: "bold", marginRight: '10px' }}> {user?.nickname || "Unknown User"}</p>
                                        <p style={{ fontSize: "15px", color: "gray" }}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <p >{comment.content}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                style={{
                                    marginBottom: '100px',
                                    borderRadius: '10px',
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

export default Comment;
