import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';


export default function ProfileModal(props) {

  // function writeUserData(email, password) {
  //   const db = getDatabase(app);

  //   console.log("in function")
  
  //   const reference = ref(db, "test/" + user.uid)
  
  //   set(reference, {
  //     email: email,
  //     password: password
  //   })
  // }
  const { user } = UserAuth()
  
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
        <h4>Profile Modal {user.uid}</h4>
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
      {/* <Button onClick={()=> {writeUserData("tomdizon", "tom.dizon@gmail.com", "tomdizonpw")}}>
        Add User
      </Button> */}
        
      </Modal.Footer>
    </Modal>
  );
}
