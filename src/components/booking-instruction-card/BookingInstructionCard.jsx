import React from 'react'
import './BookingInstructionCard.css';
import { SlArrowRight } from "react-icons/sl";

const BookingInstructionCard = ({ data }) => {
    return (
        <div className='booking-instruction-card-main-container'>
            {data.map((item, index) => (
                <div key={index} className='booking-instruction-single-item'>
                    <p>{item}</p>
                    <SlArrowRight size={20} className='booking-instruction-card-arrow' />
                </div>
            ))}

        </div>
    )
}

export default BookingInstructionCard