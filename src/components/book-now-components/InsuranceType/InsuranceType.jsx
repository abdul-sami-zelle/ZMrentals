'use client'
import React, { useState } from 'react'
import './InsuranceType.css';
import { FaPlus, FaMinus } from "react-icons/fa6";

const InsuranceType = () => {
  const insurancePlans = [
    { heading: 'Peace of mind', excess: '$0 Excess', bond: '$0 Bond', days: (<p><strong>$35</strong> / days</p>), popular: 'Most Popular' },
    { heading: 'Assured', excess: '$500 Excess', bond: '$0 Bond', days: (<p><strong>$25</strong> / days</p>) },
    { heading: 'Basic', excess: '$4000 Excess', bond: '$2000 Bond', days: (<p><strong>FREE</strong></p>) },
  ]
  const excessAndBond = [
    { heading: 'Excess', details: `This amount will be charged to your credit card in the event of any damage to the car. If the cost of the damage is lower than the excess, the difference will be refunded to you once the claim has been processed.` },
    { heading: 'Bond', details: `When you pick up your car, this amount will be held on your credit card for 5-10 working days, depending on your bank and card type. Please note debit cards cannot be used for the bond.` }
  ]

  const [showDetails, setShowDetails] = useState(false);

  const [packageSelected, setPackageSelected] = useState(0)
  return (
    <div className='insurance-type-main-container'>

      <div className='insurance-type-body'>
        {insurancePlans.map((item, index) => (
          <div
            key={index}
            className={`insurance-single-tab ${packageSelected === index ? 'insurance-single-tab-selected' : ''} `}
            onClick={() => setPackageSelected(index)}
          >
            {item.popular && <span className='popular-tag'>{item.popular}</span>}
            <label className='select-insurance-radio-container'>
              <input
                type='radio'
                name='insurance'
                checked={packageSelected === index}
                readOnly
              />
              {item.heading}
            </label>

            <p>{item.excess}</p>
            <p>{item.bond}</p>
            {item.days}

          </div>
        ))}
      </div>

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
    </div>
  )
}

export default InsuranceType