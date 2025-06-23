'use client'
import React, { useState } from 'react'
import './Payments.css'
import Image from 'next/image'
import { FaQuestionCircle } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';
import { useBookingContext } from '@/context/bookingContext/bookingContext';

const Payments = ({ grandTotal, isChecked, setIsChecked }) => {
  const payTime = [
    { title: 'Pay Later', val: 'pay-leter', disc: 'Pay when you check in or pick-up.', total: `$${grandTotal} NZD` },
    { title: 'Pay Now', val: 'pay-now', disc: 'Pay the full amount now, save time later.', total: `$${grandTotal} NZD` },
  ]
  const paymentTypeCards = [
    '/assets/icons/american-express.png',
    '/assets/icons/discover.png',
    '/assets/icons/master.png',
    '/assets/icons/visa.png',
  ]
  const [selectPaymentType, setSelectPaymentType] = useState(0)





  return (
    <div className='payment-main-container'>

      <div className='select-payment-type'>
        {payTime.map((item, index) => {
          const disableOption = item.title === 'Pay Now';
          return (<div key={index} className={`pay-type-single-sec ${selectPaymentType === index ? 'active-select-payment' : ''}`} style={{ cursor: disableOption ? 'not-allowed' : 'pointer' }} onClick={() => { if (!disableOption) { setSelectPaymentType(index) } }}>
            {index !== 0 && <div className='pay-option-overlay-container'></div>}
            <input type='radio' name={item.val} checked={selectPaymentType === index} disabled={disableOption} readOnly />
            <div className='selected-pay-type-detail'>
              <h3>{item.title}</h3>
              <p>{item.disc}</p>
              <span>{item.total}</span>
            </div>
          </div>)
        })}
      </div>

      {/* <div className={`payment-cards-type`}>
        <h3>Payment Method</h3>

        <div className='payment-cards-and-desc'>
          <div className='payment-cards-type-icons'>
            <input type='radio' readOnly />
            {paymentTypeCards.map((item, index) => (
              <Image src={item} width={40} height={40} key={index} alt='card' className='payment-type-card' />
            ))}
          </div>
          <p className={`payment-type-disc ${selectPaymentType !== 0 ? 'hide-section' : ''}`}>Payment details are needed to secure your booking, but you won’t be charged anything today.</p>
        </div>
      </div> */}

      {/* <div className={`payment-input-details `}>
        <label>
          Card number
          <input type='text' name='card' readOnly disabled style={{ cursor: 'not-allowed'}}  />
        </label>

        <label>
          Name on Card
          <input type='text' name='name-on-card' readOnly disabled style={{ cursor: 'not-allowed'}}  />
        </label>

        <div className='expiry-and-security-input-container'>
          <label>
            Expiry
            <input type='text' placeholder='MM/YY' name='name-on-card' readOnly disabled style={{ cursor: 'not-allowed'}}  />
          </label>
          <label>
            Security code
            <input type='text' name='name-on-card' readOnly disabled style={{ cursor: 'not-allowed'}}  />
          </label>
        </div>
        <p className={`processing-fee-text ${selectPaymentType !== 0 ? 'hide-payment-proccessing-fee' : ''}`}>Payment processing fee</p>
      </div> */}

      <span className='payment-policy-hightlight'>
        <p>Heads up, all online payments are subject to a non-refundable payment processing fee. </p>
        <FaQuestionCircle size={15} color='var(--primary-color)' className='payment-policy-icon' />
      </span>

      <span className='agree-to-terms-and-conditions-highlight'>
        <input 
          type='checkbox' 
          id='terms-checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)} 
        />
        <span className="checkmark"></span>
        <label htmlFor='terms-checkbox'>
          <p>I agree to <Link href={'#'}>ZM rentals Terms an Conditions</Link> and all drivers are at least <strong>21</strong> years old</p>
        </label>
      </span>
    </div>
  )
}

export default Payments