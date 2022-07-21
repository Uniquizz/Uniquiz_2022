import Logo from '../../Images/UNIQUIZ.svg';
import { Link } from 'react-router-dom';
import Menupic from '../../Images/menu_icon.png'

import './NavbarMobile.css';
import React from 'react'

export default function NavbarMobile() {
  return (
    <div  className='NavbarMobileContainer'>

<div className="navbar_logo_container">
            <Link to={'/'}>
              <img className="navbar_logo" src={Logo} alt="logo-uniquiz" />
            </Link>
          </div>


          <div className="containermobile2">
            <div className='menuiconcontainer'>
            <img  className="menupic" src={Menupic} alt="" />


            </div>
         
          </div>

    </div>
  )
}
