import React from 'react'
import './CarDetails.css';
import Link from 'next/link';

const CarDetails = () => {
    return (
        <div className='car-details-main-container'>
            <h3>Small Cars</h3>
            <div className='car-details-description-and-all-vehicles-link-container'>
                <p>
                    Our fleet of small cars is perfect for city driving, solo or couples road trips and business trips. With pick-up locations in all the major
                    city airports, Queenstown, Wellington, Auckland and Christchurch, and more, you can quickly pick up the keys, jump straight into a small rental
                    car and zip your way through city culture, coastal towns and lake districts. Our small cars for hire are modern, all automatic transmission and run on petrol.
                </p>
                <Link href={'/'}>View all small cars details</Link>
            </div>
        </div>
    )
}

export default CarDetails