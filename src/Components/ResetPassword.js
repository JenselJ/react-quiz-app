import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';


export default function ResetPasswordModal(props) {

  // function writeUserData(email, password) {
  //   const db = getDatabase(app);

  //   console.log("in function")
  
  //   const reference = ref(db, "test/" + user.uid)
  
  //   set(reference, {
  //     email: email,
  //     password: password
  //   })
  // }
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')


  const { user, resetPassword } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("in forgotPassword function")
      await resetPassword(email)
      alert("Password reset link sent. Please check email.")
    } catch (error) {
      setError(error.message)
      alert(error.message)
      console.error(error)
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
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <Form className="resetPassword" onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {/* <Link to="/quiz"> */}
        <Button variant="primary" type="submit">
          Send Password Reset Email
       </Button>
        {/* </Link> */}
      {/* <Button onClick={()=> {writeUserData("tomdizon", "tom.dizon@gmail.com", "tomdizonpw")}}>
        Add User
      </Button> */}
        
      </Modal.Footer>
      </Form>
    </Modal>
  );
}