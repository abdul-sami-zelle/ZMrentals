'use client'
import React, { useState } from 'react'
import './HirerDetails.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useBookingContext } from '@/context/bookingContext/bookingContext';

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

  const { bookingPayload, setBookingPayload } = useBookingContext()

  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [findUs, setFindUs] = useState(false);

  const handleSelectLivingCountry = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        country: item
      }
    }))
    setParentCountryShow(false)
  }

  const handleFoundTell = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        how_find_us: item
      }
    }))
    setFindUs(false)
  }


  return (
    <div className='hirer-details-main-container'>
      <p>The Hirer's name must match the name of the person collecting the vehicle as shown on their driver licence and credit/debit card</p>
      <div className='hirer-first-and-last-name'>
        <label>
          First name
          <input
            type='text'
            name='firstname'
            value={bookingPayload.user.firstname}
            onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, firstname: e.target.value } }))}
          />
        </label>
        <label>
          Last name
          <input
            type='text'
            name='lastname'
            value={bookingPayload.user.lastname}
            onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, lastname: e.target.value } }))}
          />
        </label>
      </div>
      <div className='hirer-parent-country'>
        <p>Which country do you live in?</p>
        <span onClick={() => setParentCountryShow((prevState) => prevState === true ? false : true)}>
          <h3>{bookingPayload.user.country.length > 0 ? bookingPayload.user.country : 'Please Select'}</h3>
          <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
        </span>
        <div className={`parent-country-list ${parentCountryShow ? 'show-parent-country-list' : ''}`}>
          {countryList.map((item, index) => (
            <p key={index} onClick={() => handleSelectLivingCountry(item)}>{item}</p>
          ))}
        </div>
      </div>

      <label className='hirer-input-label'>
        Email Address
        <input
          type='text'
          name='email'
          value={bookingPayload.user.email}
          onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, email: e.target.value } }))}
        />
      </label>

      <label className='hirer-input-label'>
        Phone Number
        <input
          type='text'
          name='phone'
          value={bookingPayload.user.phone}
          onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, phone: e.target.value } }))}
        />
      </label>

      <div className='hirer-parent-country'>
        <p>how did you find us?</p>
        <span onClick={() => setFindUs((prevState) => prevState === true ? false : true)}>
          <h3>{bookingPayload.user.how_find_us.length > 0 ? bookingPayload.user.how_find_us : 'Please Select'}</h3>
          <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
        </span>
        <div className={`parent-country-list ${findUs ? 'show-parent-country-list' : ''}`}>
          {countryList.map((item, index) => (
            <p key={index} onClick={() => handleFoundTell(item)}>{item}</p>
          ))}
        </div>
      </div>

      <div className='travel-reason-container'>
        <p>Travel Reason</p>
        <div className='travel-reason-radio-container'>
          <label>
            Leisure
            <input
              type='radio'
              name='Leisure'
              value={'Leisure'}
              checked={bookingPayload.user.travel_reason === 'Leisure'}
              onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, travel_reason: e.target.value } }))}
            />
          </label>

          <label>
            Business
            <input
              type='radio'
              name='Business'
              value={'Business'}
              checked={bookingPayload.user.travel_reason === 'Business'}
              onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, travel_reason: e.target.value } }))}
            />
          </label>

        </div>
      </div>
    </div>
  )
}

export default HirerDetails
