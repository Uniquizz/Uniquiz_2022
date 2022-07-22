import React, {useEffect, useState} from 'react';

export const randomizeQuiestions = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const SingleAnswer = ({answer, ind, style, button, onClickCheck}) =>{
  return <button
      type="button"
      disabled={button}
      onClick={(e) => {
        onClickCheck(ind);
      }}
      className={style}
    >
    {answer}
  </button>
}


const Questions = ({answers, handleSetCorrect, setNextDisabled}) =>{
  const [ disabledButton, setDisabledButton ] = useState(false);
  const [ questionArr, setQuestionArr ] = useState(randomizeQuiestions([
    {
      answer: answers.ans1,
      ind: 0,
      style: "container-ans"
    },
    {
      answer: answers.ans2,
      ind: 1,
      style: "container-ans"
    },
    {
      answer: answers.ans3,
      ind: 2,
      style: "container-ans"
    },
    {
      answer: answers.ans4,
      ind: 3,
      style: "container-ans"
    },
  ]));
  
  
  const handleCheck = (ind) =>{
    setNextDisabled(false);
    setDisabledButton(true);
    const indexC = questionArr.findIndex(el => el.ind == 4)
    const indexW = questionArr.findIndex(el => el.ind == ind)
    let aux = questionArr;
    aux[indexC] = {
      ...aux[indexC],
      style: "container-ans correct-ans"
    }
    if(indexC===indexW){
      handleSetCorrect(true);
    }
    else{
      aux[indexW] = {
        ...aux[indexW],
        style: "container-ans wrong-ans"
      }
      handleSetCorrect(false);
    }
    setQuestionArr(aux);
  }


  useEffect(()=>{
    setDisabledButton(false);
    setQuestionArr(randomizeQuiestions([
      {
        answer: answers.ans1,
        ind: 1,
        style: "container-ans"
      },
      {
        answer: answers.ans2,
        ind: 2,
        style: "container-ans"
      },
      {
        answer: answers.ans3,
        ind: 3,
        style: "container-ans"
      },
      {
        answer: answers.ans4,
        ind: 4,
        style: "container-ans"
      },
    ]));
  }, [answers])

  return <>
    {questionArr.map((el)=><SingleAnswer
      answer={el.answer}
      onClickCheck={handleCheck}
      style={el.style}
      ind={el.ind}
      key={el.ind}
      button={disabledButton}
    />)}
  </>
}

export default Questions;
