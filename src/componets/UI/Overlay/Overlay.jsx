import React, { useEffect } from 'react'
import cl from './overlay.module.scss'
function Overlay({ children }) {
   
   return (
      <div className={cl.overlay}>{children}</div>
   )
}

export default Overlay