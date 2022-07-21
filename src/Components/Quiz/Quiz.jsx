import React from 'react';
import CustomQuiz from './CustomQuiz';
import QuestionsScreen from './QuestionsScreen';
import Results from './Results';
import Navbar from '../Navbar/Navbar';
import './Styles.css';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { database } from '../../Services/firebase';
import { ref, child, get }  from "firebase/database";

class Quiz extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cActive: true,
      qActive: false,
      rActive: false,
      questions: [],
      area: [],
      answers: [],
      matters: [],
      images: [],
      singleAnswers: [],
      questionCount: 1,
      maxQuestions: 0,
      answerCounter: 0,
      username: null,
      loading: true,
      correct: undefined,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }


  handleCheck(indx) {
    if (indx === 4) {
      this.setState({
        answerCounter: this.state.answerCounter + 1,
        correct: true,
      });
    }
    else{
      this.setState({
        correct: false,
      })
    }
  };

  handleStart = (e) => {
    this.setState({
      cActive: false,
      qActive: true,
      rActive: false,
    });
  };

  handleResults = (e) => {
    this.setState({
      cActive: false,
      qActive: false,
      rActive: true,
    });
  };

  handleReturn = (e) => {
    this.setState({
      questionCount: 1,
      correct: undefined,
      cActive: true,
      qActive: false,
      rActive: false,
    });
  };

  handleNext = (e) => {
    console.log(this.state.answerCounter);
    if (this.state.questionCount + 1 < this.state.maxQuestions) {
      this.setState({
        questionCount: this.state.questionCount + 1,
        correct: undefined,
      });
    } else {
      this.setState({
        rActive: true,
        qActive: false,
        cActive: false,
      });
    }
  };

  componentDidMount() {
    const auth = getAuth();
    this.setState({loading: true});
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({username: user.displayName});
        this.setState({loading: false})
        // ...
      } else {
        this.setState({loading: false})
      }
    });

    var salida;
    const dbRef = ref(database);
    get(child(dbRef, 'quiz')).then((snapshot) => {
      if (snapshot.exists()) {
        salida = snapshot.val();
        this.setState({
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
      this.setState({ maxQuestions: this.state.questions.length });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <>
        {!this.state.loading && !this.state.username && (
          <Navigate to="/login" replace={true} />
        )}
        {this.state.qActive || this.state.rActive ? null : <Navbar />}
        <div className="main-welcome">
          {this.state.qActive || this.state.rActive ? (
            <h1 className="title-welcome-nopad">
              <span style={{ color: 'white' }}>#</span>Quizate
            </h1>
          ) : (
            <h1 className="title-welcome">
              <span style={{ color: 'white' }}>#</span>Quizate
            </h1>
          )}
          <div className="main-card">
            {this.state.cActive & !this.state.qActive & !this.state.rActive ? (
              <CustomQuiz username={this.state.username} onClick={this.handleStart} />
            ) : !this.state.cActive &
              this.state.qActive &
              !this.state.rActive ? (
              <QuestionsScreen
                username={this.state.username}
                onClickCheck = {this.handleCheck}
                styleInfo = {this.state.styleInfo}
                correct = {this.state.correct}
                questions = {this.state.questions[this.state.questionCount]}
                answers = {this.state.answers[this.state.questionCount]}
                images = {this.state.images[this.state.questionCount]}
                onClickResults = {this.handleResults}
                onClickNext = {this.handleNext}
                questionCount = {this.state.questionCount}
              />
            ) : (
              <Results
                username={this.state.username}
                onClickReturn={this.handleReturn}
                totalAnswers={this.state.answerCounter}
                totalQuestions={this.state.maxQuestions - 1}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
