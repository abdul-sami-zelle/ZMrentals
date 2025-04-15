import React from 'react'
import './RentalPolicyCard.css';
import { SiTicktick } from "react-icons/si";

const RentalPolicyCard = ({data}) => {
  return (
    <div className='rental-policy-card-container'>
        <div className='rental-policy-single-card-item'>
            <SiTicktick size={20} />
            <p>{data}</p>
        </div>
    </div>
  )
}

export default RentalPolicyCard