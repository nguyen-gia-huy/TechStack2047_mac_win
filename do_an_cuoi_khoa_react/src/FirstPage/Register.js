import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, notification } from "antd";
import { Option } from "antd/es/mentions";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import "../App.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Gọi API để đăng ký người dùng mới
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          nickname: values.nickname,
          gender: values.gender,
          dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        }),
      });

      if (response.ok) {
        notification.success({
          message: "Registration successful",
          description: "You have successfully created a new account!",
        });
        navigate("/"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      notification.error({
        message: "Registration failed",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h1 className="page-title">YourPage</h1>
      <Form
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item>
          <h2 className="title">Create new Account</h2>
          <hr></hr>
        </Form.Item>
        <Form.Item
          name="email"
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
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="nickname"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Nick name" />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Please input your date of birth!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
        <Link className="link" to={"/"}>
          Already have an account?
        </Link>
      </Form>
    </div>
  );
};

export default Register;
