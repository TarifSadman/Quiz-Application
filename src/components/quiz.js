/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Alert, Spin, Row, Col, Typography, Divider, Button } from "antd";
import questions from "../data/queses";
import Question from "./ques";
import "./quiz.css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Quiz = () => {
  const history = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCorrectAnswerAlert, setShowCorrectAnswerAlert] = useState(false);
  const [questionAnsweredCorrectly, setQuestionAnsweredCorrectly] = useState(
    Array(questions.length).fill(false)
  );
  const [timer, setTimer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [user] = [localStorage.getItem("username"), localStorage.getItem("password")];

  useEffect(() => {
    if (user === null) {
      history("/");
    }
  }, [user]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

    questions.forEach((question) => {
    question.options = shuffleArray(question.options);
    });

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setQuestionAnsweredCorrectly((prevState) => {
        const newState = [...prevState];
        newState[currentQuestionIndex] = true;
        return newState;
      });
      setShowCorrectAnswerAlert(true);
    } else {
      setShowCorrectAnswerAlert(true);
    }

    if (timer) {
      clearTimeout(timer);
    }

    const nextQuestionTimer = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowCorrectAnswerAlert(false);
      } else {
        if (currentQuestionIndex === questions.length - 1) {
          setQuizCompleted(true);
        }
      }
      setTimer(null);
    }, 1500);
    setTimer(nextQuestionTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowCorrectAnswerAlert(false);
    setQuestionAnsweredCorrectly(Array(questions.length).fill(false));
    setTimer(null);
    setQuizCompleted(false);
  };

  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    history("/");
  }

  return (
    <div className="quiz-container">
      <Button type="default" className="log-out-button" onClick={logOut}>
        Log Out
      </Button>
      <Button type="primary" onClick={handleStartOver} className="start-over-button">
          Start Over
      </Button>
      {quizCompleted ? (
        <div className="completion-message">
          <Title level={3}>Quiz Completed!</Title>
          <Text>Your score: {score}/{questions.length}</Text>
        </div>
      ) : (
        <Row justify="center" align="middle" className="quiz-content">
          <Col span={24}>
            <Row justify="space-between" align="middle" gutter={16}>
              <Col>
                <Text strong>Question {currentQuestionIndex + 1}/{questions.length}</Text>
              </Col>
              <Divider
                type="vertical"
                style={{
                    height: "100%",
                    borderColor: "#613f3f",
                    borderWidth: "2px",
                  }}              />
              <Col>
                <Text strong>Score: {score}</Text>
              </Col>
            </Row>
          </Col>
          {timer === null ? (
            <Col span={24}>
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                handleAnswer={handleAnswer}
              />
            </Col>
          ) : (
            <Col span={24} className="quiz-spinner">
              <Spin size="large" />
            </Col>
          )}
          {showCorrectAnswerAlert && (
            <Col span={24} className="quiz-alert">
              <Alert
                message={
                  questionAnsweredCorrectly[currentQuestionIndex]
                    ? "Correct!"
                    : "Incorrect!"
                }
                description={`The correct answer is: ${currentQuestion.correctAnswer}`}
                type={
                  questionAnsweredCorrectly[currentQuestionIndex]
                    ? "success"
                    : "error"
                }
                showIcon
                closable
                onClose={() => setShowCorrectAnswerAlert(false)}
              />
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default Quiz;
