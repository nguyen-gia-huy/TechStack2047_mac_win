import React, { useState } from 'react';
import { Button, Form, Input, Modal, Upload, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
const UploadBlog = ({ onImageUpload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]); // Lưu trữ file đã chọn
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // Quản lý nội dung bài viết


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const content = document.querySelector("input[placeholder='What are you thinking?']").value; // Lấy nội dung bài viết
    if (!content && fileList.length === 0) {
      message.error("Please add some content or an image!");
      return;
    }

    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    const newPost = {
      id: Date.now().toString(), // Tạo ID duy nhất
      content,
      image: fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : null,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      // Fetch dữ liệu hiện tại của user
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();

      // Thêm bài viết mới vào danh sách posts
      const updatedUserData = {
        ...userData,
        posts: [...(userData.posts || []), newPost],
      };

      // Gửi cập nhật lên API
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      message.success("Blog uploaded successfully!");
      setIsModalOpen(false);
      setFileList([]);
    } catch (error) {
      console.error("Error uploading blog:", error);
      message.error("Failed to upload blog!");
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList); // Cập nhật danh sách file đã chọn
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new blog
      </Button>
      <Form>

        <Modal
          title={`Upload blog`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >

          <><Form.Item

            name="Input"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input placeholder='What are you thinking?' value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Item></>
          <>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUpload}
              beforeUpload={() => false} // Ngăn việc upload tự động
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {fileList.length > 0 && (
              <img
                src={URL.createObjectURL(fileList[0].originFileObj)}
                alt="Preview"
                style={{ marginTop: "10px", maxWidth: "100%" }}
              />
            )}
          </>

        </Modal>
      </Form>
    </>
  );
};

export default UploadBlog;