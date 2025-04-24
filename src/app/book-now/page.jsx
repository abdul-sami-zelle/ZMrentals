'use client'
import React, { useState } from 'react';
import './BookNow.css';
import InsuranceType from '../../components/book-now-components/InsuranceType/InsuranceType'
import Extras from '../../components/book-now-components/extras/Extras'
import HirerDetails from '../../components/book-now-components/hirer-details/HirerDetails'
import Payments from '../../components/book-now-components/payments/Payments'

const BookNow = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  return (
    <div className="book-now-page-main-container">
      <div className="book-now-inner-section">
        <div className="book-now-max-width-container">

          <div className='book-now-main-container'>
            <div className='booking-steps-main-container'>

              <div className='insurance-type-head'>
                <span>1. Choose Insurance</span>
                <div className='insurance-tab-number'>
                  {Array.from({length: 4}).map((_,index) => (
                    <p key={index} className={`booking-tabs-numbers ${selectedTabIndex === index ? 'booking-selected-tab' : ''}`}>{index + 1}</p>
                  ))}
                </div>
              </div>

              {selectedTabIndex === 0 ? <InsuranceType />
                : selectedTabIndex === 1 ? <Extras />
                  : selectedTabIndex === 2 ? <HirerDetails />
                    : <Payments />}

              <button className='payment-continue-button'>Continue</button>

            </div>
            <div className='booking-summary-main-container'></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookNow