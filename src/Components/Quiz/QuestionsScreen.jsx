import React, {useState, useEffect} from 'react';
import Questions from './Questions';
import Img from '../../Images/example.png';
import Loading from '../Auxiliar/Loading';


const QuestionsScreen = (props) => {

  const { username,
    handleSetCorrect,
    questions,
    answers,
    nextDisabled,
    setNextDisabled,
    images,
    onClickResults,
    onClickNext,
  } = props

  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] =  useState(0);

  useEffect(()=>{
  let myInterval = setInterval(() => {
          setSeconds(seconds + 1);
          if (seconds === 60) {
              setMinutes(minutes+1);
              setSeconds(0);
          } 
      }, 1000)
      return ()=> {
          clearInterval(myInterval);
        };
  });


  return (
    <div className="main-questions">
      <div className="title-questions stick">
        <h4>{username}</h4>
        <h4 className="text-time">{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h4>
      </div>
      <div className="line-questions stick-2"></div>
      <div className="container-general-questions">
        <div className="container-questions">
          <p className="text-question">{questions.pregunta}</p>
        </div>
        {images.image && <img src={Img} alt="" className="image-question" />}
      </div>
      <div className='container-answers'>
        <Questions
          answers={answers}
          handleSetCorrect={handleSetCorrect}
          setNextDisabled={setNextDisabled}
        />
      </div>
      <div className="container-buttons">
        <button
          onClick={onClickResults}
          className="gnr-btn btn-res"
        >
          Resultados
        </button>
        <button onClick={onClickNext} className={`${nextDisabled ? "btn-next-disabled" : "btn-next"} gnr-btn `}>
          Siguiente
        </button>
      </div>
    </div>
  );

}

export default QuestionsScreen;
