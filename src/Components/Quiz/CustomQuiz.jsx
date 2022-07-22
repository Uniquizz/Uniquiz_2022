import React from 'react';
import Select from 'react-select';
import WelcomeIMG from '../../Images/welcomeIMG.webp';

// const optionsArea = [
//   { value: '1', label: 'Área 1', name: 'area' },
//   { value: '2', label: 'Área 2', name: 'area' },
//   { value: '3', label: 'Área 3', name: 'area' },
//   { value: '4', label: 'Área 4', name: 'area' },
// ];
const optionsMateria = [
  { value: 'Matemáticas', label: 'Matemáticas', name: 'materia' },
  { value: 'Español', label: 'Español y Literatura', name: 'materia' },
  { value: 'Física', label: 'Física', name: 'materia' },
  {
    value: 'Historia',
    label: 'Historia de México y Universal',
    name: 'materia',
  },
  { value: 'Química', label: 'Química', name: 'materia' },
  { value: 'Geografía', label: 'Geografía', name: 'materia' },
];
const optionsPreguntas = [
  { value: 5, label: '5', name: 'numPreguntas' },
  { value: 10, label: '10', name: 'numPreguntas' },
  { value: 20, label: '20', name: 'numPreguntas' },
  { value: 50, label: '50', name: 'numPreguntas' },
  { value: 100, label: '100', name: 'numPreguntas' },
  { value: 120, label: '120', name: 'numPreguntas' },
];
class CustomQuiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      border: '',
    };
  }

  handleClick = (e) => {
    if (this.props.options.numPreguntas && this.props.options.materia){
      console.log('enviado');
      this.props.onClick();
    } else {
      this.props.setMessageCustomScreen('¡Proporciona los datos faltantes!');
    }
  };
  render() {
    return (
      <>
        <div className="card-welcome">
          <div className="row-left-welcome">

            <div className="welcomeImgcontainer">
              <img className='welcomeImg' src={WelcomeIMG} alt="" />

            </div>
            <h3 className="user-name-welcome">{this.props.username}</h3>
            <p className="text-welcome">
              Ponte en forma y diviertete con nuestro banco de preguntas.
            </p>
          </div>
          <div className="row-right-welcome">
            {/* <p>Selecciona tu área</p> */}
            {/* <Select
              className="select-area-welcome"
              placeholder="Selecciona tu área"
              options={optionsArea}
              onChange={this.props.onChange}
            /> */}
            <p>Escoge tus materias</p>
            <Select
              className="select-area-welcome"
              placeholder="Materias"
              options={optionsMateria}
              onChange={this.props.onChange}
            />
            <p>Seleccion el número de preguntas</p>
            <Select
              className="select-area-welcome"
              placeholder="¿Cuántas champion?"
              options={optionsPreguntas}
              onChange={this.props.onChange}
            />
            <button onClick={this.handleClick} className="button-welcome">
              Empezar
            </button>
            <p className="text-welcome">{this.props.messageCustomScreen}</p>
          </div>
        </div>
      </>
    );
  }
}

export default CustomQuiz;
