import React, { useContext } from 'react'
import './foodcard.scss'
import BuyButton from '../UI/Buttons/BuyButton/BuyButton'
import { AppContext } from '../../context'
function FoodCard({ item }) {
 
   const { addToCart, openCartModal } = useContext(AppContext)
   
   return (
      <article
         onClick={() => { item.pizza ? openCartModal(item) : addToCart(item) }}
         style={item.category === 'drink' ? { height: '370px' } : null}
         className='food-card'
         id='foodcard'
      >
         <div>
            <picture>
               <img width={260} height={260} src={item.img} alt={item.title} />
            </picture>
            <h3 className={item.title.length >= 26 ? 'food-card__longtitle' : null}>{item.title}</h3>
            <p style={{}}>{item.composition}</p>
         </div>
         <div className='food-card__price d-a-j'>
            <p>{item.pizza ? 'from' : ''} {item.price}€</p>
            <BuyButton>+ ADD</BuyButton>
         </div>

      </article>
      

   )
}

export default FoodCard