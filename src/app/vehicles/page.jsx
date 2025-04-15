'use client'

import React from 'react'
import './Vehicles.css'
import BookingForm from '@/global-components/booking-form/BookingForm'
import CarDetails from '../../components/car-details/CarDetails'

const Vehicles = () => {
  return (
    <div className='page-main-container '>
      {/* Max wiwdth Container Start */}
      <div className='page-max-width-container'>
        <div className='page-main-heading-container'>
          <h3 className='vehicles-main-heading'>Vehicles for rent in New Zealand</h3>
        <BookingForm bgColor={'#f7f7f7'} textColor={'var(--primary-color)'} />
        </div>
        <CarDetails />
      </div>
    {/* Max width Container End */}
    </div>
  )
}

export default Vehicles