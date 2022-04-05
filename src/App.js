import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form } from 'react-bootstrap';

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <Button variant="primary" onClick={() => setModalShow(true)}>
      Start Quiz
      {/* button will later be in a modal */}
    </Button>

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
        answers: ["57km", "12ft", "4inches", "10000km"],
        correctAnswerIndex: 3
    },
    {
        question: "What color is a banana?",
        answers: ["orange", "yellow", "red", "purple"],
        correctAnswerIndex: 1
    },
    {
        question: "What is 2 + 2?",
        answers: ["4", "10", "15", "0"],
        correctAnswerIndex: 0
    },
  ]

  const [arrayIndex, setArrayIndex] = useState(0);

  function addOneToIndex() {
    if (arrayIndex < array.length - 1) {
      setArrayIndex(prevArrayIndex => prevArrayIndex + 1)
    }
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
          Question {arrayIndex + 1}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{array[arrayIndex].question}</h4>
        <p>
        <Form>
          {array[arrayIndex].answers.map((answer) => (
            <div key={answer} className="mb-3">
              <Form.Check 
                type='checkbox'
                id={answer}
                label={answer}
              />
            </div>
          ))}
        </Form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Previous Question</Button>
        <Button onClick={addOneToIndex}>Next Question</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
