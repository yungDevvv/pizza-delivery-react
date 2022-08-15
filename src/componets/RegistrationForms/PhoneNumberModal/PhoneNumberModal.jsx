import React, { useContext, useEffect, useRef, useState } from 'react'
import Cross from '../../UI/Cross/Cross'
import cl from './phonenumbermodal.module.scss'
import { useForm } from 'react-hook-form'
import { AppContext, useData } from '../../../context'

function RegisterModal({setNameRegOpen, phoneRegValited, setPhoneRegOpen, setPhoneRegValited }) {
   
   const [value, setValue] = useState('+');
   const [isValidate, setIsValidate] = useState(false)
   const [phoneNumber, setPhoneNumber] = useState('')
   const {data, setValues} = useData()
   

   const { register, handleSubmit, formState: { errors } } = useForm();

   const validatePhoneNumber = (value) => {
      const reg = /^((04[0-9]{1})(\s?|-?)|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|\-)?[0-9]{1,4})$/
      if (reg.test(value)) {
         setIsValidate(true)
         setPhoneNumber(value)
      } else {
         setIsValidate(false)
      }
      setValue(value)
   }

   const nextJump = (e) => {
      if (e.target.value.length > 1) {
         e.target.value = e.target.value.slice(0, 1)
      }
      if (e.target.nextElementSibling !== null && e.nativeEvent.inputType !== 'deleteContentBackward') {
         e.target.nextElementSibling.focus()
      }
      if (e.nativeEvent.inputType === 'deleteContentBackward' && e.target.previousElementSibling !== null) {
         e.target.previousElementSibling.focus()
      }
   }
   const onSubmit = (data) => {
      let code = []
      for (let key in data) {
         if (data[key] !== '') {
            code.push(data[key])
         }
      }
      if (+code.join('') === 1234) {
         setNameRegOpen(true)
         setPhoneRegValited(true)
         setPhoneRegOpen(false)
         
         setValues({phoneNumber})
      } else if (code.length < 4) {
         alert('Fill in all text fields!')
      } else {
         alert('Wrong code!')
      }
   }
   
   useEffect(() => {
      document.body.style = 'overflow: hidden';
   }, [])
   return (
      <div className={cl.overlay}>
         <div className={cl.registerModal}>
            <Cross onClick={() => {
               setPhoneRegOpen(prev => !prev)
               document.body.style = 'overflow: auto'
               }}/>
            <h1>Enter the site</h1>
            {
               phoneRegValited
                  ? <p>The code was sent by message to {phoneNumber && <span style={{display: 'inline-block', margin: '5px 0', color: '#fc7d07' }}>{phoneNumber}</span>}, <br></br> but actually, code is 1234</p>
                  : <p>Just write any finnish phone number and move on</p>
            }
            {phoneRegValited
               ? <form onSubmit={handleSubmit(onSubmit)} className={cl.phonenumberForm}>
                  <div className={cl.codeInputs}>
                     <input {...register('ip_1',)} onInput={nextJump} className={cl.codeInput} autoFocus maxLength="1" type="number" />
                     <input {...register('ip_2',)} onInput={nextJump} className={cl.codeInput} maxLength="1" type="number" />
                     <input {...register('ip_3',)} onInput={nextJump} className={cl.codeInput} maxLength="1" type="number" />
                     <input {...register('ip_4',)} onInput={nextJump} className={cl.codeInput} maxLength="1" type="number" />
                  </div>
                  <button>Сonfirm</button>
               </form>
               : <form className={cl.phonenumberForm}>
                  <label htmlFor="phone-number">Phone number</label>
                  <input value={value} onChange={(e) => validatePhoneNumber(e.target.value)} name="phone-number" id="phone-number" type="tel" placeholder='+358400204040' />
                  <button onClick={(e) => {
                     e.preventDefault()
                     setPhoneRegValited(prev => !prev)
                  }} disabled={isValidate ? false : true} type="submit">Send code</button>
               </form>

            }
            <span>Continuing, you do not hereby agree <strong>with the collection and processing of personal data and the user agreement</strong> </span>
         </div>
      </div>
   )
}

export default RegisterModal

