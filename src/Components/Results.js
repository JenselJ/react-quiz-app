import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';

export default function ResultsModal(props) {

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

  function resultColor(correctAnswerIndex, answerIndex, userInputIndex) {
    if (userInputIndex === answerIndex && userInputIndex === correctAnswerIndex) {
      return "#32CD32"
    } else if (userInputIndex === answerIndex && userInputIndex !== correctAnswerIndex) {
      return "#ff7f7f"
    }
  }


let correctAnswer = '';
    if (props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 0) {
      correctAnswer = 'A'
    } else if (props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 1) {
      correctAnswer = 'B'
    } else if (props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 2) {
      correctAnswer = 'C'
    } else if (props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 3) {
      correctAnswer = 'D'
    }

  return (
    <Modal
      {...props}
      size="lg"
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
         Results: {props.userInput.reduce((accum, curr, i) => accum + (curr === props.questionsArray[i].correctAnswerIndex ? 1 : 0), 0)} / {props.questionsArray.length}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>          
          {props.questionsArray[selectedQuestionIndex].question} 
          
        </h4>
        <p className="answers">
          {props.questionsArray[selectedQuestionIndex].answers.map((answer, index) => (
            <p style={{
              background: resultColor(props.questionsArray[selectedQuestionIndex].correctAnswerIndex, index, props.userInput[selectedQuestionIndex])
            }}>{answer.text}
            </p>
          ))}
        </p>
        <h6>
          Correct Answer: {correctAnswer}
        </h6>
        <p> Explanation: {props.questionsArray[selectedQuestionIndex].explanation}</p>
        <p>
        {props.questionsArray.map((question, index) => (
            <Button onClick={() => setSelectedQuestionIndex(index)}>Question {index+1}</Button>
          ))}
        </p>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}