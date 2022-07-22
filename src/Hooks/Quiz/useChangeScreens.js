import { useState } from "react";

const useChangeScreens = ({maxQuestions, setScreens}) =>{

    const [questionCount, setQuestionCount] = useState(1);
    const [answerCounter, setAnswerCounter] = useState(0);
    const [correct, setCorrect] = useState(undefined);
    const [nextDisabled, setNextDisabled] = useState(true);


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
    
    

    return {
        handleResults, 
        handleReturn, 
        handleSetCorrect, 
        handleNext, 
        setNextDisabled,
        nextDisabled,
        answerCounter,
        questionCount
    }
}

export default useChangeScreens