
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingBeforeLogin';
import Login from './components/login/Login';
import Signup from './components/login/SignUp';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz'
const App = () => {
  const userRole = 'wseadrftghjk';

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/quizStarted" element={<Quiz />} />
        <Route path="/startQuiz" element={<StartQuiz />} />
      </Routes>
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
