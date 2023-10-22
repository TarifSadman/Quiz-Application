import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase/fbase";

const LoginPage = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin1 = (e) => {
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log(userCredential, "userCredential");
      alert("Login Successful");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      history("/quiz");
    })
    .catch((error) => {
        alert("Login Failed");
        console.log(error, "error");
    });
    }

  return (
    <div className="login-page">
      <Card className="login-card">
      <div className="logo-container">
          <img
            src="https://creatorset.com/cdn/shop/files/preview_images/bill_hader_dancing_in_a_box_PNG_530x@2x.png?v=1687544064"
            alt="Circular Logo"
            className="logo-image"
          />
        </div>
        <Form onFinish={handleLogin1} layout="vertical">
          <Form.Item label="Username / Email" name="username">
            <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
