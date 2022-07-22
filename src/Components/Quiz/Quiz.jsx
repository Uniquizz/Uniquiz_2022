import React, {useState} from 'react';
import CustomQuiz from './CustomQuiz';
import QuestionsScreen from './QuestionsScreen';
import Results from './Results';
import Navbar from '../Navbar/Navbar';
import './Styles.css';
import { Navigate } from 'react-router-dom';
import useChangeScreens from '../../Hooks/Quiz/useChangeScreens';
import useGetQuestions from '../../Hooks/Quiz/useGetQuestions';

const Quiz = () => {

  const [screens, setScreens] = useState({
      cActive: true,
      qActive: false,
      rActive: false,
  });

  const{
    handleChange,
    handleStart,
    username,
    loading,
    maxQuestions,
    customQuizOptions,
    questionsInfo,
    setQuestionsInfo,
    setCustomQuizOptions,
    messageCustomScreen,
    setMessageCustomScreen
  } = useGetQuestions({screens, setScreens});

  const { 
    handleResults, 
    handleReturn, 
    handleSetCorrect, 
    handleNext, 
    setNextDisabled,
    nextDisabled, 
    questionCount,
    correct,
    answerCounter,
   } = useChangeScreens({maxQuestions, setScreens, setQuestionsInfo, setCustomQuizOptions});


   console.log(questionsInfo);
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
            <CustomQuiz 
              onChange={handleChange} 
              options={customQuizOptions} 
              username={username} 
              onClick={handleStart}
              messageCustomScreen = {messageCustomScreen}
              setMessageCustomScreen = {setMessageCustomScreen}
            />
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
