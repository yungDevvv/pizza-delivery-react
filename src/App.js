import { Fragment, useEffect, useRef, useState } from 'react';
import { useFetching } from './hooks/useFetching';
import Header from './componets/Header/Header';
import Footer from './componets/Footer/Footer'
import ShippingPayment from './componets/ShippingPayment/shippingPayment'
import Nav from './componets/Nav/Nav';
import axios from 'axios';
import Slider from './componets/Slider/Slider';
import CardModal from './componets/Modals/CardModal/CardModal';
import './styles/_myclasses.scss'
import './styles/grid.scss'
import { AppContext, useData } from './context';
import SectionFood from './componets/SectionFood';
import SideCart from './componets/SideCart/SideCart';
import { CSSTransition } from 'react-transition-group';
import MobileMenu from './componets/MobileComponents/MobileNav/MobileMenu';
import Media from 'react-media';
import MobileCityMenu from './componets/MobileComponents/MobileCityMenu/MobileCityMenu';

import MobileCartIcon from './componets/MobileComponents/MobileCartIcon/MobileCartIcon';
import RegistrationRoutes from './componets/RegistrationForms/RegistrationRoutes';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './componets/Profile/Profile';
import CityModal from './componets/Modals/CityModal/CityModal';


function App() {
  const [foodData, setFoodData] = useState({});
  const [additivesData, setAdditivesData] = useState([]);
  const [citiesData, setCitiesData] = useState([])
  const [clientInfo, setClientInfo] = useState({})
  const [currentItem, setCurrentItem] = useState([])
  const [cartItems, setCartItems] = useState([])
  const { data, setValues } = useData();

  const [cartOpen, setCartOpen] = useState(false)
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [cityModalOpen, setCityModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuCitiesOpen, setMobileMenuCitiesOpen] = useState(false)
  const [phoneRegOpen, setPhoneRegOpen] = useState(false)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)


  /* authentification */
  const [isAuth, setIsAuth] = useState(false);

  const [priceListener, setPriceListener] = useState(false)

  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('react-pizza-city') ? localStorage.getItem('react-pizza-city') : 'Helsinki')

  /* Displayed on the shopping cart button */
  const [totalCount, setTotalCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [fetching, isLoading, error] = useFetching(async () => {
    const responseFood = await axios.get('./db.json')
    setFoodData(responseFood.data[0])
    const responseAdditives = await axios.get('./additives.json')
    setAdditivesData(responseAdditives.data)
    const responseCity = await axios.get('./city.json')
    setCitiesData(responseCity.data)
  })

  useEffect(() => {
    fetching();
    /* Loading cart items from sessionStorage */
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key !== 'nav') {
        cartItems.push(JSON.parse(sessionStorage.getItem(key)))
      }
    }
    /* User */
    if (JSON.parse(localStorage.getItem('react_user'))) {
      setIsAuth(true)
      setValues(JSON.parse(localStorage.getItem('react_user')))
    }

  }, [])


  useEffect(() => {
    let count = 0;
    let price = 0;

    cartItems.forEach(item => {
      price = price + Number(item.price) * Number(item.count)
      count = count + Number(item.count)
    })
    setTotalCount(count)
    setTotalPrice(price)

  }, [priceListener, cartItems])

  const openCartModal = (pizza) => {
    setCardModalOpen(true)
    setCurrentItem(pizza)
  }



  const addToCart = (item) => {
    setCurrentItem(item)

    setPriceListener(prev => !prev)

    const findItem = cartItems.find(el => el.id === item.id)

    if (findItem) {
      /* We are looking for an existing item in the basket and add +1 quantity to it */
      if (!item.pizza) { // if it is not pizza
        cartItems.map(item => {
          if (item.id === findItem.id) {
            return item.count += 1
          }
        })
        /* Delete an element from sessionStorage and add it back with a new count */
        cartItems.forEach(el => {
          if (el.id === findItem.id) {
            sessionStorage.removeItem(item.id)
            sessionStorage.setItem(el.id, JSON.stringify({ ...el, count: findItem.count }))
          }
        })
      } else {
        /* Checking if there is an identical pizza for all parameters in the basket */
        const findPizza = cartItems.find(el =>
          el.pizza &&
          el.title === item.title &&
          el.cm === item.cm &&
          el.dough === item.dough &&
          el.additives.sort((a, b) => a.localeCompare(b)).join('') === item.additives.sort((a, b) => a.localeCompare(b)).join(''))

        if (findPizza) {
          /* If we got same pizza just add +1 count */
          cartItems.map(item => {
            if (item.id === findPizza.id) {
              return item.count += 1
            }
          })
          /* Delete an pizza from sessionStorage and add it back with a new count */
          cartItems.forEach(el => {
            if (el.id === findPizza.id) {
              sessionStorage.removeItem(item.id)
              sessionStorage.setItem(el.id, JSON.stringify({ ...el, count: findPizza.count }))
            }
          })
        } else {
          /* If there is no identical pizza, then add a new product to the cart */
          let obj = {
            'count': 1,
            ...item,
            id: Date.now()
          }
          sessionStorage.setItem(obj.id, JSON.stringify(obj))
          setCartItems([...cartItems, obj])
        }
      }
    } else {
      /* If there is no identical element, then add a new product to the cart */
      let obj = {
        'count': 1,
        ...item
      }
      sessionStorage.setItem(obj.id, JSON.stringify(obj))
      setCartItems([...cartItems, obj])
    }
  }
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const notify = (item) => {
    /* Popup on mobile screen when you added something */
    toast(`${item.title}, ${item.weight}g`, {
      position: "bottom-center",
      autoClose: 600,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      containerId: 'notify'
    })
  };
  const success = () => {
    /* Success buy */
    toast.success(
      <>
        <h1 style={{ textAlign: 'center', fontSize: '25px', color: 'black' }}>Your order is complete!</h1>
        <p style={{ display: 'block', textAlign: 'center', color: 'grey', marginTop: '15px', fontSize: '16px' }}>We will call you back to confirm the order.</p>
      </>, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      containerId: 'success'
    });
  }


  return (
    <AppContext.Provider value={{
      success,
      clientInfo,
      setClientInfo,
      setPriceListener,
      currentItem,
      cartItems,
      removeFromCart,
      addToCart,
      additivesData,
      openCartModal,
      setCartItems
    }}>
      <div className="wrapper">

        <ToastContainer enableMultiContainer containerId={'success'} />
        <RegistrationRoutes checkoutModalOpen={checkoutModalOpen} setCheckoutModalOpen={setCheckoutModalOpen} setIsAuth={setIsAuth} phoneRegOpen={phoneRegOpen} setPhoneRegOpen={setPhoneRegOpen} />

        <SideCart
          setPhoneRegOpen={setPhoneRegOpen}
          setCheckoutModalOpen={setCheckoutModalOpen}
          isAuth={isAuth} cartOpen={cartOpen}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          setCartOpen={setCartOpen}
          cartItems={cartItems}
        />
        <div className="container">
          <Header
            isAuth={isAuth}
            setPhoneRegOpen={setPhoneRegOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            setSelectedCity={setSelectedCity}
            citiesData={citiesData}
            selectedCity={selectedCity}
            setCityModalOpen={setCityModalOpen}
          />
          <Routes>
            <Route path="/" element={<>
              <Nav
                setCartOpen={setCartOpen}
                totalPrice={totalPrice}
                totalCount={totalCount} />
              <Slider />
              <main>
                <SectionFood error={error} notify={notify} foodData={foodData} isLoading={isLoading} />
                <ShippingPayment />
              </main>
            </>} />
            <Route path="/profile" element={<Profile isAuth={isAuth} setIsAuth={setIsAuth} />} />
          </Routes>


        </div>
        <Media queries={{ tablet: "(max-width: 950px)", phone: "(max-width: 750px)" }}>
          {matches => (
            <Fragment>
              {matches.tablet
                && <Fragment>
                  <CSSTransition
                    in={mobileMenuOpen}
                    timeout={300}
                    classNames="cart"
                    unmountOnExit
                    onEnter={() => setMobileMenuOpen(true)}
                    onExited={() => setMobileMenuOpen(false)}>
                    <MobileMenu isAuth={isAuth} setPhoneRegOpen={setPhoneRegOpen} selectedCity={selectedCity} setMobileMenuCitiesOpen={setMobileMenuCitiesOpen} setMobileMenuOpen={setMobileMenuOpen} />
                  </CSSTransition>
                  <CSSTransition
                    in={mobileMenuCitiesOpen}
                    timeout={300}
                    classNames="cart"
                    unmountOnExit
                    onEnter={() => setMobileMenuCitiesOpen(true)}
                    onExited={() => setMobileMenuCitiesOpen(false)}>
                    <MobileCityMenu setSelectedCity={setSelectedCity} citiesData={citiesData} setMobileMenuCitiesOpen={setMobileMenuCitiesOpen} />
                  </CSSTransition>
                  <ToastContainer enableMultiContainer containerId={'notify'} />
                  {cartItems.length >= 1 && <MobileCartIcon totalCount={totalCount} setCartOpen={setCartOpen} />}
                </Fragment>
              }
              {matches.phone
                ? <CSSTransition
                  in={cardModalOpen}
                  timeout={200}
                  classNames="mobile-card-modal"
                  unmountOnExit
                  onEnter={() => setCardModalOpen}
                  onExited={() => setCardModalOpen}
                >
                  <CardModal notify={notify} addToCart={addToCart} setCardModalOpen={setCardModalOpen} item={currentItem} />
                </CSSTransition>
                : <Fragment>
                  <CSSTransition
                    in={cityModalOpen}
                    timeout={200}
                    classNames="alert"
                    unmountOnExit
                    onEnter={() => setCityModalOpen}
                    onExited={() => setCityModalOpen}
                  >
                    <CityModal setCityModalOpen={setCityModalOpen} setSelectedCity={setSelectedCity} citiesData={citiesData} />
                  </CSSTransition>
                  <CSSTransition
                    in={cardModalOpen}
                    timeout={200}
                    classNames="alert"
                    unmountOnExit
                    onEnter={() => setCardModalOpen}
                    onExited={() => setCardModalOpen}
                  >
                    <CardModal notify={notify} addToCart={addToCart} setCardModalOpen={setCardModalOpen} item={currentItem} />
                  </CSSTransition>
                </Fragment>


              }

            </Fragment>
          )}
        </Media>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
