import React from 'react'
import cl from './headerpopup.module.scss'

function HeaderPopup() {
   return (
      <div className={cl.speechBubble}>
         <div className={cl.body}>
         <div className={cl.side}>
            <h3 className={cl.title}>35 minutes</h3>
            <h5>Average delivery time</h5>
            <span className={cl.span}>If we don't make it in 60 minutes, you'll get a certificate for a big pizza</span>
         </div>
         <div className={cl.side}>
            <h3 className={cl.ratingTitle}>5.00
            <img src="img/icons/star.svg" alt="star" />
            <img src="img/icons/star.svg" alt="star" />
            <img src="img/icons/star.svg" alt="star" />
            <img src="img/icons/star.svg" alt="star" />
            <img src="img/icons/star.svg" alt="star" />
            </h3>
            <h5>11753 ratings</h5>
            <span className={cl.span}>You can evaluate the order after receiving
               order confirmation</span>
         </div>
         </div>
         <div className={cl.bottom}>
            Data for the last 7 days in your city
         </div>
      </div>
   )
}

export default HeaderPopup