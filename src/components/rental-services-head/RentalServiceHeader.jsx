import React from 'react'
import './RentalServiceHeader.css';

const RentalServiceHeader = ({heading, description}) => {
  return (
    <div className='rental-service-head-container'>
        <h3>{heading}</h3>
        <p>{description}</p>
    </div>
  )
}

export default RentalServiceHeader