import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingBeforeLogin';
import Login from './components/login/Login';
import Signup from './components/login/SignUp';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/startQuiz" element={<StartQuiz />} />
      <Route path="/quizStarted" element={<Quiz />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
