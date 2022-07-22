import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Quiz from './Components/Quiz/Quiz';
import Home1 from './Components/Home/HomeBst';
import { checkAuth } from './Services/firebase';


export default function App() {
  checkAuth();

  return (
    <div>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/" element={<Home1 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
