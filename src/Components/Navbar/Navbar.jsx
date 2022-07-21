import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { logOut } from '../../Services/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Logo from '../../Images/UNIQUIZ.svg';
import PP from '../../Images/ppmock.png';

const Navbar = () =>{
  const [profileActive, setProfileActive] = useState(false);
  const [usuario, setUsuario] = useState(false);

  const handleLogOut = (e) => {
    logOut();
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUsuario(user);
        // ...
      } else {
        // User is signed out
        setUsuario(null);
      }
    });
  }, [])
  
  
    return (
      <div className="navbar_container">
        <div className='navbar_row'>
          <div className="navbar_logo_container">
            <Link to={'/'}>
              <img className="navbar_logo" src={Logo} alt="logo-uniquiz" />
            </Link>
          </div>
          <div className="navbar_menu_container">
            <div>
              <a className="navbar_item" href='https://blog.uniquiz.com.mx/' >
                Noticias
              </a>
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
              <Link className="navbar_item" to={'/'}>
                Contacto
              </Link>
            </div>

            
          </div>
              
              <button className="navbar_btn">
              <Link className="navbar_btn_item" to={'/Quiz'}>
                Quiz
              </Link>
              </button>
          

          
          <div className="navbar_image" onClick={()=>setProfileActive(!profileActive)}>
            <img className="navbar_img" src={PP} alt="" />
          </div>
          {profileActive ? (
            <div className="navbar_menu_profile">
              <ul>
                {usuario ? <li onClick={handleLogOut}>Cerrar sesión</li>
            

                : <li><Link to="/login">Iniciar sesión</Link></li>}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
}

export default Navbar;
