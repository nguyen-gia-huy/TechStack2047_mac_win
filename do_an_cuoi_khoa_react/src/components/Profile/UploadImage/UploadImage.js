import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadImage = ({ type, onImageUpload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]); // Lưu trữ file đã chọn

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // Lấy file đã chọn
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        onImageUpload(reader.result); // Trả về base64 image để lưu lại
      };
    }
    setIsModalOpen(false);
    message.success("Image uploaded successfully!");
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
        Upload {type === "avatar" ? "Avatar" : "Cover Photo"}
      </Button>
      <Modal
        title={`Upload ${type === "avatar" ? "Avatar" : "Cover Photo"}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </>
  );
};

export default UploadImage;
