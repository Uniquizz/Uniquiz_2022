import React from 'react';
import Calamardo from '../../Images/image 15.png';
import ApexChart from './ApexChart';
import {  FacebookShareButton,  WhatsappShareButton,   FacebookIcon,
  WhatsappIcon,} from "react-share";
 

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


                  <div className="socialshare">
                    <h5 className='SocialSharingTitle'>Compartir</h5>


                    <div className="socialbtnscontainer">

                    <FacebookShareButton url={'https://uniquiz.com.mx'} quote={'Preparate gratis para entrar a la uni 🛸​ '}  hashtag={'#UNIQUIZMX'} >
                  
                  <FacebookIcon size={35}  round={true}/>
                </FacebookShareButton>


            

            <WhatsappShareButton url={'https://uniquiz.com.mx'} quote={'Preparate gratis para entrar a la uni 🛸​ '}  hashtag={'#UNIQUIZMX'}>
              <WhatsappIcon size={35} round={true}/>

            </WhatsappShareButton>



                    </div>


                  </div>

            
               
                




                 
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Results;
