'use client'
import React, { useEffect, useState } from 'react'
import './InsuranceType.css';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useBookingContext } from '@/context/bookingContext/bookingContext';

const InsuranceType = ({ insurances, setInsuranceSelected, packageSelected, setPackageSelected }) => {

  const excessAndBond = [
    { heading: 'Excess', details: `This amount will be charged to your credit card in the event of any damage to the car. If the cost of the damage is lower than the excess, the difference will be refunded to you once the claim has been processed.` },
    { heading: 'Bond', details: `When you pick up your car, this amount will be held on your credit card for 5-10 working days, depending on your bank and card type. Please note debit cards cannot be used for the bond.` }
  ]

  const [showDetails, setShowDetails] = useState(false);
  const [pickAndDrop, setPickAndDrop] = useState({})
  useEffect(() => {
    const locationData = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setPickAndDrop(locationData)
  }, [])

  // const [packageSelected, setPackageSelected] = useState(insurances && insurances[0]?.insurance_option_id);
  const { setBookingPayload, bookingVehicleData } = useBookingContext();
  const handleSelectInsurance = (item) => {
    setInsuranceSelected(item)
    setPackageSelected(item.insurance_option_id);
    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        car_id: bookingVehicleData.car_id,
        insurance_id: item.id,
        drop_location: pickAndDrop.drop_location,
        drop_time: pickAndDrop.drop_time,
        pickup_location: pickAndDrop.pickup_location,
        pickup_time: pickAndDrop.pickup_time
      }
    }))
  }

  return (

    <div className='insurance-type-main-container'>

      {insurances.length !== 0 ? (
        <div className='insurance-type-body'>
          {insurances?.length > 0 && insurances.map((item, index) => (
            <div
              key={index}
              className={`insurance-single-tab ${packageSelected === index ? 'insurance-single-tab-selected' : ''} `}
              onClick={() => handleSelectInsurance(item)}
            >
              {item.popular && <span className='popular-tag'>{item.popular}</span>}
              <label className='select-insurance-radio-container'>
                <input
                  type='radio'
                  name='insurance'
                  checked={packageSelected === item.insurance_option_id}
                  readOnly
                />
                {item.name}
              </label>

              <p>${item.excess}</p>
              <p>${item.bond}</p>
              <p className='insurance-bottom-text'>{parseInt(item.rate) === 0 ? 'Free' : `${parseInt(item.rate)}/Day`}</p>

            </div>
          ))}
        </div>
      ) : (
        <div className='insurance-shimmer-main-container'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}


      {insurances.length !== 0 ? (
        <div className='insurance-type-collapse'>
        <div className='insurance-types-details-head' onClick={() => setShowDetails((prevState) => prevState === true ? false : true)}>
          {showDetails ? <FaMinus size={25} color='var(--primary-color)' /> : <FaPlus size={25} color='var(--primary-color)' />}
          <h3>What are Excess and Bond?</h3>
        </div>
        <div className={`insurance-type-details ${showDetails ? 'show-insurance-details' : ''}`}>
          {excessAndBond.map((item, index) => (
            <div className='single-insurance-details' key={index}>
              <h3>{item.heading}</h3>
              <p>{item.details}</p>
            </div>
          ))}
        </div>
      </div>
      ) : (
        <div className='insurance-faq-shimmer'></div>
      )}
      
    </div>
  )
}

export default InsuranceType