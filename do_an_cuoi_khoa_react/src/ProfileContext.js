import React, { createContext, useState } from "react";

// Tạo context
export const ProfileContext = createContext();

// Tạo provider để bao bọc các component cần truy cập dữ liệu
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    id: null,
    nickname:null,
    avatar: null,
    coverPhoto: null,

  });
  const [commentsProfile, setCommentProfile]= useState({
    id:null,
    postId: null,
    userId:null,
    content:null,
    createAt:null,
  })
  return (
    <ProfileContext.Provider value={{ profileData, setProfileData,commentsProfile, setCommentProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
