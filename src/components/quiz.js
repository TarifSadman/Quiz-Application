import React, { useState, useEffect } from "react";
import { Alert, Spin, Row, Col, Typography } from "antd";
import questions from "../data/queses"; // Assuming you have your questions data
import Question from "./ques";
import "./quiz.css";

const { Title, Text } = Typography;

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCorrectAnswerAlert, setShowCorrectAnswerAlert] = useState(false);
  const [questionAnsweredCorrectly, setQuestionAnsweredCorrectly] = useState(
    Array(questions.length).fill(false)
  );
  const [timer, setTimer] = useState(null);

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
        alert(`Quiz completed! Your score: ${score}/${questions.length}`);
      }
      setTimer(null);
    }, 2000);
    setTimer(nextQuestionTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <div className="quiz-container">
      <Row justify="center" align="middle" className="quiz-header">
        <Col span={24}>
          <Title level={3}>Quiz App</Title>
        </Col>
      </Row>
      <Row justify="center" align="middle" className="quiz-content">
      <Row justify="space-between" align="middle" gutter={16}>
            <Col>
              <Text strong>Question {currentQuestionIndex + 1}/{questions.length}</Text>
            </Col>
            <Col>
              <Text strong>Score: {score}</Text>
            </Col>
          </Row>
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
    </div>
  );
};

export default Quiz;
