import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { database } from '../../Services/firebase';
import { ref, child, get }  from "firebase/database";

export const randomizeQuiestions = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const useGetQuestions = ({screens, setScreens}) =>{

    const [maxQuestions, setMaxQuestions] = useState(0);
    const [customQuizOptions, setCustomQuizOptions] = useState({
        numPreguntas: null,
        materia: null,
        area: null,
    });

    const [allQuestions, setAllQuestions] = useState({
        questions: [],
        area: [],
        images: [],
        answers: [],
        matters: [],
    })
    const [questionsInfo, setQuestionsInfo] = useState({
        questions: [],
        area: [],
        images: [],
        answers: [],
        matters: [],
    })
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleChange = (e) => {
        setCustomQuizOptions({
            ...customQuizOptions,
            [e.name]: e.value,
        });
    };

    const handleStart = (e) => {
        console.log(customQuizOptions.numPreguntas)
        getQuestions(customQuizOptions.numPreguntas, customQuizOptions.materia, customQuizOptions.area);
        setScreens({
            cActive: false,
            qActive: true,
            rActive: false,
        });
    };

    const getQuestions = (numPreguntas, materia, area) =>{
        const questions = []
        const answers = []
        const images = []
        var arrFin = [];

        var indMateria = allQuestions.matters.map((e, i) => e.matter === materia ? i : '').filter(String)
        var indArea = allQuestions.area.map((e, i) => e.area === area ? i : '').filter(String)


        if(indMateria.length > indArea.length){
        indMateria.forEach(el1 => {
            console.log(el1)
            indArea.forEach( el2 => {
                if(el1 == el2){
                arrFin.push(el1)
                }
            })
            })
        }
        else{
        indArea.forEach(el1 => {
            indMateria.forEach( el2 => {
                if(el1 == el2){
                    arrFin.push(el1)
                    }
                })
            })
        }
        
        arrFin.splice(numPreguntas);

        for (let i = arrFin.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrFin[i], arrFin[j]] = [arrFin[j], arrFin[i]];
        }
        console.log(arrFin);

        arrFin.forEach(el=>{
            questions.push(allQuestions.questions[el])
            answers.push(allQuestions.answers[el])
            images.push(allQuestions.images[el])
        })

        setQuestionsInfo({
            questions: questions,
            answers: answers,
            images: images,
        })
        setMaxQuestions(questions.length)
    }

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
    }, []);

    var salida;
    const dbRef = ref(database);
    get(child(dbRef, 'quiz')).then((snapshot) => {
        if (snapshot.exists()) {
        salida = snapshot.val();
        setAllQuestions({
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
    .then(()=>{
        setLoading(false);
    })
    .catch((error) => {
        console.error(error);
    });
    }, [screens])

    return{
        handleChange,
        handleStart,
        questionsInfo,
        username,
        loading,
        maxQuestions,
        customQuizOptions,
    }

}



export default useGetQuestions