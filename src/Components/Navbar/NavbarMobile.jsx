import Logo from '../../Images/UNIQUIZ.svg';
import { Link } from 'react-router-dom';
import Menupic from '../../Images/menu_icon.png'

import './NavbarMobile.css';
import React from 'react'
import { useState } from 'react';

export default function NavbarMobile() {

const [menuActive, setmenuActive] = useState(false);


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
