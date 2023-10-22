import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import "./login.css"; // Import your CSS file
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase/fbase";

const SignupPage = () => {
  const history = useNavigate();
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signup Successful");
        history("/");
        console.log(userCredential, "userCredential");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <div className="logo-container">
          <img
            src="https://memetemplates.in/uploads/1638304172.jpeg"
            alt="Circular Logo"
            className="logo-image"
          />
        </div>
        <Form onFinish={handleSignup} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default SignupPage;
