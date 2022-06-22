import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';


export default function Home(props) {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="d-flex">
        <h1 className = "selective-entry-title">Sunny's Spectacular Quizes</h1>
        <div className="my-auto">
          <Button className="mx-2" onClick={()=>{navigate('/login')}}>
            Login
          </Button>
        </div>
        

      </div>
    
    <div className ='div0'>
      <img style={{maxWidth: "100%"}} src='study.png' alt='students learning' height='403' class='center'/>
    <p className="quote">Test your general and front-end knowledge!
        <br></br><button style={{marginTop: "20px"}} onClick={()=> {navigate('/signup')}} class="join-button">Join Now</button>
    </p>
    </div>
    {/* <div className = "div-one">
      <h2>Thinking Skills package from just $10</h2>
        <ul>
      <li>100+ Questions</li>
      <li>3 Full Mock Exams</li>
      <li>In-Depth Explanations for all questions</li>
      <li>Structured Learning</li>
      <li>Updated Weekly</li>
      </ul> 
      <div className = "learn-more-div">
        <button className ="learn-more-button">Learn More</button>
      </div>
    </div>

    <div className = "div-two">
      <div className = "sample-test-div">
      <a href="/login"><button className="sample-test-button">Take free Thinking Skills sample test</button></a>
      </div>
    </div> */}

    </div>
  );
}

