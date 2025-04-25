'use client'
import React, { useState } from 'react'
import './HirerDetails.css'
import { MdOutlineArrowDropDown } from "react-icons/md";

const HirerDetails = () => {
  const countryList = [
    'Pakistan',
    'Rusia',
    'Dubai',
    'Saudi Arabia',
    'Qatar',
    'New Zeeland',
    'Australia',
    'Span',
  ]
  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [findUs, setFindUs] = useState(false);
  return (
    <div className='hirer-details-main-container'>
      <p>The Hirer's name must match the name of the person collecting the vehicle as shown on their driver licence and credit/debit card</p>
      <div className='hirer-first-and-last-name'>
        <label>
          First name
          <input type='text' name='first-name' />
        </label>
        <label>
          Last name 
          <input type='text' name='last-name' />
        </label>
      </div>
      <div className='hirer-parent-country'>
          <p>Which country do you live in?</p>
          <span onClick={() => setParentCountryShow((prevState) => prevState === true ? false : true)}>
            <h3>Please Select</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`parent-country-list ${parentCountryShow ? 'show-parent-country-list' : ''}`}>
            {countryList.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
      </div>

      <label className='hirer-input-label'>
        Email Address 
        <input type='text' name='email' />
      </label>

      <label className='hirer-input-label'>
        Phone Number 
        <input type='text' name='phone' />
      </label>

      <div className='hirer-parent-country'>
          <p>how did you find us?</p>
          <span onClick={() => setFindUs((prevState) => prevState === true ? false : true)}>
            <h3>Please Select</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`parent-country-list ${findUs ? 'show-parent-country-list' : ''}`}>
            {countryList.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
      </div>

      <div className='travel-reason-container'>
          <p>Travel Reason</p>
          <div className='travel-reason-radio-container'>
            <input type='radio' />
            <input type='radio' />
          </div>
      </div>
    </div>
  )
}

export default HirerDetails
