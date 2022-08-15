import React from "react"
import cl from './mainbutton.module.scss'
function MainButton({children, ...props}) {
   return (
       <button {...props} className={cl.mainButton}>
          {children}
       </button>
   )
   
 }
 export default MainButton;