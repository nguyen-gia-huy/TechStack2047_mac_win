import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Color } from "antd/es/color-picker";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Gọi API tới JSON Server để kiểm tra thông tin đăng nhập
      const response = await fetch(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );
      const data = await response.json();

      // Kiểm tra xem người dùng có tồn tại không
      if (data.length > 0) {
        const user = data[0];
        notification.success({
          message: "Login successful",
          description: "You have successfully logged in!",
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loggedInUserId", user.id);
        navigate("/defaultPage"); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        notification.error({
          message: "Login failed",
          description: "Invalid email or password!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (

     <div className="login-form" >
     <h1 className="logo-title">YourPage</h1>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log In
          </Button>
          <Link className="register" to="/register">
            Create new account
          </Link>
        </Form.Item>
      </Form>
     </div>

  );
};

export default Login;
