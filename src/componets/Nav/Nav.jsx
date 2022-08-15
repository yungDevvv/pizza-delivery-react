import React, { useRef, useEffect, useState } from 'react'
import './nav.scss'

import { Link} from "react-scroll";
function Nav({setCartOpen, totalPrice, totalCount }) {
   const [navLinks, setNavLinks] = useState([
      'Pizza',
      'Snacks',
      'Desserts',
      'Drinks',
      'Coffee'
   ])
   const navRef = useRef();
   const navIcon = useRef();

   const callback = ([e]) => {
      e.target.classList.toggle('fixed', e.intersectionRatio < 1)
      navIcon.current?.classList.toggle('nav__logo-active', e.intersectionRatio < 1)
   }
   useEffect(() => {
      const observer = new IntersectionObserver(
         callback,
         { threshold: [1] }
      );
      observer.observe(navRef.current)
      navIcon.current.classList.add('nav__logo-disable')
   }, [])



   return (
      <nav ref={navRef} className='nav'>
         <div className='d-a'>
            <ul className='nav__list d-a'>
               <li ref={navIcon}><img width={40} src="img/icons/header-logo.svg" alt="logo" /></li>
               {navLinks.map((item, i) => <li key={i}>
                  <Link
                     activeClass="nav__link-active"
                     to={item.toLowerCase()}
                     spy={true}
                     smooth={true}
                     duration={500}
                     offset={-185}>{item}</Link>
               </li>)}
               <li>About Us</li>
            </ul>
            <button onClick={() => { setCartOpen(prev => !prev) }}>
               <span className='cart-price'>{totalPrice} €</span>
               <span className='line'></span>
               <span className='cart-count'><img src="img/icons/cart.svg" alt="cart" /> {totalCount}</span>
            </button>
         </div>
      </nav>
   )
}

export default Nav