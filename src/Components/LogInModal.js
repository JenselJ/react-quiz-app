import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';


export default function LogInModal(props) {
  const navigate = useNavigate()


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

  const { loginUser, user } = UserAuth()


  const handleSubmit = async (e) => {
    console.log("handle submit")
    e.preventDefault()
    setError('')
    try {
      await loginUser(email, password)
      // console.log(user)
      // const db = getDatabase(app);  
      // const reference = ref(db, "users/" + user.uid)
      // set(reference, {
      //   quizResults: [0, 1, 2]
      // })
      navigate('/profile')
      // navigate to the profile screen if successful
    } catch (error) {
      setError(error.message)
      alert(error.message)
      console.error(error)
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