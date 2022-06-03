import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {createContext, useContext} from 'react'
import LogInModal from './Components/LogInModal';
import SignUpModal from './Components/SignUpModal';
import ProfileModal from './Components/Profile';
import QuizModal from './Components/Quiz';
import ResultsModal from './Components/Results';
import ResetPasswordModal from './Components/ResetPassword';
import QuizTwoModal from './Components/Quiz2';




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
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  

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
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        await setUser(user)
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
    
    const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!")
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

    const logout = () => {
      return signOut(auth)
    }


    return (
      <UserContext.Provider value={{createUser, user, loginUser, resetPassword, logout}}>
        {children}
      </UserContext.Provider>
    )
  }
  
  export const UserAuth = () => {
    return useContext(UserContext)
  }

function App() {


  


  const [user, setUser] = useState();
  const [resultsKey, setResultsKey] = useState();





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

  let arrayTwo = [
    {
      question: "What does http stand for?",
      answers: [
        { id: 0, text: "Hypertext Transmission Procedure"},
        { id: 1, text: "Hypertext Transfer Protocol"},
        { id: 2, text: "Haemoglobin Tetrameter Transfusion Protein"},
        { id: 3, text: "Happy to tell People"}
      ],
      correctAnswerIndex: 1,
      explanation: "Hypertext Transfer Protocol (HTTP) is the foundation of the World Wide Web, and is used to load web pages using hypertext links."
    },
    {
      question: "What does the DOM stand for?",
      answers: [
        { id: 0, text: "Department of Management"},
        { id: 1, text: "Decoded Object Management"},
        { id: 2, text: "Documented Online Model"},
        { id: 3, text: "Document Object Model"}
      ],
      correctAnswerIndex: 3,
      explanation: "The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated."
    },
    {
      question: "What are the four methods of a CRUD database?",
      answers: [
        { id: 0, text: "Create, Read, Update, Delete"},
        { id: 1, text: "Create, Reduce, URL, Direct"},
        { id: 2, text: "Console, Recorder, URL, Display"},
        { id: 3, text: "Console, React, Update, Display"}
      ],
      correctAnswerIndex: 0,
      explanation: "CRUD is an acronym that comes from the world of computer programming and refers to the four functions that are considered necessary to implement a persistent storage application: create, read, update and delete."
    },
    {
      question: "Which one of these is not a http method?",
      answers: [
        { id: 0, text: "Send"},
        { id: 1, text: "Put"},
        { id: 2, text: "Patch"},
        { id: 3, text: "Delete"}
      ],
      correctAnswerIndex: 0,
      explanation: "Post, get, push, patch and delete are the primary HTTP methods, which correspond to create, read, update, and delete (or CRUD) operations, respectively. Send is a Ruby language method."
    },
    {
      question: "What does the 200 status code represent?",
      answers: [
        { id: 0, text: "A request was successful and as a result, a resource has been created."},
        { id: 1, text: "A request was received and understood and is being processed."},
        { id: 2, text: "A requested page is not available."},
        { id: 3, text: "A server understands a request but refuses to authorize it."}
      ],
      correctAnswerIndex: 1,
      explanation: "A is what status code 201 represents, C is for status code 404 and D is for status code 403."
    },
    {
      question: "Fill in the blank. A ternary operator is frequently used as alternative to a/an ______ statement.",
      answers: [
        { id: 0, text: "switch"},
        { id: 1, text: "if... else"},
        { id: 2, text: "getElementById"},
        { id: 3, text: "const"}
      ],
      correctAnswerIndex: 1,
      explanation: "The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy."
    },
    {
      question: "Which one of these is not a valid way to declare a JavaScript function?",
      answers: [
        { id: 0, text: "function myFunction() {}"},
        { id: 1, text: "const isTruthy => function() {}"},
        { id: 2, text: "const absValue = (number) => {}"},
        { id: 3, text: "(function(variable) {return typeof variable; }).name"}
      ],
      correctAnswerIndex: 1,
      explanation: "B is incorrect and the arrow function should be an equal sign: const isTruthy = function() {}. D is an anonymous function."
    },
    {
      question: "Which one of these is not a valid way to declare a JavaScript function?",
      answers: [
        { id: 0, text: "function myFunction() {}"},
        { id: 1, text: "const isTruthy => function() {}"},
        { id: 2, text: "const absValue = (number) => {}"},
        { id: 3, text: "(function(variable) {return typeof variable; }).name"}
      ],
      correctAnswerIndex: 1,
      explanation: "B is incorrect and the arrow function should be an equal sign: const isTruthy = function() {}. D is an anonymous function."
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
                // <RequireAuth>
                  <ProfileModal
                    firebaseapp={app}
                  />
                // </RequireAuth>
              }
              />
              <Route 
                exact path="/resetpassword"
                element={
                  <ResetPasswordModal/>
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
                  setUserInput={setUserInput}
                  firebaseapp={app}
                  setResultsKey={setResultsKey}
                  user={user}
                  auth={auth}
                  />}
              />

              <Route 
                exact path="/quiztwo"
                element={<QuizTwoModal
                  array={array}
                  userInput={userInput}
                  setUserInput={setUserInput}
                  firebaseapp={app}
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

