import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

import { checkAuth } from '../../Services/firebase';

import Logo from '../../Images/UNIQUIZ.svg';
import PP from '../../Images/PP.png';

class Navbar extends React.Component {
  state = {
    profileActive: false,

  };

  handleProfile = (e) => {
    if (this.state.profileActive === true) {
      this.setState({ profileActive: false });
    } else {
      this.setState({ profileActive: true });
    }
  };
  
  render() {
    return (
      <div className="navbar_container">
        <div className="navbar_logo_container">
          <Link to={'/'}>
            <img className="navbar_logo" src={Logo} alt="logo-uniquiz" />
          </Link>
        </div>
        <div className="navbar_menu_container">
          <div>
            <Link className="navbar_item" to={'/'}>
              Blog
            </Link>
          </div>
          <div>
            <Link className="navbar_item" to={'/'}>
              Nosotros
            </Link>
          </div>
          <div>
            <Link className="navbar_item" to={'/'}>
              Testimonios
            </Link>
          </div>
          <div>
            <Link className="navbar_item" to={'/Quiz'}>
              Quiz
            </Link>
          </div>
          <div>
            <Link className="navbar_item" to={'/'}>
              Contacto
            </Link>
          </div>
        </div>
        <button className="navbar_btn">
          <Link className="navbar_btn_item" to={'/'}>
            Cursos
          </Link>
        </button>
        <div className="navbar_image" onClick={this.handleProfile}>
          <img className="navbar_img" src={PP} alt="" />
        </div>
        {this.state.profileActive ? (
          <div className="navbar_menu_profile">
            <ul>
              <li>Cerrar sesión</li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Navbar;
