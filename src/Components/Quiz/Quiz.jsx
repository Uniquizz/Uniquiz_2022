import React from 'react';
import CustomQuiz from './CustomQuiz';
import QuestionsScreen from './QuestionsScreen';
import Results from './Results';
import Navbar from '../Navbar/Navbar';
import './Styles.css';
import { firebase } from '../../firebase';

class Quiz extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      styleInfo: {
        buttonDisabled: false,
        styleAns1: 'container-ans',
        styleAns2: 'container-ans',
        styleAns3: 'container-ans',
        styleAns4: 'container-ans',
      },
      cActive: true,
      qActive: false,
      rActive: false,
      questions: [],
      area: [],
      answers: [],
      matters: [],
      images: [],
      questionCount: 1,
      maxQuestions: 0,
      answerCounter: 0,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(indx) {
    var rightAnswer = parseInt(
      this.state.answers[this.state.questionCount].rans
    );
    switch (indx) {
      case 1:
        if (rightAnswer === 1) {
          this.setState({
            styleInfo: {
              ...this.state.styleInfo,
              styleAns1: 'container-ans correct-ans',
              buttonDisabled: true,
            },
            answerCounter: this.state.answerCounter + 1,
          });
        } else {
          this.setState(
            {
              styleInfo: {
                ...this.state.styleInfo,
                styleAns1: 'container-ans wrong-ans',
                buttonDisabled: true,
              },
            },
            () => this.correctQuestion(rightAnswer)
          );
        }
        break;
      case 2:
        if (rightAnswer === 2) {
          this.setState({
            styleInfo: {
              ...this.state.styleInfo,
              styleAns2: 'container-ans correct-ans',
              buttonDisabled: true,
            },
            answerCounter: this.state.answerCounter + 1,
          });
        } else {
          this.setState(
            {
              styleInfo: {
                ...this.state.styleInfo,
                styleAns2: 'container-ans wrong-ans',
                buttonDisabled: true,
              },
            },
            () => this.correctQuestion(rightAnswer)
          );
        }
        break;
      case 3:
        if (rightAnswer === 3) {
          this.setState({
            styleInfo: {
              ...this.state.styleInfo,
              styleAns3: 'container-ans correct-ans',
              buttonDisabled: true,
            },
            answerCounter: this.state.answerCounter + 1,
          });
        } else {
          this.setState(
            {
              styleInfo: {
                ...this.state.styleInfo,
                styleAns3: 'container-ans wrong-ans',
                buttonDisabled: true,
              },
            },
            () => this.correctQuestion(rightAnswer)
          );
        }
        break;
      case 4:
        if (rightAnswer === 4) {
          this.setState({
            styleInfo: {
              ...this.state.styleInfo,
              styleAns4: 'container-ans correct-ans',
              buttonDisabled: true,
            },
            answerCounter: this.state.answerCounter + 1,
          });
        } else {
          this.setState(
            {
              styleInfo: {
                ...this.state.styleInfo,
                styleAns4: 'container-ans wrong-ans',
                buttonDisabled: true,
              },
            },
            () => this.correctQuestion(rightAnswer)
          );
        }
        break;
      default:
        console.log('algo salio mal');
        break;
    }
  }

  correctQuestion(rightAnswer) {
    switch (rightAnswer) {
      case 1:
        this.setState({
          styleInfo: {
            ...this.state.styleInfo,
            styleAns1: 'container-ans correct-ans',
          },
        });
        break;
      case 2:
        this.setState({
          styleInfo: {
            ...this.state.styleInfo,
            styleAns2: 'container-ans correct-ans',
          },
        });
        break;
      case 3:
        this.setState({
          styleInfo: {
            ...this.state.styleInfo,
            styleAns3: 'container-ans correct-ans',
          },
        });
        break;
      case 4:
        this.setState({
          styleInfo: {
            ...this.state.styleInfo,
            styleAns4: 'container-ans correct-ans',
          },
        });
        break;
      default:
        console.log('algo salio mal');
        break;
    }
  }

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
      styleInfo: {
        buttonDisabled: false,
        styleAns1: 'container-ans',
        styleAns2: 'container-ans',
        styleAns3: 'container-ans',
        styleAns4: 'container-ans',
      },
      cActive: true,
      qActive: false,
      rActive: false,
    });
  };

  handleNext = (e) => {
    if (this.state.questionCount + 1 < this.state.maxQuestions) {
      this.setState({
        questionCount: this.state.questionCount + 1,
        styleInfo: {
          buttonDisabled: false,
          styleAns1: 'container-ans',
          styleAns2: 'container-ans',
          styleAns3: 'container-ans',
          styleAns4: 'container-ans',
        },
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
    var salida;
    const dbRef = firebase.database().ref();
    dbRef
      .child('quiz')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          salida = snapshot.val();
          this.setState({
            questions: Object.values(salida.questions),
            answers: Object.values(salida.answers),
            images: Object.values(salida.images),
            area: Object.values(salida.area),
            matters: Object.values(salida.matters),
          });
          console.log(this.state);
        } else {
          console.log('No data available');
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
              <CustomQuiz onClick={this.handleStart} />
            ) : !this.state.cActive &
              this.state.qActive &
              !this.state.rActive ? (
              <QuestionsScreen
                onClickCheck = {this.handleCheck}
                styleInfo = {this.state.styleInfo}
                questions = {this.state.questions[this.state.questionCount]}
                answers = {this.state.answers[this.state.questionCount]}
                images = {this.state.images[this.state.questionCount]}
                onClickResults = {this.handleResults}
                onClickNext = {this.handleNext}
              />
            ) : (
              <Results
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
