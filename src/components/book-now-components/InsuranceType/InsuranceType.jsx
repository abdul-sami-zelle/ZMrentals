import React, { useState } from 'react'
import './InsuranceType.css';

const InsuranceType = () => {
  const insurancePlans = [
    {heading: 'Peace of mind', excess: '$0 Excess', bond: '$0 Bond', days: (<p><strong>$35</strong> / days</p>), popular: 'Most Popular'},
    {heading: 'Assured', excess: '$500 Excess', bond: '$0 Bond', days: (<p><strong>$25</strong> / days</p>)},
    {heading: 'Basic', excess: '$4000 Excess', bond: '$2000 Bond', days: (<p><strong>FREE</strong></p>)},
  ]
  const [packageSelected, setPackageSelected] = useState(0)
  return (
    <div className='insurance-type-main-container'>
        
        <div className='insurance-type-body'>
            {insurancePlans.map((item, index) => (
              <div key={index} className={`insurance-single-tab ${packageSelected === index ? 'insurance-single-tab-selected' : ''} `}>
                {item.popular && <span className='popular-tag'>{item.popular}</span>}
                <label className='select-insurance-radio-container'>
                  <input type='radio' />
                  {item.heading}
                </label>

                <p>{item.excess}</p>
                <p>{item.bond}</p>
                <p>{item.days}</p>

              </div>
            ))}
        </div>
        <div className='insurance-type-collapse'></div>
    </div>
  )
}

export default InsuranceType