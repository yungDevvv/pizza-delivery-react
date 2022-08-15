import React from 'react'
import cl from './buybutton.module.scss'

function BuyButton({children, ...props}) {
  return (
   <button {...props} className={cl.buyButton}>
   {children}
   </button>
  )
}

export default BuyButton