import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function QuizModal(props) {

  const { user } = UserAuth()
  const [arrayIndex, setArrayIndex] = useState(0);

function handleChange(answerId, questionIndex) {
  console.log(answerId, questionIndex)
  let userList = props.userInput
  userList[questionIndex] = answerId
  props.setUserInput([...userList]);
}

  function addOneToIndex() {
    if (arrayIndex < props.array.length - 1) {
      setArrayIndex(prevArrayIndex => prevArrayIndex + 1)
    }
  }

  function minusOneFromIndex() {
    if (arrayIndex > 0) {
      setArrayIndex(prevArrayIndex => prevArrayIndex - 1)
    }
  }
  
  function nextBtnHandler() {
    addOneToIndex();
  }

  function totalMark() {
    /*
    let mark = 0
    for (let i=0; i < props.userInput.length; i++) {
        console.log(props.userInput[i], props.array[i].correctAnswerIndex)
        if (props.userInput[i] === props.array[i].correctAnswerIndex) {
            mark += 1
        }
    }
    */
   /*
   let mark = 0
   props.userInput.forEach((userIndex, index) => {
     if (userIndex === props.array[i].correctAnswerIndex) mark += 1;
   })
   */
    const mark = props.userInput.reduce((accum, curr, i) => accum + (curr === props.array[i].correctAnswerIndex ? 1 : 0), 0)
    console.log(`${mark} out of 3`);
    
    const db = getDatabase(props.firebaseapp);  
    const reference = ref(db, "users/" + user.uid)
    set(reference, {
      quizResults: mark,
      date: Date.now()
    })
    return mark
  }

  function submitBtnHandler() {
    totalMark();
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Question {arrayIndex + 1} of {props.array.length}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.array[arrayIndex].question}</h4>
        <p>
        <Form>
          {props.array[arrayIndex].answers.map((answer) => (
            <div key={answer.id} className="mb-3">
              <Form.Check 
                type='radio'
                id={answer.id}
                className={props.userInput[arrayIndex] === answer.id ? "some-class" : ""}
                label={answer.text}
                checked={props.userInput[arrayIndex] === answer.id}
                onChange={(event) => {
                  handleChange(answer.id, arrayIndex)
                }}
              />
            </div>
          ))}
        </Form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button id="previous-question-btn" onClick={minusOneFromIndex}>Previous Question</Button>
        <Button onClick={nextBtnHandler}>Next Question</Button>
        <Link to="/results">
          <Button onClick={submitBtnHandler}>Submit Quiz</Button>
        </Link>
        
      </Modal.Footer>
    </Modal>
  );
}