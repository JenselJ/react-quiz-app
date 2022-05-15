import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {createContext, useContext} from 'react'




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfMNY62TVlbxnIi-VNubg97r5DR7Jrz9Q",
  authDomain: "react-quiz-app-78f64.firebaseapp.com",
  projectId: "react-quiz-app-78f64",
  databaseURL: "https://react-quiz-app-78f64-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "react-quiz-app-78f64.appspot.com",
  messagingSenderId: "515679036300",
  appId: "1:515679036300:web:2c6f24d7197e516f83eca9",
  measurementId: "G-NBWD09HK5V"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  function RequireAuth({ children }) {
    const { user } = UserAuth()
    let location = useLocation();
  
    if (!user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }

  const UserContext = createContext()

  export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
  
    const createUser = (email, password) => {
      console.log("calling create user")
      return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
      });
    }
  
    const loginUser = (email, password) => {
      console.log("calling login user")
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
      });
    }
    

    return (
      <UserContext.Provider value={{createUser, user, loginUser}}>
        {children}
      </UserContext.Provider>
    )
  }
  
  export const UserAuth = () => {
    return useContext(UserContext)
  }


function App() {


  


  const [user, setUser] = useState();





  // const [modalShow, setModalShow] = React.useState(true);
  // const [profileShow, setProfileShow] = React.useState(false);
  // const [signUpShow, setSignUpShow] = React.useState(false);
  // const [quizShow, setQuizShow] = React.useState(false);
  // const [resultsShow, setResultsShow] = React.useState(false);
  const [userInput, setUserInput] = useState([]);


  let array = [
    {
      question: "What is the size of the sun?",
      answers: [
        { id: 0, text: "57km"},
        { id: 1, text: "12ft"},
        { id: 2, text: "4inches"},
        { id: 3, text: "10000km"}
      ],
      correctAnswerIndex: 3,
      explanation: "The sun is really big."
    },
    {
      question: "What color is a banana?",
      answers: [
        { id: 0, text: "orange"},
        { id: 1, text: "yellow"},
        { id: 2, text: "red"},
        { id: 3, text: "purple"}
      ],
      correctAnswerIndex: 1,
      explanation: "Bananas are yellow."
    },
    {
      question: "What is 2 + 2?",
      answers: [
        { id: 0, text: "4"},
        { id: 1, text: "10"},
        { id: 2, text: "15"},
        { id: 3, text: "0"}
      ],
      correctAnswerIndex: 0,
      explanation: "Two more than two is four."
    }
  ]




  return (
    <AuthContextProvider>
      <Router>
        <Routes>
           <Route 
                exact path="/"
                element={<LogInModal
                  auth={auth}
                  setUser={setUser}
                  />}
              />
              <Route 
                exact path="/profile"
                element={
                <RequireAuth>
                  <ProfileModal/>
                </RequireAuth>
              }
              />

              <Route 
                exact path="/signup"
                element={<SignUpModal
                  auth={auth}
                  setUser={setUser}
                  />}
              />

              <Route 
                exact path="/quiz"
                element={<QuizModal
                  array={array}
                  userInput={userInput}
                  />}
              />

              <Route 
                exact path="/results"
                element={<ResultsModal
                  questionsArray={array}
                  userInput={userInput}
                  />}
              />            
              

              {/* <Route exact path="/">
              <LogInModal
                auth={auth}
                setUser={setUser}
                />
              </Route>
              <Route exact path="/profile">
              {user && user.email}
              <ProfileModal />
              </Route>
              <Route exact path="/signup">
              <SignUpModal 
                auth={auth}
                />
              </Route>
              <Route exact path="/quiz">
              <QuizModal 
                array={array}
                userInput={userInput}
              />
              </Route>
              <Route exact path="/results">
              <ResultsModal 
                questionsArray={array}
                userInput={userInput}
              />
              </Route> */}


          </Routes>
        </Router>
    </AuthContextProvider>
    
  )
}

export default App;

function LogInModal(props) {
  const navigate = useNavigate()

  const [login, setLogin] = useState("false")

  // function loginFormSubmitHandler() {

  //   const loginForm = document.querySelector('.login')

  //   const email = loginForm.email.value

  //   const password = loginForm.password.value

  //   signInWithEmailAndPassword(props.auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     console.log(user);
  //     loginForm.reset()
  //     props.setUser(user);
  //     setLogin("true")
  //     console.log(login)
  //     const db = getDatabase();
  //     const userREF = ref(db, "users/" + user.uid)
  //     set(userREF, {
  //       quizresults: [1, 2, 3]
  //     });
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     alert(errorMessage)
  //   });

  // }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { loginUser } = UserAuth()


  const handleSubmit = async (e) => {
    console.log("handle submit")
    e.preventDefault()
    setError('')
    try{
      await loginUser(email, password)
      navigate('/profile')
      // navigate to the profile screen if successful
    
    } catch (error) {
      setError(error.message)
      alert(error.message)
    }
  }


  return (
    <Modal
      size="lg"
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Log In
        </Modal.Title>
      </Modal.Header>
    <Form className="login" onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/signup">
        <Button variant="primary">
          SignUp
       </Button>
        </Link>
      <Button variant="primary" type="submit">
          Login
       </Button>      
      </Modal.Footer>
    </Form>

    </Modal>
  );
}

function SignUpModal(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { createUser } = UserAuth()

  const handleSubmit = async (e) => {
    console.log("handle submit")
    e.preventDefault()
    setError('')
    try{
      await createUser(email, password)
      navigate('/profile')
      // navigate to the profile screen if successful
    
    } catch (error) {
      setError(error.message)
      alert(error.message)
    }
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
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Form className='signup' onSubmit={handleSubmit}>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
       
        
      </Modal.Footer>
      </Form>

    </Modal>
  );
}

function ProfileModal(props) {

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
        <Link to="/quiz">
        <Button variant="primary">
          Start Quiz
       </Button>
        </Link>
        
      </Modal.Footer>
    </Modal>
  );
}


function QuizModal(props) {


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


function ResultsModal(props) {

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

