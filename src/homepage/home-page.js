import React, { useState } from 'react';
import { Button, Stack, Container, Modal, Form, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../App';
import './tailwind.css'



export default function Home({setEmail}) {
  const navigate = useNavigate()

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-text-white">
      <main className="tw-container tw-mx-auto tw-px-6 tw-pt-16 tw-flex-1 tw-text-center">

        <h2 className="tw-text-2xl md:tw-text-4xl lg:tw-text-6xl tw-uppercase">
          Welcome to
        </h2>

        <h1 className="tw-text-3xl md:tw-text-6xl lg:tw-text-8xl tw-font-black tw-uppercase tw-mb-8">
          The quiz club
        </h1>

        <div className="tw-text-lg md:tw-text-2xl lg:tw-text-3xl tw-py-2 tw-px-4 md:tw-py-4 md:tw-px-10 lg:tw-py-6 lg:tw-px-12 tw-bg-white tw-bg-opacity-10 tw-w-fit tw-mx-auto tw-mb-8 tw-rounded-full">
          942,243 members
        </div>

        <form>
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-mb-4">
            <input 
              className="tw-text-lg md:tw-text-2xl placeholder:tw-text-gray-400 placeholder:tw-italic tw-py-4 tw-px-6 md:tw-px-10 lg:tw-py-6 lg:tw-px-12 tw-bg-white tw-bg-opacity-10 focus:tw-bg-opacity-20 tw-duration-150 tw-rounded-full md:tw-rounded-tr-none md:tw-rounded-br-none tw-mb-4 md:tw-mb-0 tw-outline-none"
              placeholder="Your email ..."
              type="email"
              name="member[email]"
              onChange={(e) => setEmail(e.target.value)}
              />
            <input 
              type="submit"
              value="Join today"
              name="memeber[subscribe]"
              className="tw-bg-primary tw-rounded-full md:tw-rounded-tl-none md:tw-rounded-bl-none tw-text-lg md:tw-text-2xl tw-py-4 tw-px-6 md:tw-px-10 lg:tw-py-6 lg:tw-px-12 tw-cursor-pointer hover:tw-opacity-75 tw-duration-150"
              onClick={()=> {navigate('/signup')}}
            />
          </div>

          <div className="tw-opacity-75 tw-italic">
          Already a member? <a className="tw-cursor-pointer hover:tw-opacity-75 tw-duration-150 tw-underline" onClick={()=>{navigate('/login')}}>Log in</a>
        </div>

        </form>


      </main>

      <footer className="tw-container tw-mx-auto tw-p-6 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between">
        <p>
          Built with love by Sunny!
        </p>

        <div className="tw-flex tw--mx-6">
          <a href="#" className="tw-mx-3 hover:tw-opacity-80 tw-duration-150">About us</a> |
          <a href="#" className="tw-mx-3 hover:tw-opacity-80 tw-duration-150">Privacy</a> |
          <a href="#" className="tw-mx-3 hover:tw-opacity-80 tw-duration-150">Contact</a>
        </div>

      </footer>

    </div>
    
  );
}


