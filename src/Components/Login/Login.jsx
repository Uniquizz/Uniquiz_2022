import React from 'react';
import './Login.css';

import NavBar from '../Navbar/Navbar.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import { firebaseApp } from '../../Services/firebase'

library.add(faFacebookF);
library.add(faEnvelope);
library.add(faGoogle);
library.add(faLock);
library.add(faUser);

class Login extends React.Component {
  state = {
    containerClass: 'login_row',
    email: '',
    password: '',
    phone: '',
    name: '',
    login: true,
  };

  registrar = async () => {
    console.log('diste un click a registrar paps');

    var email = this.state.email;
    var password = this.state.password;
    this.setState({ loading: true });

    await firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log('Registro completo');
        setTimeout(() => {
          console.log('aaa');
        }, 2000);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  activeLogin = (e) => {
    this.setState({ login: true });
    this.setState({containerClass: 'login_row'});

  };

  activeRegister = (e) => {
    this.setState({ login: false });
    this.setState({containerClass: 'login_row sign-up-mode'});

  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.login) {
      await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          this.props.navigate('/');
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    } else {
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          this.props.navigate('/');
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  };

  LoginGoo = (e) => {
    var provider = new firebaseApp.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        this.props.navigate('/home');
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  LoginFb = (e) => {
    var provider = new firebaseApp.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  render() {
    return (
      <>
        <NavBar></NavBar>
        <div className="login_main_container">
          <div className={this.state.containerClass}>
            <div className="login_switch">
              <div className="login_switch_title" onClick={this.activeLogin}>
                <h1>Inicia sesión</h1>
                {this.state.login ? <div className="line_active"></div> : null}
              </div>
              <div className="login_switch_title" onClick={this.activeRegister}>
                <h1>Regístrate</h1>
                {!this.state.login ? <div className="line_active"></div> : null}
              </div>
            </div>
            <form onSubmit={this.handleSubmit} className="login_form">
              {!this.state.login ? (
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#ff3860',
                    fontSize: '10pt',
                    letterSpacing: '1pt',
                  }}
                >
                  Nombre
                  <input
                    className="login_input"
                    type="text"
                    placeholder=""
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              ) : null}
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#ff3860',
                  fontSize: '10pt',
                  letterSpacing: '1pt',
                  marginTop: '1.5em',
                }}
              >
                Email
                <input
                  className="login_input"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#ff3860',
                  fontSize: '10pt',
                  letterSpacing: '1pt',
                  marginTop: '1.5em',
                }}
              >
                Password
                <input
                  className="login_input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {!this.state.login ? (
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#ff3860',
                      fontSize: '10pt',
                      letterSpacing: '1pt',
                      marginTop: '1.5em',
                    }}
                  >
                    Teléfono
                    <input
                      className="login_input"
                      type="tel"
                      name="phone"
                      minLength={10}
                      maxLength={10}
                      value={this.state.phone}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                ) : null}
                <input
                  className="login_btn"
                  type="submit"
                  value={this.state.login ? 'Ingresa' : 'Regístrate'}
                />
                {this.state.login ? (
                  <p className="login_hint login_recover">
                    *Olvidé mi contraseña
                  </p>
                ) : null}
              </div>
            </form>
            <p className="login_hint">
              O {this.state.login ? 'continua' : 'registrate'} con:
            </p>
            <div className="login_social_container">
              <FontAwesomeIcon
                size="3x"
                icon={['fab', 'google']}
                onClick={this.LoginGoo}
                style={{ cursor: 'pointer' }}
              />
              <FontAwesomeIcon
                style={{ marginLeft: '20px',cursor: 'pointer'  }}
                size="3x"
                icon={['fab', 'facebook-f']}
                onClick={this.LoginFb}
              />
            </div>
            <p className="login_hint">
              No olvides revisar nuestros{' '}
              <span style={{ color: '#fffff', cursor: 'pointer' }}>
                Términos y Condiciones
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
