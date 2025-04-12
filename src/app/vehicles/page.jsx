'use client'

import React from 'react'
import './Vehicles.css'
import BookingForm from '@/global-components/booking-form/BookingForm'

const Vehicles = () => {
  return (
    <div className='page-main-container'>
      <div className='page-main-heading-container'>
        <h3 className='vehicles-main-heading'>Vehicles for rent in New Zealand</h3>
      </div>
      <BookingForm bgColor={'#f7f7f7'} textColor={'var(--primary-color)'} />
    </div>
  )
}

export default Vehicles