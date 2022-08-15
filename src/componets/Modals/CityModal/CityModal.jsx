import React, { useEffect, useMemo, useState } from 'react'
import { useSearchedItems } from '../../../hooks/useCities'
import Overlay from '../../UI/Overlay/Overlay'
import cl from './citymodal.module.scss'


function CityModal({setCityModalOpen, setSelectedCity, citiesData}) {
   const [inputValue, setInputValue] = useState('')
   const cities = citiesData.sort((a, b) => a.localeCompare(b))

   const searchedItems = useSearchedItems(cities, inputValue)
   useEffect(() => {
      document.body.style = 'overflow-y:hidden'
      return () => {
         document.body.style = 'overflow-y:auto'
      }
   }, [])
   
   const selectCity = (e) => {
      setSelectedCity(e.target.getAttribute('value'))
      localStorage.setItem('react-pizza-city', e.target.getAttribute('value'))
      setCityModalOpen(false)
   }
   return ( 
      <Overlay>
         <div className={cl.modalCity}>
            <div onClick={() => setCityModalOpen(false)} className={cl.modalCross}>
               <img src="img/icons/close.svg" alt="close" />
            </div>
            <div className={cl.title}>
               <img src="img/icons/header-logo.svg" alt="logo" />
               <h2>379 pizzerias in {cities && cities.length} cities</h2>
            </div>
            <div className={cl.search}>
               <input onChange={(e) => {setInputValue(e.target.value)}} value={inputValue} type="text" placeholder='Search...'/><img src="img/icons/search.svg" alt="search" />
            <div>
                  <span value="Helsinki" onClick={selectCity}>Helsinki</span>
                  <span value="Lahti" onClick={selectCity}>Lahti</span>
               </div>
            </div>
            <div className={cl.cities}>
               <div>
                  {searchedItems && searchedItems.map((item, i) => <span value={item} onClick={selectCity} key={item + '_' + i}>{item}</span>)}
               </div>
            </div>
         </div>
      </Overlay>
         
      
   )
}

export default CityModal