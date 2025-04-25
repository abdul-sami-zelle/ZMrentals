'use client'
import React, { useState } from 'react'
import './Extras.css'
import QuantityAdd from '../quantity-add/QuantityAdd'


const Extras = () => {
  const [extraVAlues, setExtraValues] = useState({
    extraDriver: 0,
    childSeats: 0,
    boosterSeats: 0,
    babyCapsule: 0,
    roofRacks: 0,
    skiRacks: 0,
    snowChains: 0
  })
  const extraItems = [
    { key: 'extraDriver', title: 'Extra Driver', price: '$15 / extra driver'},
    { key: 'childSeats', title: 'Child Seat', price: '$59 (6 months – 3 years)'},
    { key: 'boosterSeats', title: 'Booster Seats', price: '$59 (4–7 years)'},
    { key: 'babyCapsule', title: 'Baby Capsule', price: '$59 (0–6 months old)'},
    { key: 'roofRacks', title: 'Roof Racks', price: '$69'},
    { key: 'skiRacks', title: 'Ski Racks', price: '$69'},
    { key: 'snowChains', title: 'Snow Chains', price: '$69'},
  ]
  return (
    <div className='extras-main-container'>
      {extraItems.map((item, index) => (
        <div key={index} className='single-extra-item'>
          <div className='add-or-remove-quantity-container'>
            <QuantityAdd 
              quantity={extraVAlues[item.key]} 
              onChange={(newValue) =>
                setExtraValues(prev => ({ ...prev, [item.key]: newValue }))
              }
            />
          </div>
          <div className='extra-item-and-price-container'>
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Extras