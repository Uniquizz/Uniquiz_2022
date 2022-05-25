import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Quiz from './Components/Quiz/Quiz';
import Home1 from './Components/Home/HomeBst';
import 'bootstrap/dist/css/bootstrap.min.css';
// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDRzOIee-cqdsar7fPMk196YKul9dzaqmE',
//   authDomain: 'quizappv2-4ef02.firebaseapp.com',
//   projectId: 'quizappv2-4ef02',
//   storageBucket: 'quizappv2-4ef02.appspot.com',
//   messagingSenderId: '530546904184',
//   appId: '1:530546904184:web:9ed446b5e3354c3e42b18d',
//   measurementId: 'G-Q9HDJZKTRW',
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp({ firebaseConfig });
// } else {
//   firebase.app(); // if already initialized, use that one
// }

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="quiz" element={<Quiz />} />
        <Route path="/" element={<Home1 />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}
