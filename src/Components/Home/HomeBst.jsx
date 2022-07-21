import React from 'react';
import './home.css';
import Rocket from '../../Images/Rocket3d.png';
import Phone from '../../Images/phone_mockup.png';
import Navbar from '../Navbar/Navbar';
import NavbarMobile from '../Navbar/NavbarMobile';
import Mono from '../../Images/avatar3d.png'
import Blog from '../Blog/Blog';
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <NavbarMobile/>

        <div className="Home">
          <div className="Hero1">
            <p className="pvalor">
              La mejor forma de prepararte para la Universidad de tus sueños
            </p>
            <h1 className="title1">
              Estudiar nunca fue <br /> tan divertido
            </h1>
          </div>




          <div className="Hero2">
            <div className="item1">
            <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "más de 100 estudiantes con ingreso éxitoso...""
                </p>
                <a className="linkMore" href="">Más...</a>
            </div>


            <div className="item2">
              <img src={Phone} className="Phone" alt='' />
              <p className="textoValorCardHero2">#Inovación 
              </p>
              <p className="textocardHero2"> 
              "La app que te ayuda a estudiar donde sea...""
              </p>
              <a className="linkMore" href="">Más...</a>
            </div>



            <div className="item3">
               <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "Una app creada por estudiantes para estudiantes...""
                </p>
                <a className="linkMore" href="">Más...</a></div>



            <div className="item4"> <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "Ni creas que te pasamos las respuestas..."
                </p>
                <a className="linkMore" href="">Más...</a></div>



            <div className="item5"> <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "Los mejores Hacks para que pases..""
                </p>
                <a className="linkMore" href="">Más...</a>
                </div>



            <div className="item6">
            <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "Más de 500 preguntas sacadas de  Examen"
                </p>
                <a className="linkMore" href="">Más...</a>

              
            </div>
            <div className="item6">
            <p className="textoValorCardHero2">#Exitos
                </p>
                <p className="textocardHero2"> 
                "Mide tu aprendizaje..""
                </p>
                <a className="linkMore" href="">Más...</a>

            </div>
          </div>

          <div className="section3">
            <img src={Rocket} className="marcian" alt="" />

            <div className="contents3">
              <h3>Uniquiz</h3>
              <p>
                Una app creada por estudiantes para estudiantes que tambien
                realizaron el mismo examen de ingreso a la universidad.
               
              </p>

              <Link to="/Quiz" className="bubbly-button">Quizate!</Link>
            </div>
          </div>

          

          <div className="metrics5">
            <div className="items">
              <p className="ps5">+1000</p>
              <h4 className="hs5">Usuarios Registrados</h4>
            </div>

            <div className="items">
              <p className="ps5">+1000</p>
              <h4 className="hs5">Usuarios Registrados</h4>
            </div>

            <div className="items">
              <p className="ps5">+1000</p>
              <h4 className="hs5">Usuarios Registrados</h4>
            </div>
          </div>
          <Blog></Blog>

          <div className="section6">

            <p className="contents3">
          <h3>"Un gran paso para el hombre..."</h3>
              Aterriza en la universidad de tus sueños
              <br /> Estudia con nosotros de la forma más practica 
             totalmente gratis{' '}
            </p>

            <img src={Mono} className="marcian" alt="" />
          </div>
        </div>
        
      </>
    );
  }
}

export default Home;
