import React from 'react'
import cl from './mobilecarticon.module.scss'
function MobileCartIcon({totalCount, setCartOpen }) {
   return (
         <div onClick={() => setCartOpen(prev => !prev)} className={cl.mobileCart}>
            <span>{totalCount}</span>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M21.5 7v4h2.514c2.301 0 3.452 0 4.053.748.6.75.35 1.873-.149 4.12l-1.526 6.867c-.667 3.004-1.001 4.505-2.098 5.385-1.097.88-2.635.88-5.711.88h-5.166c-3.076 0-4.614 0-5.711-.88-1.097-.88-1.43-2.381-2.098-5.385l-1.526-6.867c-.5-2.247-.75-3.37-.149-4.12C4.533 11 5.685 11 7.986 11H10.5V7a5.5 5.5 0 1111 0zm-8 4h5V7a2.5 2.5 0 00-5 0v4z" fill="#FF6900"></path><path d="M13.5 8.239L17.041 11H13.5V8.239zM10.596 5.974A5.526 5.526 0 0010.5 7v4H8.171L7.23 5.556c-.156-.901.879-1.521 1.6-.96l1.766 1.378zM8.69 14h12.198l3.729 2.908c.43.335.514.954.152 1.361-2.878 3.235-8.759 6.82-12.965 7.902-.534.137-1.049-.23-1.143-.773L8.69 14z" fill="#000"></path></svg>
         </div>
     
   )
}

export default MobileCartIcon
