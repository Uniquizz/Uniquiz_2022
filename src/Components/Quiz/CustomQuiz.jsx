import React from 'react';
import Select from 'react-select';
import PP from '../../Images/PP.png';

const optionsArea = [
  { value: '1', label: 'Área 1', name: 'area' },
  { value: '2', label: 'Área 2', name: 'area' },
  { value: '3', label: 'Área 3', name: 'area' },
];
const optionsMateria = [
  { value: 'matematicas', label: 'Matemáticas', name: 'materia' },
  { value: 'español', label: 'Español y Literatura', name: 'materia' },
  { value: 'fisica', label: 'Física', name: 'materia' },
  {
    value: 'historia',
    label: 'Historia de México y Universal',
    name: 'materia',
  },
  { value: 'quimica', label: 'Química', name: 'materia' },
  { value: 'geografia', label: 'Geografía', name: 'materia' },
];
const optionsPreguntas = [
  { value: '1', label: '5', name: 'numPreguntas' },
  { value: '2', label: '10', name: 'numPreguntas' },
  { value: '3', label: '20', name: 'numPreguntas' },
  { value: '4', label: '50', name: 'numPreguntas' },
  { value: '5', label: '100', name: 'numPreguntas' },
  { value: '6', label: '120', name: 'numPreguntas' },
];
class CustomQuiz extends React.Component {
  state = {
    numPreguntas: null,
    materia: null,
    area: null,
    border: '',
    message: '¡Obten tus resultado en cualquier momento!',
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.name]: e.value,
    });
  };

  handleClick = (e) => {
    if (this.state.numPreguntas && this.state.area && this.state.materia) {
      console.log('enviado');
      this.props.onClick();
    } else {
      this.setState({ message: '¡Proporciona los datos faltantes!' });
    }
  };
  render() {
    return (
      <>
        <div className="card-welcome">
          <div className="row-left-welcome">
            <img className="photo-welcome" src={PP} alt="Profile" />
            <h3 className="user-name-welcome">Israel Albarrán</h3>
            <p className="text-welcome">
              Ponte en forma y diviertete con nuestro banco de preguntas.
            </p>
          </div>
          <div className="row-right-welcome">
            <p>Selecciona tu área</p>
            <Select
              className="select-area-welcome"
              placeholder="Selecciona tu área"
              options={optionsArea}
              onChange={this.handleChange}
            />
            <p>Escoge tus materias</p>
            <Select
              className="select-area-welcome"
              placeholder="Materias"
              options={optionsMateria}
              onChange={this.handleChange}
            />
            <p>Seleccion el número de preguntas</p>
            <Select
              className="select-area-welcome"
              placeholder="¿Cuántas champion?"
              options={optionsPreguntas}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick} className="button-welcome">
              Empezar
            </button>
            <p className="text-welcome  ">{this.state.message}</p>
          </div>
        </div>
      </>
    );
  }
}

export default CustomQuiz;
