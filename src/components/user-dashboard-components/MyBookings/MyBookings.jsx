import React from 'react'
import './MyBookings.css'
import Link from 'next/link';

const MyBookings = () => {
  const bookingTable = [];
  return (
    <div className='my-bookings-main-container'>
      {bookingTable.length > 0 ? (
        <div>No Table Added</div>
      ) : (
        <div className='add-booking-button-contianer'>
          <Link href={'/vehicles'}>Add Booking Now</Link>
        </div>
      )}
    </div>
  )
}

export default MyBookings