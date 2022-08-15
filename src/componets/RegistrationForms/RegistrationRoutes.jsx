import React, { Fragment, useState } from 'react'
import CheckoutModal from '../Modals/CheckoutModal/CheckoutModal'
import NameModal from './NameRegModal/NameRegModal'
import RegisterModal from './PhoneNumberModal/PhoneNumberModal'

function RegistrationRoutes({ checkoutModalOpen, setCheckoutModalOpen, setIsAuth, phoneRegOpen, setPhoneRegOpen }) {

  const [nameRegOpen, setNameRegOpen] = useState(false)
  const [phoneRegValited, setPhoneRegValited] = useState(false)

  return (
    <Fragment>
      {phoneRegOpen && <RegisterModal
        phoneRegValited={phoneRegValited}
        setPhoneRegOpen={setPhoneRegOpen}
        setPhoneRegValited={setPhoneRegValited}
        setNameRegOpen={setNameRegOpen}
      />}
      {checkoutModalOpen && <CheckoutModal setCheckoutModalOpen={setCheckoutModalOpen} />}
      {nameRegOpen &&
        <NameModal
          setIsAuth={setIsAuth}
          setCheckoutModalOpen={setCheckoutModalOpen}
          setPhoneRegValited={setPhoneRegValited}
          setNameRegOpen={setNameRegOpen}
        />
      }
    </Fragment>
  )
}

export default RegistrationRoutes