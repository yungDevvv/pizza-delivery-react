import React, {useState} from 'react'
import cl from './addittivesbutton.module.scss';

function AddittivesButton({addToAdditivesArray, item}) {
  const [selected, setSelected] = useState(false)

  return (
    <button onClick={() => {addToAdditivesArray(item, setSelected, selected)}} data-selected={selected} className={cl.AddittivesButton}>
       <img width={90} height={90} src={item.img} alt={item.title} />
       <h2>{item.title}</h2>
       <p>{item.price} €</p>
   </button>
  )
}

export default AddittivesButton