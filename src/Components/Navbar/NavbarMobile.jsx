import Logo from '../../Images/UNIQUIZ.svg';
import { Link } from 'react-router-dom';
import Menupic from '../../Images/menu_icon.png'
import { logOut } from '../../Services/firebase';
import './NavbarMobile.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import PP from '../../Images/ppmock.png';

export default function NavbarMobile() {

const [menuActive, setmenuActive] = useState(false);
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
    <div>
      <div  className='NavbarMobileContainer'>
            <Link to={'/'}>
              <img className="navbar_logo" src={Logo} alt="logo-uniquiz" />
            </Link>


            <div className="containermobile2">
              <div className='menuconcontainer' onClick={()=>setmenuActive(!menuActive)}>
                <img  className="menupic" src={Menupic} alt="" />
              </div>
            </div>
            <div className="navbar_image_mob" onClick={()=>setProfileActive(!profileActive)}>
              <img className="navbar_img" src={usuario ? usuario.photoURL : PP} alt="" />
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
      <ol className={`menu-container ${menuActive && "active"}`}>
        <li>
          <a className="navbar_item" href='https://blog.uniquiz.com.mx/' >
            Noticias
          </a>
        </li>
        <li><Link to="/">Nosotros</Link></li>
        <li><Link to="/">Testimonios</Link></li>
        <li><Link to="/">Contacto</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ol>
    </div>
  )
}
