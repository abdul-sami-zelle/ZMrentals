import React from 'react'
import './RentalPolicy.css'
import RentalPolicyCard from '../../components/rental-policy-card/RentalPolicyCard'

const RentalPolicy = () => {
    const policiesData = [
        {heading : 'Driver Requirments', detail: [
            `The primary driver must be at least 21 years old and hold a valid driver's license`,
            `The primary driver must be at least 21 years old and hold a valid driver's license`,
        ]},
        {heading : 'Fuel Policy', detail: [
            `The primary driver must be at least 21 years old and hold a valid driver's license`,
            `The primary driver must be at least 21 years old and hold a valid driver's license`,
        ]},
        {heading : 'Vehicle Usage', detail: [
            `The primary driver must be at least 21 years old and hold a valid driver's license`,
        ]},
    ]
  return (
    <div className='rental-poliecies-main-container'>
        <div className='rental-policies-heading-container'> 
            <h3>Rental Policies</h3>
            <div className='rental-policy-under-line-container'>
                <div className='rental-policy-single-line-right-container'>
                    <div className='rental-policy-right-line'></div>
                </div>
                <div className='rental-policy-left-line-container'>
                    <div className='rental-policy-left-line'></div>
                </div>
            </div>
        </div>
        <div className='rental-policies-slogan-container'>
            <p>At Speedy Rentals, we uphold a commitment to transparency and customer satisfaction.</p>
            <p>Our rental policies ensure a seamless rental experience for all our valued customers:</p>
        </div>
        <div className='rental-policies-container'>
            {policiesData.map((item,index) => (
                <div className='rental-policy-single-item'>
                    <h3>{item.heading}</h3>
                    {item.detail.map((item, index) => (
                        <RentalPolicyCard
                            key={index}
                            data={item}
                        />
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default RentalPolicy