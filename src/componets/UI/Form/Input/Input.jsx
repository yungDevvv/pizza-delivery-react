import React, {forwardRef} from 'react'
import cl from './input.module.scss'
export const Input = forwardRef((props, ref) => {
   return <input className={cl.input} ref={ref} {...props}/>
})