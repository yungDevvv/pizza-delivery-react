import React, { useContext, useState } from 'react'
import {AppContext} from '../../context'
import './cartitem.scss'

function CartItem({totalPrice, setTotalPrice, item }) {
   
   const {setPriceListener, removeFromCart, cartItems } = useContext(AppContext)
   
   const plusButton = () => {
      cartItems.map(el => {
         if(el.id === item.id) {
            item.count += 1;
            sessionStorage.removeItem(item.id)
            sessionStorage.setItem(el.id, JSON.stringify({ ...el, count: item.count}))
         }
      })
      setPriceListener(prev => !prev)
      setTotalPrice(Number(totalPrice) + Number(item.price))
   }
   const minusButton = () => {
      if (item.count === 1 ||  item.count < 0) {
         removeFromCart(item.id)
         sessionStorage.removeItem(item.id)
      } else {
         cartItems.map(el => {
            if(el.id === item.id) {
               item.count -= 1;
               sessionStorage.removeItem(item.id)
               sessionStorage.setItem(el.id, JSON.stringify({ ...el, count: item.count}))
            }
         })
      }
      
      setPriceListener(prev => !prev)
      setTotalPrice(Number(totalPrice) - Number(item.price))
      
   }
   
   return (
      <li className='cart-item'>
         <div className='cart-item__info'>
            <img width={90} height={90} src={item.img} alt={item.img} />
            <div>
               <h3>{item.title}</h3>
               <p>{item.cm && item.cm + ' cm,' || !item.cm && item.weight + ' g'} {item.dough && item.dough}</p>
               <p>{item.additives && item.additives.length !== 0 ? '+ ' + item.additives.map(item => ' '+ item) : ''}</p>
            </div>
         </div>
         <div className='cart-item__price'>
            <div className='cart-item__price_buttons'>
               <button onClick={() => { plusButton() }}>+</button>
               <span>{item.count}</span>
               <button onClick={() => { minusButton() }}>-</button>
            </div>
            <p>{item.price}€</p>
         </div>
      </li>
   )
}

export default CartItem