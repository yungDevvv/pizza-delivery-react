import React, { useEffect } from 'react'
import MainButton from '../UI/Buttons/MainButton/MainButton'
import CartEmpty from './CartEmpty'
import CartItem from './CartItem'

import './sidecart.scss'
import { CSSTransition } from 'react-transition-group';

function SideCart({ setPhoneRegOpen, setCheckoutModalOpen, isAuth, cartOpen, setTotalPrice, totalPrice, cartItems, setCartOpen }) {
   useEffect(() => {
      cartOpen === true
         ? document.body.style = 'overflow-y: hidden'
         : document.body.style = 'overflow-y: auto'
   }, [cartOpen])

   return (
      <div style={cartOpen ? { visibility: 'visible' } : { border: 'none' }} className={cartOpen ? 'cart__overlay' : 'cart__overlay cart-close-animation'}>
         <CSSTransition
            in={cartOpen}
            timeout={300}
            classNames="cart"
            unmountOnExit
            onEnter={() => setCartOpen(true)}
            onExited={() => setCartOpen(false)}
         >
            <div className='cart'>
               <div onClick={() => { setCartOpen(false) }} className='cart__close'>
                  <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="40px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" /></svg>
               </div>
               <h1>Shopping cart</h1>
               {cartItems.length !== 0
                  ? ''
                  : <CartEmpty setCartOpen={setCartOpen} />
               }
               <ul className='cart__list'>

                  {cartItems.length !== 0
                     ? cartItems.map(item => <CartItem totalPrice={totalPrice} setTotalPrice={setTotalPrice} item={item} key={`${item.id}_${Date.now()}_${Math.random() * (1000 - 1) + 1}`} />)
                     : ''
                  }
               </ul>
               {cartItems.length !== 0
                  ? <div className='cart__buy-body'>
                     <div>
                        <h3>Order price:</h3>
                        <p>{totalPrice} €</p>
                     </div>
                     <div className='buy-body__button'>
                        <MainButton onClick={() => isAuth ? (setCartOpen(false), setCheckoutModalOpen(true)) : setPhoneRegOpen(true)} style={{ width: '50%', padding: '12px 0' }}>To order</MainButton>
                     </div>
                  </div>
                  : null
               }

            </div>
         </CSSTransition>


      </div>
   )
}

export default SideCart