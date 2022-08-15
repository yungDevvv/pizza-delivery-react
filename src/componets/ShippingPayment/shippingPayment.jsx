import React from 'react'
import cl from './shippingpayment.module.scss'

function shippingPayment() {
   return (
      <div className={cl.shippingPayment}>
         <h1>Shipping and payment</h1>
         <div className={cl.body}>
            <div className='d-flex flex-column'>
               <h3>60 MINUTES OR PIZZA FOR FREE</h3>
               <p>If we don't have time to deliver the products within 60 minutes, you can get your virtual pizza for free</p>
            </div>
            <div>
               <h3>REACT PIZZA — NO. 1 PIZZERIA CHAIN ​​IN THE INTERNET</h3>
               <p>for pizza delivery as of March 2022 by Euromonitor International.</p>
               <p>All menu prices do not include discounts.</p>
            </div>
            <div>
               <h3>50 €</h3>
               <p>The minimum amount of delivery</p>
               <p>Product images may differ from the products in the order.</p>
            </div>
         </div>
      </div>
   )
}

export default shippingPayment