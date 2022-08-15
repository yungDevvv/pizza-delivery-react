import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useData } from '../../context'
import './profile.scss'
import ProfileMessage from './ProfileMessage';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function Profile({ isAuth, setIsAuth }) {

  const navigate = useNavigate()
  const { data, setValues } = useData();
  
  const [screenWidth, setScreenWidth] = useState(window.screen.width)

  const [profileModal, setProfileModal] = useState(false)

  const firstName = useRef()
  const lastName = useRef()



  /* INPUT STATE */
  const [firstNameValue, setFirstNameValue] = useState(data?.user.firstName)
  const [lastNameValue, setLastNameValue] = useState(data?.user.lastName)
  const [emailValue, setEmailValue] = useState(data ? data?.user.email : '')

  /* SELECT STATE */
  const [daySelectedValue, setDaySelectedValue] = useState('')
  const [monthSelectedValue, setMonthSelectedValue] = useState('')
  const [dayCount, setDayCount] = useState(31)

  const saveEmail = (e) => {
    let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let emailInput = e.target.parentNode.querySelector('input')

    if (e.target.dataset.disabled !== 'true') {
      console.log('da')
      if (e.target.dataset.action === 'firstSave') {
        if (pattern.test(emailValue)) {
          emailInput.disabled = true;
          e.target.dataset.action = 'change'
          e.target.textContent = 'Change'
          e.target.classList.add('input__change-button')

          setValues({ ...data }, data.user.email = emailValue)
        } else {
          alert("Email isn't valid")
        }
      } else if (e.target.dataset.action === 'change') {
        emailInput.disabled = false;
        e.target.classList.remove('input__change-button')
        e.target.classList.add('input__save-button')
        e.target.dataset.action = 'save'
        e.target.textContent = 'Save'
        e.target.nextElementSibling.style = 'visibility: visible'
      } else if (e.target.dataset.action === 'save') {
        if (pattern.test(emailValue)) {
          emailInput.disabled = true;
          e.target.dataset.action = 'change'
          e.target.textContent = 'Change'
          e.target.classList.remove('input__save-button')
          e.target.classList.add('input__change-button')
          e.target.nextElementSibling.style = 'visibility: hidden'
          setValues({ ...data }, data.user.email = emailValue)
        } else {
          alert("Email isn't valid")
        }
      }

    }

  }
  const selectChange = (e) => {
    if (e.target.dataset.name === 'select-day') {
      setDaySelectedValue(e.target.value)
    } else {
      setMonthSelectedValue(e.target.value)
      if (e.target.value === 'February') setDayCount(29)
      if (e.target.value === 'April' || e.target.value === 'June' || e.target.value === 'September' || e.target.value === 'November') setDayCount(30)
    }

  }
  const selectSave = () => {
    if (daySelectedValue && monthSelectedValue) {
      setProfileModal(true)
    } else {
      alert('Select all fields')
    }
  }
  const confirmSave = () => {
    setProfileModal(false)
    setValues({ ...data }, data.user.dayOfBirth = daySelectedValue, data.user.monthOfBirth = monthSelectedValue)
  }
  const cancelChange = (e) => {
    const actionButton = e.target.parentNode.querySelector('span')
    const currentInput = e.target.parentNode.querySelector('input')

    actionButton.textContent = 'Change'
    actionButton.dataset.action = 'change'
    actionButton.classList.add('input__change-button')
    actionButton.classList.remove('input__save-button')
    e.target.style = 'visibility: hidden'
    currentInput.disabled = true;

    if (currentInput.getAttribute('name') === 'firstName') {
      setFirstNameValue(data.user.firstName)
    } else if (currentInput.getAttribute('name') === 'lastName') {
      setLastNameValue(data.user.lastName)
    } else if (currentInput.getAttribute('name') === 'email') {
      setEmailValue(data.user.email)
    }

  }
  const changeName = (e) => {

    const target = e.target;

    const regOnlyLetters = /^[A-Za-z]+$/;
    const currentInput = target.parentNode.querySelector('input');
    const actionsButtons = target.parentNode.parentNode.querySelectorAll('.input__save-button')

    if (target.dataset.action === 'change') {
      /* 
        saveButtons означает то что есть активная кнопка save, и одно из полей уже редактируется,
        а тоесть, где то уже начажата кнопка change,
        и что бы пользователь мог вводить одновременно только одно поле, 
        нужна эта проверка
      */
      if (actionsButtons.length === 0) {
        currentInput.disabled = false;
        target.textContent = 'Save';
        target.dataset.action = 'save';
        target.classList.remove('input__change-button')
        target.classList.add('input__save-button')
        target.nextElementSibling.style = 'visibility: visible'
      } else {
        alert('Save first!')
      }

    } else if (target.dataset.action === 'save' && regOnlyLetters.test(firstNameValue) && regOnlyLetters.test(lastNameValue)) {

      currentInput.disabled = true;
      target.textContent = 'Change';
      target.dataset.action = 'change';
      target.classList.add('input__change-button')
      target.classList.remove('input__save-button')
      target.nextElementSibling.style = 'visibility: hidden'

      if (currentInput.getAttribute('name') === 'firstName') {
        console.log('firstName target')
        setValues({ ...data }, data.user.firstName = firstNameValue)

      } else if (currentInput.getAttribute('name') === 'lastName') {
        console.log('lastName target')
        setValues({ ...data }, data.user.lastName = lastNameValue)
      }
    } else {
      alert('Must contain only latin letters')
    }
  }
  const logout = () => {
    navigate('/')
    window.location.reload();
    localStorage.removeItem('react_user');
    setIsAuth(false);
    delete data.user;
  }
  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [data])
  return (

    <div className='profile'>
               <CSSTransition
                in={profileModal}
                timeout={200}
                classNames="alert"
                unmountOnExit
                onEnter={() => setProfileModal}
                onExited={() => setProfileModal}
              >
                <ProfileMessage confirmSave={confirmSave} setProfileModal={setProfileModal} />
              </CSSTransition>
      <div className='profile__body'>
        <h1>Account Settings</h1>
        <div className='input-container'>
          <label htmlFor="firstName">First Name</label>
          <input
            ref={firstName}
            onChange={(e) => setFirstNameValue(e.target.value)}
            value={firstNameValue}
            disabled
            name="firstName"
            type="text"
            maxLength={27}
          />
          <span className='input__change-button' data-action="change" onClick={changeName}>Change</span>
          <span className='input__cancel-button' onClick={cancelChange}>Cancel</span>
        </div>
        <div className='input-container'>
          <label htmlFor="lastName">Last Name</label>
          <input
            ref={lastName}
            value={lastNameValue}
            disabled
            onChange={(e) => setLastNameValue(e.target.value)}
            name="lastName"
            type="text"
            maxLength={27}
          />
          <span className='input__change-button' data-action="change" onClick={changeName}>Change</span>
          <span className='input__cancel-button' onClick={cancelChange}>Cancel</span>
        </div>
        <label htmlFor="phonenumber">Phone number</label>
        <input disabled name="phonenumber" value={data?.user.phoneNumber ? data.user.phoneNumber : ''} type="text" />
        <label htmlFor="bd">Birth day
          <Popup
            trigger={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5Z" fill="#000" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 11.5C12.2761 11.5 12.5 11.7239 12.5 12V16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16V12C11.5 11.7239 11.7239 11.5 12 11.5Z" fill="#000" />
                <path d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" fill="#000" />
              </svg>
            }
            position={screenWidth < 500 ? 'right top' : 'top center'}
            on={['click', 'touch', 'hover']}
            arrow
          >
            <div className='profile__popup-container'>We give discounts and gifts on your birthday. Unfortunately, the birthday cannot be changed.</div>
          </Popup>
        </label>
        <div className="profile__select-block">
          {data?.user.dayOfBirth && data?.user.monthOfBirth
            ? <input value={data.user.dayOfBirth + ' ' + data.user.monthOfBirth} type="text" disabled />
            : <Fragment>
              <select data-name="select-day" className="birtday-select__days" defaultValue={'Day'} onChange={selectChange}>
                <option disabled value="Day">Day</option>
                {Array.from(Array(dayCount).keys()).map((item, i) => <option value={i = i + 1} key={i++}>{i++}</option>)}
              </select>
              <select data-name="select-month" className="birtday-select__months" defaultValue={'Month'} onChange={selectChange}>
                <option disabled>Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <span onClick={selectSave}>Save</span>
            </Fragment>
          }
        </div>
        <div className="profile__email-block">
          <label htmlFor="email">Email 
          <Popup
            trigger={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5Z" fill="#000" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12 11.5C12.2761 11.5 12.5 11.7239 12.5 12V16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16V12C11.5 11.7239 11.7239 11.5 12 11.5Z" fill="#000" />
            <path d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" fill="#000" />
          </svg>
            }
            position={screenWidth < 500 ? 'right top' : 'top center'}
            on={['click', 'touch', 'hover']}
            arrow
          >
            <div className='profile__popup-container'>We will inform you by mail about bonuses, promotions and new products.</div>
          </Popup>
          </label>
          <input disabled={data?.user.email ? true : false} value={emailValue} className='profile__email-input' onChange={(e) => setEmailValue(e.target.value)} name="email" type="text" />
          <span className={data?.user.email ? 'input__change-button' : ''} data-disabled={emailValue ? false : true} data-action={data?.user.email ? 'change' : 'firstSave'} onClick={saveEmail}>{data?.user.email ? 'Change' : 'Save'}</span>
          <span className='input__cancel-button' onClick={cancelChange}>Cancel</span>
        </div>
        <button onClick={logout} className='profile__logout-button'>Log out</button>
      </div>

    </div>
  )
}

export default Profile