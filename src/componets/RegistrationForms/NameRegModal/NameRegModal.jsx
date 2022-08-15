import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../UI/Form/Input/Input'
import Overlay from '../../UI/Overlay/Overlay'
import cl from './namemodal.module.scss'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cross from '../../UI/Cross/Cross'
import { useNavigate } from 'react-router-dom';
import { AppContext, useData } from '../../../context'
import Loader from '../../UI/Loader/Loader'
import MainButton from '../../UI/Buttons/MainButton/MainButton'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

function NameModal({setIsAuth, setCheckoutModalOpen, setPhoneRegValited, setNameRegOpen }) {
  const [fakeLoading, setFakeLoading] = useState(false)
  const { data, setValues } = useData()
  const {cartItems} = useContext(AppContext)
  const history = useNavigate()

  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const watchFields = watch(['firstName', 'lastName']);
  let isEmpty = Object.keys(errors).length == 0;

  const onSubmit = (formData) => {
    setFakeLoading(true)
    const user = {
      ...data, 
      ...formData
    }
    localStorage.setItem('pizza_users_data', JSON.stringify(user))
    setValues({user})
    setTimeout(() => {
      setFakeLoading(false)
      if(cartItems.length !== 0) setCheckoutModalOpen(true)
      setNameRegOpen(false)
      setIsAuth(true)
    }, 2000);
  }
  
  return (
    <Overlay>
      {fakeLoading ? <Loader />
        : <form onSubmit={handleSubmit(onSubmit)} className={cl.nameRegModal}>
          <Cross onClick={() => {
            setNameRegOpen(false)
            setPhoneRegValited(false)
            document.body.style = 'overflow: auto'
          }} />
          <h1>Account registration</h1>
          <p>Just write some name</p>
          {errors.firstName && <label htmlFor='firstName'>{errors.firstName.message}</label>}
          <Input
            {...register('firstName')}
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First name..." />

          {errors.lastName && <label htmlFor='firstName'>{errors.lastName.message}</label>}
          <Input
            {...register('lastName')}
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last name..." />

          <MainButton disabled={isEmpty && watchFields.includes('') !== true ? false : true}>Register</MainButton>
          
        </form>
      }
    </Overlay>
  )
}

export default NameModal