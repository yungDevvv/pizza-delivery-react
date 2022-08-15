import React, { useState } from 'react'
import Cross from '../../UI/Cross/Cross'
import cl from './mobilecitymenu.module.scss'
import { useSearchedItems } from '../../../hooks/useCities';
function MobileCityMenu({setSelectedCity, citiesData, setMobileMenuCitiesOpen}) {
   const [searchValue, setSearchValue] = useState('');
   const selectCity = (e) => {
      setSelectedCity(e.target.getAttribute('value'))
      localStorage.setItem('react-pizza-city', e.target.getAttribute('value'))
      setMobileMenuCitiesOpen(prev => !prev)
   }
   const searchedItems = useSearchedItems(citiesData, searchValue)
   return (
      <div className={cl.menu}>
         <div className={cl.menuHeader}>
            <div>
               <img width={44} src="img/icons/header-logo.svg" alt="logo" />
               <h4>REACT PIZZA</h4>
            </div>
            <Cross onClick={() => setMobileMenuCitiesOpen(prev => !prev)} style={{ width: '25px' }} />
         </div>
         <div className={cl.search}>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Search...' /><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M2.5 10.5C2.5 6.08172 6.08172 2.5 10.5 2.5C14.9183 2.5 18.5 6.08172 18.5 10.5C18.5 14.9183 14.9183 18.5 10.5 18.5C6.08172 18.5 2.5 14.9183 2.5 10.5ZM10.5 3.5C6.63401 3.5 3.5 6.63401 3.5 10.5C3.5 14.366 6.63401 17.5 10.5 17.5C14.366 17.5 17.5 14.366 17.5 10.5C17.5 6.63401 14.366 3.5 10.5 3.5Z" fill="#8b8b8b" />
               <path fillRule="evenodd" clipRule="evenodd" d="M15.4472 15.4465C15.6425 15.2512 15.9591 15.2512 16.1543 15.4465L21.3543 20.6465C21.5496 20.8418 21.5496 21.1583 21.3543 21.3536C21.1591 21.5489 20.8425 21.5489 20.6472 21.3536L15.4472 16.1536C15.252 15.9583 15.252 15.6418 15.4472 15.4465Z" fill="#8b8b8b" />
            </svg>

         </div>
         <div className={cl.popularCities}>
            <p>Helsinki</p>
            <p>Lahti</p>
         </div>
         <ul className={cl.citiesColumn}>
               {searchedItems.map((item, i) => <li key={i} value={item} onClick={selectCity}>{item}</li>)}
         </ul>
      </div>
   )
}

export default MobileCityMenu