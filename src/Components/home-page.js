import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';


export default function Home(props) {
  const navigate = useNavigate()

  return (
    <div className="container">
    <h1 className = "selective-entry-title">Selective Entry</h1>
    <div className ='div0'>
      <img src='study.png' alt='students learning' width='575' height='403' class='center'/>
    <p className="quote">The ultimate resource for success in Thinking Skills
        <br></br><button onClick={()=> {navigate('/signup')}} class="join-button">Join Now</button>
    </p>
    </div>
    <div className = "div-one">
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
    </div>

    </div>
  );
}

