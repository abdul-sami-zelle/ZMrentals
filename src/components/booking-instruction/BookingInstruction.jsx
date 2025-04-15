import React from 'react'
import './BookingInstruction.css';
import BookingInstructionCard from '../../components/booking-instruction-card/BookingInstructionCard'

const BookingInstruction = () => {
    const instructionData = [
        {
            heading: 'Online Booking', details: [
                `visit out official website at www.zmrentals.com`,
                'visit out official website at www.zmrentals.com',
                'visit out official website at www.zmrentals.com',
            ] 
        },
        {
            heading: 'Phne Reservation', details: [
                'visit out official website at www.zmrentals.com',
                'visit out official website at www.zmrentals.com',
                'visit out official website at www.zmrentals.com',
            ] 
        },
        {
            heading: 'Walk-in Booking', details: [
                'visit out official website at www.zmrentals.com',
                'visit out official website at www.zmrentals.com',
                'visit out official website at www.zmrentals.com',
            ] 
        },
    ]
  return (
    <div className='booking-instruction-main-container'>
        <h3>How to Book</h3>
        <span>
            <p>Booking a rental car with Speedy Rentals is quick and straightforward.</p>
            <p>Follow these simple steps to secure your vehicle for a memorable journey:</p>
        </span>
        <div className='booking-instruction-cards-container'>
            {instructionData.map((item, index) => (
                <div className='booking-instruction-single-column'>
                    <h3>{item.heading}</h3>
                    <BookingInstructionCard 
                        data={item.details}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingInstruction