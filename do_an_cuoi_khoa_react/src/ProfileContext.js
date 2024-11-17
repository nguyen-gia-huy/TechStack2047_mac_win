import React, { createContext, useState } from "react";

// Tạo context
export const ProfileContext = createContext();

// Tạo provider để bao bọc các component cần truy cập dữ liệu
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    avatar: null,
    coverPhoto: null,
  });

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
