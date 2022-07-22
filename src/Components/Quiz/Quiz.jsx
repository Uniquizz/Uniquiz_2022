import React, {useState} from 'react';
import CustomQuiz from './CustomQuiz';
import QuestionsScreen from './QuestionsScreen';
import Results from './Results';
import Navbar from '../Navbar/Navbar';
import './Styles.css';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { database } from '../../Services/firebase';
import { ref, child, get }  from "firebase/database";
import { useEffect } from 'react';

const Quiz = () => {
  const [screens, setScreens] = useState({
    cActive: true,
    qActive: false,
    rActive: false,
  })
  const [questionsInfo, setQuestionsInfo] = useState({
    questions: [],
    area: [],
    images: [],
    answers: [],
    matters: [],
  })
  const [questionCount, setQuestionCount] = useState(1);
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [answerCounter, setAnswerCounter] = useState(0);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState(undefined);
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleStart = (e) => {
    setScreens({
      cActive: false,
      qActive: true,
      rActive: false,
    });
  };

  const handleResults = (e) => {
    setScreens({
      cActive: false,
      qActive: false,
      rActive: true,
    });
  };

  const handleReturn = (e) => {
    setScreens({
      cActive: true,
      qActive: false,
      rActive: false,
    });
    setQuestionCount(1);
    setCorrect(undefined);
  };

  const handleSetCorrect = (bol) => {
    setCorrect(bol)
  }

  const handleNext = (e) => {
    console.log(maxQuestions)
    if(typeof(correct) != "undefined"){
      correct && setAnswerCounter(answerCounter+1);
      if (questionCount + 1 < maxQuestions) {
        setQuestionCount(questionCount+1);
        setCorrect(undefined);
      } else {
        setScreens({
          rActive: true,
          qActive: false,
          cActive: false,
        });
      }
    }
    else{
      setNextDisabled(true);
    }
  };

  useEffect(()=>{
    const auth = getAuth();
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUsername(user.displayName);
        setLoading(false)
        // ...
      } else {
        setLoading(false);
      }
    });

    var salida;
    const dbRef = ref(database);
    get(child(dbRef, 'quiz')).then((snapshot) => {
      if (snapshot.exists()) {
        salida = snapshot.val();
        setQuestionsInfo({
          questions: Object.values(salida.questions),
          answers: Object.values(salida.answers),
          images: Object.values(salida.images),
          area: Object.values(salida.area),
          matters: Object.values(salida.matters),
        });
      } else {
        console.log("No data available");
      }
    })
    .then(() => {
      setMaxQuestions(questionsInfo.questions.length);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [screens]) 

  return (
    <>
      {!loading && !username && (
        <Navigate to="/login" replace={true} />
      )}
      {screens.qActive || screens.rActive ? null : <Navbar />}
      <div className="main-welcome">
        {screens.qActive || screens.rActive ? (
          <h1 className="title-welcome-nopad">
            <span style={{ color: 'white' }}>#</span>Quizate
          </h1>
        ) : (
          <h1 className="title-welcome">
            <span style={{ color: 'white' }}>#</span>Quizate
          </h1>
        )}
        <div className="main-card">
          {screens.cActive & !screens.qActive & !screens.rActive ? (
            <CustomQuiz username={username} onClick={handleStart} />
          ) : !screens.cActive &
            screens.qActive &
            !screens.rActive ? (
            <QuestionsScreen
              username={username}
              correct = {correct}
              handleSetCorrect = {handleSetCorrect}
              questions = {questionsInfo.questions[questionCount]}
              answers = {questionsInfo.answers[questionCount]}
              images = {questionsInfo.images[questionCount]}
              onClickResults = {handleResults}
              onClickNext = {handleNext}
              nextDisabled = {nextDisabled}
              questionCount = {questionCount}
              setNextDisabled = {setNextDisabled}
            />
          ) : (
            <Results
              username={username}
              onClickReturn={handleReturn}
              totalAnswers={answerCounter}
              totalQuestions={maxQuestions - 1}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
