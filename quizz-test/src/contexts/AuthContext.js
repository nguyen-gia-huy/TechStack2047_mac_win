import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [userCurrent, setUserCurrent] = useState(null); // Trạng thái người dùng hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Hàm kiểm tra trạng thái đăng nhập
  const checkStatusLogin = () => {
    try {
      const userData = localStorage.getItem("userCurrent"); // Lấy dữ liệu từ localStorage

      if (!userData) {
        console.log("Không tìm thấy thông tin người dùng trong localStorage.");
        setUserCurrent(null);
        return;
      }

      // Parse dữ liệu JSON (thêm kiểm tra lỗi)
      const parsedUser = JSON.parse(userData);
      setUserCurrent(parsedUser); // Lưu thông tin người dùng vào state
      console.log("Người dùng hiện tại:", parsedUser);
    } catch (err) {
      console.error("Lỗi khi đọc hoặc parse dữ liệu người dùng:", err);
      setError("Dữ liệu người dùng không hợp lệ."); // Lưu lỗi nếu gặp sự cố
      setUserCurrent(null);
    } finally {
      setIsLoading(false); // Hoàn thành tải dữ liệu
    }
  };

  // Kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    checkStatusLogin();
  }, []);

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("userCurrent"); // Xóa dữ liệu người dùng khỏi localStorage
    setUserCurrent(null); // Đặt trạng thái người dùng là null
    console.log("Đã đăng xuất.");
  };

  // Hàm đăng nhập
  const login = (userData) => {
    try {
      const stringifiedData = JSON.stringify(userData);
      localStorage.setItem("userCurrent", stringifiedData); // Lưu dữ liệu vào localStorage
      setUserCurrent(userData); // Cập nhật trạng thái người dùng
      console.log("Đăng nhập thành công:", userData);
    } catch (err) {
      console.error("Lỗi khi lưu dữ liệu người dùng vào localStorage:", err);
    }
  };

  // Kiểm tra trạng thái người dùng đã đăng nhập
  const isAuthenticated = !!userCurrent; // Trả về true nếu userCurrent tồn tại, ngược lại false

  return (
    <AuthContext.Provider
      value={{
        userCurrent,
        setUserCurrent,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook tiện ích để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
