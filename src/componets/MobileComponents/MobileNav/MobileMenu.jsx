import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Cross from '../../UI/Cross/Cross';
import './mobilemenu.scss'

function MobileMenu({ isAuth, setPhoneRegOpen, selectedCity, setMobileMenuCitiesOpen, setMobileMenuOpen }) {

   useEffect(() => {
      document.body.style = 'overflow: hidden';
      return () => {
         document.body.style = 'overflow: auto';
      }
   }, [])

   return (
      <div className='mobile-nav'>
         <div className="mobile-nav__inner">
            <div className="mobile-nav__logo">
               <img src="img/icons/header-logo.svg" alt="logo" />
               <h4>REACT PIZZA</h4>
               <Cross onClick={() => { setMobileMenuOpen(prev => !prev) }} />
            </div>
            <div onClick={() => setMobileMenuCitiesOpen(prev => !prev)} className='mobile-nav__city'>
               <img src="img/icons/map-pin.svg" alt="map-pin" />
               <p>{selectedCity}</p>
               <span>Change</span>
            </div>
            <div className="mobile-nav__rating">
               <span>35 min</span>
               <p>5.0
                  <img src="img/icons/star.svg" alt="star" />
                  <img src="img/icons/star.svg" alt="star" />
                  <img src="img/icons/star.svg" alt="star" />
                  <img src="img/icons/star.svg" alt="star" />
                  <img src="img/icons/star.svg" alt="star" />
               </p>
               <img style={{ color: 'white' }} src="img/icons/info.svg" alt="info" />
            </div>
            <ul className="mobile-nav__menu">
               {isAuth
                  ? <li onClick={() => setMobileMenuOpen(prev => !prev)}><Link to="/profile">Profile</Link></li>
                  : <li onClick={() => {
                     setPhoneRegOpen(prev => !prev)
                     setMobileMenuOpen(prev => !prev)
                  }}>Log in</li>
               }
               <li>Contacts</li>
               <li>Work in Pizzeria</li>
               <li>Premium</li>
               <li>About us</li>
            </ul>
            <div className="mobile-nav__call">
               <p><img src="img/icons/phone-call.svg" alt="phone" /><a href="tel:+3581234567">+358 123 45 67</a></p>
               <span>Call is free</span>
            </div>
         </div>
      </div>
   )
}

export default MobileMenu