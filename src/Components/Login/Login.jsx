import React from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';
import NavBar from '../Navbar/Navbar.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { 
  getAuth, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

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
    user: false,
  };
  

  registrar = async () => {
    console.log('diste un click a registrar paps');

    var email = this.state.email;
    var password = this.state.password;
    this.setState({ loading: true });

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
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

    var email = this.state.email;
    var password = this.state.password;
    
    const auth = getAuth();
    e.preventDefault();
    if (!this.state.login) {
      createUserWithEmailAndPassword(auth, email, password)
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
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  };

  LoginGoo = (e) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
  };

  LoginFb = (e) => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
    
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
    
        // ...
      });
  };

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        this.setState({user: true});
      } else {
      }
    });
  }

  render() {
    let {user} = this.state
    return (
      <>
        {user && (
          <Navigate to="/quiz" replace={true} />
        )}
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
              <div style={{ display: 'block', justifyContent: 'space-between', margin: 0, }}>
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

export default Login;
