import React, {useState, useEffect} from 'react';
import Questions from './Questions';
import Img from '../../Images/example.png';
import Loading from '../Auxiliar/Loading';

export const randomizeQuiestions = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const QuestionsScreen = (props) => {

  const { username,
    onClickCheck,
    styleInfo,
    questions,
    answers,
    images,
    onClickResults,
    onClickNext,
    questionCount,
  } = props

  const [ minutes, setMinutes ] = useState(0);
  const [seconds, setSeconds ] =  useState(0);
  const [ randomArr, setRandomArr ] = useState([
    {
      answer: answers.ans1,
      style: styleInfo.styleAns1,
      button: styleInfo.buttonDisabled,
      ind: 1,
    },
    {
      answer: answers.ans2,
      style: styleInfo.styleAns2,
      button: styleInfo.buttonDisabled,
      ind: 2,
    },
    {
      answer: answers.ans3,
      style: styleInfo.styleAns3,
      button: styleInfo.buttonDisabled,
      ind: 3,
    },
    {
      answer: answers.ans4,
      style: styleInfo.styleAns4,
      button: styleInfo.buttonDisabled,
      ind: 4,
    },
  ]);

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

  useEffect(()=>{
    

  }, [onClickCheck]);

  useEffect(()=>{
    console.log(questionCount)
    setRandomArr(()=>randomizeQuiestions(randomArr))
  }, [questionCount])


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
      <Questions
        answers={randomArr}
        onClickCheck={onClickCheck}
      />
      <div className="container-buttons">
        <button
          onClick={onClickResults}
          className="gnr-btn btn-res"
        >
          Resultados
        </button>
        <button onClick={onClickNext} className="gnr-btn btn-next">
          Siguiente
        </button>
      </div>
    </div>
  );

}

export default QuestionsScreen;
