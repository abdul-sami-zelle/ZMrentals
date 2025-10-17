import React, { useEffect, useState } from 'react'
import './MyBookings.css'
import Link from 'next/link';
import axios from 'axios';

const MyBookings = () => {
  const [bookingTable, useBookingTable] = useState([]);

  const handleGetBookingData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `https://zm.skyhub.pk/customer/dashboard`;
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      console.log("response bookings", response)
    } catch (error) {
      console.log("unedpected server Error", error)
    }
  }

  useEffect(() => {
    handleGetBookingData()
  }, [])

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