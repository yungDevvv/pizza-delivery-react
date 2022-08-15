import React from 'react'
import MainButton from '../UI/Buttons/MainButton/MainButton'
import cl from './cartempty.module.scss'
function CartEmpty({setCartOpen}) {

   return (
      <div className={cl.emptyCart + ' unselectable'}>
         <h3>Cart is empty 😕</h3>
         <p>You probably haven't ordered pizza yet.
            To order pizza, go to the main page.</p>
         <img className={cl.img} src="img/icons/cart-empty.svg" alt="empty-cart" />
         <MainButton onClick={() => {setCartOpen(prev => !prev)}} style={{padding: '14px 45px', marginTop: '60px'}}><img style={{padding: '3px 7px 0 0'}} src="img/icons/arrow-left.svg" alt="arrow-left" /> Get back to main page</MainButton>
      </div>
   )
}

export default CartEmpty