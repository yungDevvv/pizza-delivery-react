import React, { useEffect } from 'react'
import Overlay from './../UI/Overlay/Overlay'
import Cross from './../UI/Cross/Cross'
import MainButton from './../UI/Buttons/MainButton/MainButton'
import './profilemessage.scss'
import { useData } from '../../context'


function ProfileMessage({confirmSave, setProfileModal}) {

   useEffect(() => {
      document.body.style ='overflow: hidden'
    return () => {
      document.body.style = 'overflow: auto'
    }
   }, [])
  return (
    <Overlay>
       <div className="profile-modal">
          <Cross onClick={() => setProfileModal(false)} />
          <h1>Are you sure you want to save?</h1>
          <p>After saving, you will not be able to change the date of birth</p>
          <MainButton onClick={confirmSave}>Save</MainButton>
       </div>
    </Overlay>
  )
}

export default ProfileMessage