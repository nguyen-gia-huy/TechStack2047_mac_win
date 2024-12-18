import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";

const EditPost = ({ post, onUpdatePost, isEditable }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
    const [newContent, setNewContent] = useState(post.content); // Nội dung mới
  
    // Hiển thị modal
    const showModal = () => setIsModalOpen(true);
  
    // Đóng modal
    const handleCancel = () => setIsModalOpen(false);
  
    // Lưu thay đổi bài viết
    const handleSave = () => {
      if (!newContent.trim()) {
        message.error("Content cannot be empty!");
        return;
      }
      onUpdatePost(post.id, newContent); // Gọi hàm cập nhật bài viết
      setIsModalOpen(false);
      message.success("Post updated successfully!");
    };
  
    return (
      <div className="post-a">
      
        {isEditable && (
          <Button onClick={showModal} style={{ marginTop: "10px", backgroundColor:'#5B626A', color:'white' }}>
            Edit
          </Button>
        )}
        <Modal
          title="Edit Post"
          open={isModalOpen}
          onOk={handleSave}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <Input.TextArea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
          />
        </Modal>
      </div>
    );
}

export default EditPost