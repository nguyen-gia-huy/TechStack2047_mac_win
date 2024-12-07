import React, { useState } from "react";

const Comment = ({ comments, setComments }) => {
    const handleDeleteComment = async (commentId) => {
        try {
            // Gửi yêu cầu xóa bình luận qua API
            const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Xóa bình luận khỏi trạng thái hiện tại
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
                comments.map((comment) => (
                    <div key={comment.id} style={{ marginBottom: "10px" }}>
                        <p>
                            <strong>User ID:</strong> {comment.userId}
                        </p>
                        <p>{comment.content}</p>
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            style={{
                                marginTop: "10px",
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
                ))
            ) : (
                <p>No comments yet!</p>
            )}
        </div>
    );
};

export default Comment;
