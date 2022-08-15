import React from 'react'
import HeaderPopup from '../Popup/HeaderPopup'
import './header.scss'
import Popup from 'reactjs-popup';
import CityModal from '../Modals/CityModal/CityModal';
import { useData } from '../../context';
import { Link } from 'react-router-dom';


function Header({setCityModalOpen, isAuth, setPhoneRegOpen, setMobileMenuOpen, selectedCity }) {
  const { data, setValues } = useData()
 
  return (
    <header className='header d-a'>
      <Link className='header__logo d-a' to="/">
        <img src="img/icons/header-logo.svg" alt="logo" />
        <div>
          <h1>REACT PIZZA</h1>
          <p>Chain of pizzerias  №1 in Finland</p>
        </div>
      </Link>
      <div className="header__delivery d-flex flex-column">
      <p onClick={() => setCityModalOpen(true)}>Pizza delivery&nbsp;<strong>{selectedCity}</strong></p>
        <div className="delivery__rate">
          <Popup
            trigger={open => (<div className='rate__popup'>35 min -</div>)}
            on='hover'
            closeOnEscape
            repositionOnResize
          >
            <HeaderPopup />
          </Popup>
          <span> 4.77 <img width={17} src="img/icons/star.svg" alt="star" /></span>
        </div>
      </div>
      {isAuth && data.user ?
        <Link to='/profile' className="header__user-icon">
          <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" fill="#1D1D1B">
            <path d="M25,13c0-6.6166992-5.3828125-12-12-12S1,6.3833008,1,13c0,3.383606,1.413208,6.4386597,3.673645,8.6222534  c0.0529175,0.0689087,0.1156006,0.1247559,0.1889648,0.171814C7.0038452,23.7769165,9.8582764,25,13,25  s5.9961548-1.2230835,8.1373901-3.2059326c0.0733643-0.0470581,0.1360474-0.1029053,0.1889648-0.171814  C23.586792,19.4386597,25,16.383606,25,13z M13,2.5c5.7900391,0,10.5,4.7104492,10.5,10.5  c0,2.4549561-0.8532715,4.7108154-2.2702637,6.5008545c-0.6505127-2.0978394-2.5076294-3.7401123-5.0281372-4.4957886  c1.3735962-0.9940796,2.2720337-2.6046143,2.2720337-4.4244995c0-3.0141602-2.4550781-5.4663086-5.4736328-5.4663086  s-5.4736328,2.4521484-5.4736328,5.4663086c0,1.8198853,0.8984375,3.4304199,2.2720337,4.4244995  c-2.5205078,0.7556763-4.3776245,2.3979492-5.0281372,4.4957886C3.3532715,17.7108154,2.5,15.4549561,2.5,13  C2.5,7.2104492,7.2099609,2.5,13,2.5z M9.0263672,10.5805664c0-2.1870117,1.7822266-3.9663086,3.9736328-3.9663086  s3.9736328,1.7792969,3.9736328,3.9663086S15.1914063,14.546875,13,14.546875S9.0263672,12.7675781,9.0263672,10.5805664z   M6.0307617,20.8319702C6.2562256,18.0820313,9.1723633,16.046875,13,16.046875s6.7437744,2.0351563,6.9692383,4.7850952  C18.1130981,22.4855347,15.6757202,23.5,13,23.5S7.8869019,22.4855347,6.0307617,20.8319702z" />
          </svg>
          <span>{data.user && data.user.firstName}</span>
        </Link>
        : <button onClick={() => setPhoneRegOpen(prev => !prev)} className='sing-in-button'>Sing in</button>
      }

      <div onClick={() => setMobileMenuOpen(prev => !prev)} className='header__menu'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}

export default Header