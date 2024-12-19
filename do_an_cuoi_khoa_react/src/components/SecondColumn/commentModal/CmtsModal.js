import React, { useState } from "react";
import axios from "axios";

const CmtModal = ({ postId }) => {
    const [content, setContent] = useState("");

    const handleCommentSubmit = async () => {
        if (!content) return alert("Comment cannot be empty!");

        const newComment = {
            id: Date.now().toString(), // Tạo ID ngẫu nhiên
            postId,
            userId: localStorage.getItem("loggedInUserId"),
            content,
            createdAt: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:3000/comments", newComment);
            alert("Comment added successfully!");
            setContent("");
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <form style={{ display: "flex" , marginLeft:'10px'}}>
            <input
                style={{  width:'530px', marginRight: "20px", borderRadius:'8px' }}
                placeholder="What do you think about this post?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                    style={{border:'none',borderRadius:'8px', backgroundColor:'#1890FF',color:'white', padding:'0px 15px' }}
                htmlType="submit"
                onClick={handleCommentSubmit}
            >
                Comment
            </button>


        </form>
    );
};

export default CmtModal;
