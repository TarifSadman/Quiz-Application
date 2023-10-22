import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login";
import Quiz from "./components/quiz";
import SignupPage from "./components/signUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
