import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingBeforeLogin';
import Test from './components/Test';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Test />} />
    </Routes>
  );
};

export default App;
