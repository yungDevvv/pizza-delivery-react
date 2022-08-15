import React, { useContext } from 'react'
import BuyButton from '../../UI/Buttons/BuyButton/BuyButton'
import './mobilefoodcard.scss'
import { AppContext } from '../../../context'
function MobileFoodCard({notify, item }) {
   const { addToCart, openCartModal } = useContext(AppContext)
   
   return (
      <article className='mobile-foodcard'>
         <picture className="mobile-foodcard__img">
            <img src={item.img} alt={item.title} />
         </picture>
         <div>
            <h3 className='mobile-foodcard__title'>{item.title}</h3>
            <p className='mobile-foodcard__description'>{item.composition}</p>

            <BuyButton onClick={() => ( item.pizza ? openCartModal(item) : (notify(item), addToCart(item)))} style={{ width: '105px' }}>{item.pizza ? 'from' : ''} {item.price}€</BuyButton>


         </div>

      </article>
   )
}

export default MobileFoodCard