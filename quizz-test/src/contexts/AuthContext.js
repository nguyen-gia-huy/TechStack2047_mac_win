import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const checkStatusLogin = (query) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  if (user) {
    if (query === "isAuthenticated") {
      return true;
    }
    if (query === "userCurrent") {
      return user;
    }
    if (query === "userID") {
      return user.id; // Giả sử `id` là thuộc tính chứa `userID`
    }
  } else {
    if (query === "isAuthenticated") {
      return false;
    }
    if (query === "userCurrent") {
      return null;
    }
    if (query === "userID") {
      return null;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkStatusLogin("isAuthenticated")
  );
  const [userCurrent, setUserCurrent] = useState(
    checkStatusLogin("userCurrent")
  );
  const [userID, setUserID] = useState(checkStatusLogin("userID")); // Khởi tạo userID từ localStorage

  const login = (user) => {
    setUserCurrent(user);
    setIsAuthenticated(true);
    console.log(user);

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUserCurrent(null?.id);
    setIsAuthenticated(false);
    
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userCurrent,
        setUserCurrent,
        userID, // Cung cấp userID qua context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
