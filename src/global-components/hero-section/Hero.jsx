import React from 'react'
import './Hero.css'
import BookingForm from '../booking-form/BookingForm'

const Hero = () => {
  return (
    <div className='hero-section-main-container'>
        <div className='hero-section-inner-container'>
            <div className='hero-section-content-container'>
                <div className='hero-section-main-heading-container'>
                    <h3>
                        Celebrating 25 Years of ZM: <br />  WIN Your Share of $25,000!*
                    </h3>
                </div>
                <div className='hero-section-main-pera-container'>
                    <p>
                          ZM in to <strong> WIN 1 of 25 car hire vouchers valued at $1,000 each </strong> when you book <br /> your car rental
                          with travel concluded by 31 March 2026 <strong> *See the full T&Cs here </strong>
                    </p>
                </div>
                <div className='booking-form-container-parent'>
                    <div className='booking-form-width-control-container'>
                        <BookingForm bgColor={'var(--color-white)'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'} textColor={'var(--color-white)'} primaryButtonText={'Subscribe'} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero