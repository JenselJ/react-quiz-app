import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';
import { getDatabase, ref, get, child } from "firebase/database";
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

//   Object.entries(allScores).flatMap(score => {
//     return Object.values(score[1]).map(s => {return {...s, id: score[0]}})
// })

  const { user, logout } = UserAuth()
  const navigate = useNavigate()
  const [userResultsData, setUserResultsData] = useState({})
  const [displayScores, setDisplayScores] = useState([])


  useEffect(() => {
    console.log("use effect")
    const db = getDatabase(props.firebaseapp);
    // console.log(db)
    // console.log(user)
    const dbRef = ref(db);
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setUserResultsData(data)
        // console.log(data)
       
       
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    console.log('second use effect')
    get(child(dbRef, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        const allScoresData = snapshot.val()
        // console.log(allScoresData)
        console.log('data exists')

        let scoresArray = Object.entries(allScoresData).flatMap(score => {
          return Object.values(score[1]).map(s => {return {...s, id: score[0]}})
        })

        console.log(scoresArray)

        scoresArray.sort(function(a,b) {
        if (b.quizResults === a.quizResults) {
          return b.date - a.date
        } else {
        return b.quizResults - a.quizResults
        }
       })

       let date1 = scoresArray[0].date

       console.log(date1)

       const day1 = date1.getDate();
       const month1 = date1.getMonth();
       const year1 = date1.getFullYear();

       console.log(`${day1} + ${month1} + ${year1}`)

      console.log(scoresArray)

      setDisplayScores(scoresArray)

      // function sortObjectEntries(obj, n){
   
      //   let sortedList = []
      //   //Sorting by values asc
      //   sortedList = Object.entries(obj).sort((a,b)=>{
      //         if(b[1] > a[1]) return 1;
      //         else if(b[1] < a[1]) return -1;
      //   //if values are same do edition checking if keys are in the right order
      //         else {
      //            if(a[0] > b[0]) return 1;
      //            else if(a[0] < b[0]) return -1;
      //            else return 0
      //     }
      //    })
      //    // return first n values from sortedList
      //     return sortedList.map(el=>el[0]).slice(0,n)
      //    }

      //  setDisplayScores(sortObjectEntries(scoresObject, 3))
       
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }, [])

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
          Profile Page
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Your previous scores</h5>

        <ul>
         
          {Object.values(userResultsData).map(value => (
          <li> {value.date}, {value.quizResults} </li>)
          )}
        </ul>

        <h5>
          Top scores across all players
        </h5>
         
        <ul>
        {Object.values(displayScores).slice(0,3).map(value => (
          <li> {value.date}, {value.quizResults} </li>)
        )}
        </ul>
         

      </Modal.Body>
      <Modal.Footer>
        <Link to="/quiz">
        <Button variant="primary">
          Start Quiz 1
       </Button>
        </Link>
        <Link to="/quiztwo">
        <Button variant="primary">
          Start Quiz 2
       </Button>
        </Link>
       <Button variant="primary" onClick={() => handleLogout()}>
          Logout
       </Button>
       <Button onClick={() => console.log(displayScores)}>
         console
       </Button>
      {/* <Button onClick={()=> {writeUserData("tomdizon", "tom.dizon@gmail.com", "tomdizonpw")}}>
        Add User
      </Button> */}
        
      </Modal.Footer>
    </Modal>
  );
}
