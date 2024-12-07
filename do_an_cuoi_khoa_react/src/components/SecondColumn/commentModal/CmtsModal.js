import React, { useState } from "react";
import { Button, Form, Input } from "antd";
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
    <Form style={{ display: "flex", marginTop: "10px" }}>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: "Please input your comment!",
          },
        ]}
      >
        <Input
          style={{ width: "650px", marginRight: "20px" }}
          placeholder="What do you think about this post?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          onClick={handleCommentSubmit}
        >
          Comment
        </Button>
      </Form.Item>
    
    </Form>
  );
};

export default CmtModal;
