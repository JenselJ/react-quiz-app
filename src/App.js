import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <div id="start-btn-wrapper" className="text-center align-self-center h-100vh">
    <Button variant="primary" onClick={() => setModalShow(true)}>
      Start Quiz
      {/* button will later be in a modal */}
    </Button>
    </div>
    

    <QuizModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  </>
  )
}

export default App;

function QuizModal(props) {

  let array = [
    {
      question: "What is the size of the sun?",
      answers: [
        { id: 0, text: "57km"},
        { id: 1, text: "12ft"},
        { id: 2, text: "4inches"},
        { id: 3, text: "10000km"}
      ],
      correctAnswerIndex: 3
    },
    {
      question: "What color is a banana?",
      answers: [
        { id: 0, text: "orange"},
        { id: 1, text: "yellow"},
        { id: 2, text: "red"},
        { id: 3, text: "purple"}
      ],
      correctAnswerIndex: 1
    },
    {
      question: "What is 2 + 2?",
      answers: [
        { id: 0, text: "4"},
        { id: 1, text: "10"},
        { id: 2, text: "15"},
        { id: 3, text: "0"}
      ],
      correctAnswerIndex: 0
    }
  ]

  const [arrayIndex, setArrayIndex] = useState(0);

  const [userInput, setUserInput] = useState([]);

// function saveUserInput() {
//     if (document.getElementById('0').checked === true) {
//     userInput[arrayIndex] = 0
//     } else if (document.getElementById('1').checked === true) {
//     userInput[arrayIndex] = 1
//     } else if (document.getElementById('2').checked === true) {
//     userInput[arrayIndex] = 2
//     } else if (document.getElementById('3').checked === true) {
//     userInput[arrayIndex] = 3
//     } else {
//     userInput[arrayIndex] = -1
//     }
//     console.log(userInput)
// }

function handleChange(answerId, questionIndex) {
  console.log(answerId, questionIndex)
  let userList = userInput
  userList[questionIndex] = answerId
  setUserInput([...userList]);
  console.log(userInput)
  // setUserInput([...userInput, event.target.value])
}

  function addOneToIndex() {
    if (arrayIndex < array.length - 1) {
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Question {arrayIndex + 1} of {array.length}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{array[arrayIndex].question}</h4>
        <p>
        <Form>
          {array[arrayIndex].answers.map((answer) => (
            <div key={answer.id} className="mb-3">
              <Form.Check 
                type='radio'
                id={answer.id}
                className={userInput[arrayIndex] === answer.id ? "some-class" : ""}
                label={answer.text}
                checked={userInput[arrayIndex] === answer.id}
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
        <Button>Submit Quiz</Button>
      </Modal.Footer>
    </Modal>
  );
}
