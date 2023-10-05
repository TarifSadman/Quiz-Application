import React, { useState, useEffect } from "react";
import { Alert, Spin } from "antd";
import questions from "../data/queses";
import Question from "./ques";
import "./quiz.css";

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
    <div>
      <h1>Quiz App</h1>
      <p>Question {currentQuestionIndex + 1}/{questions.length}</p>
      <p>Score: {score}</p>
      {timer === null ? (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          handleAnswer={handleAnswer}
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      )}
      {showCorrectAnswerAlert && (
        <Alert
          style={{ marginTop: "20px" }}
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
      )}
    </div>
  );
};

export default Quiz;
