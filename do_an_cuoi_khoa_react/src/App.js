import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./FirstPage/Register";
import Login from "./FirstPage/Login";

import Profile from "./components/Profile/Profile";
import { ProfileProvider } from "./ProfileContext";
import DefaultPage from "./components/DefaultLayout/DefaultPage";

// Component bảo vệ để kiểm tra trạng thái đăng nhập
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    // Đảm bảo chỉ có một BrowserRouter tại đây
    <>
      {" "}
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Trang DefaultPage được bảo vệ */}
          <Route
            path="/defaultPage"
            element={
              <ProtectedRoute>
                <DefaultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </ProfileProvider>
    </>
  );
};

export default App;
