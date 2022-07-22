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
        // area: null,
    });

    const [allQuestions, setAllQuestions] = useState({
        questions: [],
        // area: [],
        images: [],
        answers: [],
        matters: [],
    })
    const [questionsInfo, setQuestionsInfo] = useState({
        questions: [],
        // area: [],
        images: [],
        answers: [],
        matters: [],
    })

    const [messageCustomScreen, setMessageCustomScreen] = useState(undefined);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleChange = (e) => {
        setCustomQuizOptions({
            ...customQuizOptions,
            [e.name]: e.value,
        });
    };

    const handleStart = (e) => {
        getQuestions(customQuizOptions.numPreguntas, customQuizOptions.materia, customQuizOptions.area);
    };

    //Para area agregar a esta función el paramtero area
    const getQuestions = (numPreguntas, materia) =>{
        const tempQuestions ={
            questions: [],
            answers: [],
            images: [],
            // area: [],
            matter: [],
        }

        var arrFin = allQuestions.matters.map((e, i) => e.matter === materia ? i : '').filter(String)
        // var indArea = allQuestions.area.map((e, i) => e.area === area ? i : '').filter(String)

        //Funcion de interpolación para area y materia
        // if(indMateria.length > indArea.length){
        // indMateria.forEach(el1 => {
        //     indArea.forEach( el2 => {
        //         if(el1 == el2){
        //         arrFin.push(el1)
        //         }
        //     })
        //     })
        // }
        // else{
        // indArea.forEach(el1 => {
        //     indMateria.forEach( el2 => {
        //         if(el1 == el2){
        //             arrFin.push(el1)
        //             }
        //         })
        //     })
        // }

        console.log(arrFin.length);
        console.log(numPreguntas);
        
        if(arrFin.length > numPreguntas){
            setMessageCustomScreen(undefined);
            arrFin.splice(numPreguntas);

            for (let i = arrFin.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arrFin[i], arrFin[j]] = [arrFin[j], arrFin[i]];
            }
    
            arrFin.forEach(el=>{
                tempQuestions.questions.push(allQuestions.questions[el])
                tempQuestions.answers.push(allQuestions.answers[el])
                tempQuestions.images.push(allQuestions.images[el])
                // tempQuestions.area.push(allQuestions.area[el])
                tempQuestions.matter.push(allQuestions.matters[el])
            })
    
            setQuestionsInfo(tempQuestions);
            setMaxQuestions(tempQuestions.questions.length)

            setScreens({
                cActive: false,
                qActive: true,
                rActive: false,
            });
        }
        else{
            setMessageCustomScreen("No tenemos suficientes preguntas, prueba con menos");
        }
        
    }

    useEffect(()=>{
        const auth = getAuth();
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName);
                setLoading(false)
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
            // area: Object.values(salida.area),
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
        messageCustomScreen,
        setMessageCustomScreen,
        questionsInfo,
        setQuestionsInfo,
        setCustomQuizOptions,
        username,
        loading,
        maxQuestions,
        customQuizOptions,
    }

}



export default useGetQuestions