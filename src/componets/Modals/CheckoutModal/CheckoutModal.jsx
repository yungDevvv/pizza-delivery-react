import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import MainButton from '../../UI/Buttons/MainButton/MainButton'
import Cross from '../../UI/Cross/Cross'

import Overlay from '../../UI/Overlay/Overlay'
import './checkoutmodal.scss'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { AppContext, useData } from '../../../context';
import Loader from '../../UI/Loader/Loader'



function CheckoutModal({ setCheckoutModalOpen }) {
   
   const schema = yup.object().shape({
      address: yup
         .string()
         .required("required field"),
      city: yup
         .string()
         .matches(/^([^0-9]*)$/, "should not contain numbers")
         .required("required field"),
      region: yup
         .string()
         .matches(/^([^0-9]*)$/, "should not contain numbers")
         .required("required field"),
      postalcode: yup
         .string()
         .required("required field"),
   });


   const [tabActive, setTabActive] = useState(1)
   const [fakeLoading, setFakeLoading] = useState(false)
   const { data, setValues } = useData()
   const deliveryForm = useRef()
   const {success, cartItems, setCartItems} = useContext(AppContext)
   const { register, watch, handleSubmit, formState: { errors } } = useForm({
      mode: "all",
      resolver: yupResolver(schema),
   });
   const watchFields = watch(['address', 'city', 'region', 'postalcode']);

   const onSubmit = (formData) => {
      setValues(formData)
      setFakeLoading(true)
      setTimeout(() => {
         cartItems.forEach(item => {
            sessionStorage.removeItem(item.id)
            setCartItems([])
         })
         setCheckoutModalOpen(false)
         setFakeLoading(false)
         success() // Popup
      }, 2000);

   }

   let isEmpty = Object.keys(errors).length == 0;

   const OpenTab = (e) => {
      setTabActive(+e.target.dataset.index)
   }
  
   useEffect(() => {
      setTimeout(() => document.body.style = 'overflow-y: hidden', 0);
      return () => {
         document.body.style = 'overflow: auto'
      }
   }, [])

   return (
      <Fragment>
         {fakeLoading ? <Loader /> :
            <Overlay>
               <div className='checkout-modal'>
                  <Cross onClick={() => setCheckoutModalOpen(false)} />
                  <h1>Where to deliver?</h1>
                  <div className='checkout-modal__tabs'>
                     <span className={tabActive === 1 ? 'tab-active' : ''} data-index="1" onClick={OpenTab}>Delivery</span>
                     <span className={tabActive === 2 ? 'tab-active' : ''} data-index="2" onClick={OpenTab}>Self-call</span>
                  </div>

                  {tabActive === 1 &&
                     <form ref={deliveryForm} onSubmit={handleSubmit(onSubmit)}>
                        <input autoFocus {...register('address')} name="address" type="text" placeholder='Street Address' />
                        <input {...register('city')} name="city" type="text" placeholder='City' />
                        <input {...register('region')} name="region" type="text" placeholder='Region' />
                        <input {...register('postalcode')} name="postalcode" type="number" placeholder='Postal Code' maxLength={5} />
                        <textarea placeholder='Comment to the delivery' cols="30" rows="10"></textarea>
                        <MainButton disabled={isEmpty && watchFields.includes('') !== true ? false : true}>Confirm address</MainButton>
                     </form>
                  }
                  {tabActive === 2 &&
                     <p className='checkout-modal__p'>We don't have this option yet!</p>
                  }

               </div>
            </Overlay>}
      </Fragment>


   )
}

export default CheckoutModal