import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { updateCurrentUser } from 'firebase/auth';
import { useEffect } from 'react';



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
  const { user, logout } = UserAuth()
  const navigate = useNavigate()


  useEffect(() => {
    const db = getDatabase(props.firebaseapp);
    onValue(ref(db, "/users" + user.uid), (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    })
  }, [])


  function prevResults() {
    console.log("in function")
    const db = getDatabase(props.firebaseapp);
    const quizResultsRef = ref(db, "/users" + user.uid + "/quizResults");
    onValue(quizResultsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    })
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log("You are logged out")
    } catch (error) {
      console.log(error.message);
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
        <Button variant="primary" onClick={() => prevResults()}>
          Show previous results
       </Button>
       <Button variant="primary" onClick={() => handleLogout()}>
          Logout
       </Button>
      {/* <Button onClick={()=> {writeUserData("tomdizon", "tom.dizon@gmail.com", "tomdizonpw")}}>
        Add User
      </Button> */}
        
      </Modal.Footer>
    </Modal>
  );
}
