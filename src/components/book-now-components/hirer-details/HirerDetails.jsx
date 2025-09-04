'use client'
import React, { useEffect, useState } from 'react'
import './HirerDetails.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useBookingContext } from '@/context/bookingContext/bookingContext';

const HirerDetails = () => {
  const countryList = [
    'Pakistan',
    'Russia',
    'Dubai',
    'Saudi Arabia',
    'Qatar',
    'New Zealand',
    'Australia',
    'Spain',
  ]
  const whereFindUs = [
    'AA TRAVEL WEBSITE',
    'BING / MSN SEARCH',
    'BROCHURE',
    'EMAIL NEWSLETTER',
    'ENTERTAINMENT BOOK',
    'FRIENDS REFRREL',
  ]

  const { bookingPayload, setBookingPayload, errors, setErrors, validateForm } = useBookingContext()

  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [findUs, setFindUs] = useState(false);

  // const handleHirerDetailsAdd = (e) => {
  //   const { name, value } = e.target;

  //   setBookingPayload((prev) => ({
  //     ...prev,
  //     user: {
  //       ...prev.user,
  //       [name]: value
  //     }
  //   }))


  //   // Clear error for the current field dynamically
  //   setErrors((prev) => {
  //     const newErrors = { ...prev };
  //     if (value.trim() !== "") {
  //       delete newErrors[name]; // ✅ remove the error for the current field
  //     }
  //     return newErrors;
  //   });

  // }

  const handleHirerDetailsAdd = (e) => {
    const { name, value } = e.target;

    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value
      }
    }));

    // Clear error immediately as user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") {
        delete newErrors[name]; // remove only this field’s error
      } else {
        newErrors[name] = "Required"; // if user deletes everything, keep error
      }
      return newErrors;
    });
  };

  useEffect(() => { console.log("error obje", errors) }, [errors])

  // const handleSelectLivingCountry = (item) => {
  //   setBookingPayload((prev) => ({
  //     ...prev,
  //     user: {
  //       ...prev.user,
  //       country: item
  //     }
  //   }))

  //   setParentCountryShow(false)
  // }

  const handleSelectLivingCountry = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        country: item
      }
    }));

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.country;  // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setParentCountryShow(false);
  };

  const handleFoundTell = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        how_find_us: item
      }
    }))

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.how_find_us;  // remove error
      } else {
        newErrors.how_find_us = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setFindUs(false)
  }

  useEffect(() => { console.log("user booking payload", bookingPayload) }, [bookingPayload])


  return (
    <div className='hirer-details-main-container'>
      <p>The Hirer's name must match the name of the person collecting the vehicle as shown on their driver licence and credit/debit card</p>
      <div className='hirer-first-and-last-name' >
        <label style={{ border: errors.firstname ? '1px solid red' : '1px solid transparent' }}>
          First name
          <input
            type='text'
            name='firstname'
            value={bookingPayload.user.firstname}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, firstname: e.target.value } }))}
          />
        </label>
        <label style={{ border: errors.lastname ? '1px solid red' : '1px solid transparent' }}>
          Last name
          <input
            type='text'
            name='lastname'
            value={bookingPayload.user.lastname}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, lastname: e.target.value } }))}
          />
        </label>
      </div>
      <div className='hirer-parent-country' style={{ border: errors.country ? '1px solid red' : '1px solid transparent' }}>
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

      <label className='hirer-input-label' style={{ border: errors.email ? '1px solid red' : '1px solid transparent' }}>
        Email Address
        <input
          type='text'
          name='email'
          value={bookingPayload.user.email}
          onChange={handleHirerDetailsAdd}
        // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, email: e.target.value } }))}
        />
      </label>

      <label className='hirer-input-label' style={{ border: errors.phone ? '1px solid red' : '1px solid transparent' }}>
        Phone Number
        <input
          type='text'
          name='phone'
          value={bookingPayload.user.phone}
          onChange={handleHirerDetailsAdd}
        // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, phone: e.target.value } }))}
        />
      </label>

      <div className='hirer-parent-country' style={{ border: errors.how_find_us ? '1px solid red' : '1px solid transparent' }}>
        <p>how did you find us?</p>
        <span onClick={() => setFindUs((prevState) => prevState === true ? false : true)}>
          <h3>{bookingPayload.user.how_find_us.length > 0 ? bookingPayload.user.how_find_us : 'Please Select'}</h3>
          <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
        </span>
        <div className={`parent-country-list ${findUs ? 'show-parent-country-list' : ''}`}>
          {whereFindUs.map((item, index) => (
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
