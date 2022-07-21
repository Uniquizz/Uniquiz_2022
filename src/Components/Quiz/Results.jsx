import React from 'react';
import Calamardo from '../../Images/image 15.png';
import ApexChart from './ApexChart';

class Results extends React.Component {
  render() {
    return (
      <>
        <div className="main-results">
          <h4 className="title-results">{this.props.username}</h4>
          <div className="line-results"></div>
          <p className="hint-results">Aún tienes remedio</p>
          <div className="container-results">
            <div className="row-left-results">
              <img style={{ marginRight: '20em' }} src={Calamardo} alt="" />
            </div>
            <div className="row-right-results">
              <ApexChart ans={this.props.totalAnswers} tot={this.props.totalQuestions}></ApexChart>
            </div>
          </div>
          <br />
          <div className="line-results"></div>
          <div className="container-results">
            <div className="container-results-2">
              <div className="text-results">
                <p>Tiempo:</p>
                <p>Preguntas:</p>
                <p>Aciertos:</p>
                <p>Errores:</p>
              </div>
              <div className="text-results">
                <p>10:22</p>
                <p>{this.props.totalQuestions}</p>
                <p>{this.props.totalAnswers}</p>
                <p>{this.props.totalQuestions - this.props.totalAnswers}</p>
              </div>
            </div>
          </div>
          <div className="line-results"></div>
          <div className="container-buttons-results">
            <div className="row-buttons">
              <button
                onClick={this.props.onClickReturn}
                className="gnr-btn btn-rep"
              >
                Repetir
              </button>
              <button className="gnr-btn btn-lect">Tomar lecciones</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Results;
