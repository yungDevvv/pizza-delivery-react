import React, { useEffect, useState, useRef, useContext } from 'react'
import MainButton from '../../UI/Buttons/MainButton/MainButton'
import AddittivesButton from './AdditivesButton/AddittivesButton'
import './cardmodal.scss'
import { AppContext } from '../../../context'
import Media from 'react-media'
function CardModal({ notify, addToCart, item, setCardModalOpen }) {
  
  const { additivesData } = useContext(AppContext)
  const [doughType, setDoughType] = useState('Traditional');
  const initialPizzaSize = 30;
  const [pizzaProperties, setPizzaPropertiers] = useState({ cm: initialPizzaSize, weight: item.weight })
  const [totalPrice, setTotalPrice] = useState(item.price)

  const itemImage = useRef();

  

  const renderItemProperties = (value) => {
    value = value.toLowerCase()
    if (value === 'small') {
      setPizzaPropertiers({ cm: initialPizzaSize - 5, weight: item.weight - 100 })
      itemImage.current.style.transform = 'scale(0.85)'
      setTotalPrice(prev => Number(prev) - 1)
    } else if (value === 'big') {
      setPizzaPropertiers({ cm: initialPizzaSize + 5, weight: item.weight + 100 })
      itemImage.current.style.transform = 'scale(1.15)'
      setTotalPrice(prev => Number(prev) + 1)
    }
    else if (value === 'medium') {
      setPizzaPropertiers({ cm: initialPizzaSize, weight: item.weight })
      itemImage.current.style.transform = 'scale(1)'
      setTotalPrice(prev => item.price)
    }
  }


  const [selectedAdditives, setSelectedAdditives] = useState([]);

  /* create pizza obj with selected properties*/
  const addNewPizzaCart = (item) => {
    setCardModalOpen(prev => !prev)

    const additives = selectedAdditives.map(el => el.title) // getting selected additives titles
    const pizza = {
      "id": item.id,
      "title": item.title,
      "img": item.img,
      "weight": pizzaProperties.weight,
      "cm": pizzaProperties.cm,
      "dough": doughType,
      "price": totalPrice,
      "additives": additives,
      "pizza": true
    }
    addToCart(pizza)

  }


  const addToAdditivesArray = (obj, setSelected, selected) => {
    if (selected) {
      setSelected(prev => !prev)
      setTotalPrice(prev => Number(prev) - Number(obj.price))
      setSelectedAdditives(selectedAdditives.filter((item) => Number(item.id) !== Number(obj.id)))
    }
    else {
      setSelected(prev => !prev)
      setTotalPrice(prev => Number(prev) + Number(obj.price))
      setSelectedAdditives([...selectedAdditives, obj])
    }
  }
  
  useEffect(() => {
    document.body.style = 'overflow: hidden';
    return () => {
      document.body.style = 'overflow: auto';
    }
  })
  

  return (
    <div className='modal-overlay d-a-c'>
      <div className="card-modal d-flex" >
        <div onClick={() => setCardModalOpen(false)} className="modal-cross">
          <img src="img/icons/close.svg" alt="close" />
        </div>
        <div onClick={() => setCardModalOpen(false)} className="modal-mobile-cross">
          <img src="img/icons/arrow-down.svg" alt="close" />
        </div>
        <div className="modal-img d-a-c">
          <img ref={itemImage} style={{ transition: 'all 0.4s ease-in-out' }} src={item.img} alt={item.title} />
        </div>
        <div className="modal-food">
          <div className='md-fd-container'>
            <h2 className='modal-title' onClick={() => { console.log(selectedAdditives) }}>{item.title}</h2>
            <p className='modal-description'>{`${pizzaProperties.cm} cm, ${doughType} dough, ${pizzaProperties.weight} g`}</p>
            <p className='modal-compostition'>{item.composition ? item.composition : null}</p>
            <div className='form-control'>
              <input onChange={(e) => { renderItemProperties(e.target.value) }} className='input-size' id="size-1" type="radio" name="pizza-size" value="Small" />
              <label className='label-size' htmlFor="size-1"><span>Small</span></label>
              <input onChange={(e) => { renderItemProperties(e.target.value) }} defaultChecked className='input-size' id="size-2" type="radio" name="pizza-size" value="Medium" />
              <label className='label-size' htmlFor="size-2"><span>Medium</span></label>
              <input onChange={(e) => { renderItemProperties(e.target.value) }} className='input-size' id="size-3" type="radio" name="pizza-size" value="Big" />
              <label className='label-size' htmlFor="size-3"><span>Big</span></label>
            </div>
            <div className='form-control' onChange={() => { console.log('click') }}>
              <input onChange={(e) => { setDoughType(e.target.value) }} defaultChecked className='input-size' id="dough-1" type="radio" name="dough-size" value="Traditional" />
              <label className='label-size' htmlFor="dough-1"><span>Traditional</span></label>
              <input onChange={(e) => { setDoughType(e.target.value) }} className='input-size' id="dough-2" type="radio" name="dough-size" value="Thin" />
              <label className='label-size' htmlFor="dough-2"><span>Thin</span></label>
            </div>
            <div className='pizza-additives'>
              <h5 style={{ fontSize: '20px' }}>Add to pizza</h5>
              <section className='additives'>
                {additivesData.length !== 0 ?
                  additivesData.map(item => <AddittivesButton addToAdditivesArray={addToAdditivesArray} item={item} key={item.id} />)
                  : null}

              </section>
            </div>
          </div>
          <div className='additives-button'>
          <MainButton onClick={() => {
                addNewPizzaCart(item)
                if(notify !== 'undefined') {
                  notify(item)
                } 
              }} style={{ width: '100%', padding: '15px 0px' }}>Add to cart for {totalPrice}€</MainButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal