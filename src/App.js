import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [modalShow, setModalShow] = React.useState(true);

  return (
    <>
      <LogInModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
  </>
  )
}

export default App;

function LogInModal(props) {

  const [profileShow, setProfileShow] = React.useState(false);
  const [signUpShow, setSignUpShow] = React.useState(false);

  function logInBtnHandler() {
    // props.onHide();
    setProfileShow(true);
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
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Login Modal</h4>
        <p>
          Should have a sign up button
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={() => {setSignUpShow(true); props.onHide()}}>
          SignUp
       </Button>
        <Button variant="primary" onClick={logInBtnHandler}>
          Login
       </Button>
       <ProfileModal
        show={profileShow}
        onHide={() => setProfileShow(false)}
      />
      <SignUpModal
        show={signUpShow}
        onHide={() => setSignUpShow(false)}
      />
      </Modal.Footer>
    </Modal>
  );
}

function SignUpModal(props) {

  const [profileShow, setProfileShow] = React.useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>SignUp Modal</h4>
        <p>
          Input fields...
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setProfileShow(true)}>
          Sign Up
       </Button>
       <ProfileModal
        show={profileShow}
        onHide={() => setProfileShow(false)}
      />
      </Modal.Footer>
    </Modal>
  );
}

function ProfileModal(props) {

  const [quizShow, setQuizShow] = React.useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Profile Modal</h4>
        <p>
          Shows previous quiz attempt results...
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setQuizShow(true)}>
          Start Quiz
       </Button>
       <QuizModal
        show={quizShow}
        onHide={() => setQuizShow(false)}
      />
      </Modal.Footer>
    </Modal>
  );
}


function QuizModal(props) {

  const [resultsShow, setResultsShow] = React.useState(false);


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

  function totalMark() {
    let mark = 0
    for (let i=0; i < userInput.length; i++) {
        console.log(userInput[i], array[i].correctAnswerIndex)
        if (userInput[i] === array[i].correctAnswerIndex) {
            mark += 1
        }
    }
    console.log(`${mark} out of 3`);
    return mark
  }

  function submitBtnHandler() {
    totalMark();
    setResultsShow(true);
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
        <Button onClick={submitBtnHandler}>Submit Quiz</Button>
        <ResultsModal
        show={resultsShow}
        onHide={() => setResultsShow(false)}
        questionsArray={array}
        userInput={userInput}
        
      />
      </Modal.Footer>
    </Modal>
  );
}


function ResultsModal(props) {

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
         Results
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>          
          {props.questionsArray[selectedQuestionIndex].question}
        </h4>
        <p>
          {props.questionsArray[selectedQuestionIndex].answers.map((answer, index) => (
            <p>{answer.text}</p>
          ))}
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

