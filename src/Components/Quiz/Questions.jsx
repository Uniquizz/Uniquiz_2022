import React from 'react';

export const SingleAnswer = ({answer, ind, style, button, onClickCheck}) =>{
  return <button
      type="button"
      disabled={button}
      onClick={() => {
        onClickCheck(ind);
      }}
      className={style}
      style={{ marginRight: '5%' }}
    >
    {answer}
  </button>
}


const Questions = ({answers, onClickCheck}) =>{

  return <>
    {answers.map((el)=><SingleAnswer
      answer={el.answer}
      onClickCheck={onClickCheck}
      style={el.style}
      ind={el.ind}
      key={el.ind}
      button={el.button}
    />)}
  </>
}

export default Questions;
