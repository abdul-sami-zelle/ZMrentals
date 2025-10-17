import React, { useEffect, useState } from 'react'
import './MyBookings.css'
import Link from 'next/link';
import axios from 'axios';

const MyBookings = () => {
  const [bookingTable, setBookingTable] = useState([]);

  const handleGetBookingData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `https://zm.skyhub.pk/customer/bookings`;
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      if (response.status === 200) {
        setBookingTable(response.data.data)
      }
      console.log("response bookings", response)
    } catch (error) {
      console.log("unedpected server Error", error)
    }
  }

  useEffect(() => {
    handleGetBookingData()
  }, [])

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get date components in local time (not UTC)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className='my-bookings-main-container'>
      {bookingTable.length > 0 ? (
        <div className='user-bookings-preview-table'>
          <table className='booking-table-main-container'>
            <thead>
              <th>Booking Id</th>
              <th>Name</th>
              <th>Vehicle Name</th>
              <th>Pick-Up Date</th>
              <th>Drop-Off Date</th>
              <th>Status</th>
            </thead>
            {bookingTable?.map((item, index) => {
              return (
                <tbody>
                  <td>{item.booking_id}</td>
                  <td>{item?.Customer?.first_name + ' ' + item.Customer?.last_name}</td>
                  <td>{item.Car.name}</td>
                  <td>{formatDate(item.pickup_time)}</td>
                  <td>{formatDate(item.drop_time)}</td>
                  <td>{item.status}</td>
                </tbody>
              )
            })}
          </table>
        </div>
      ) : (
        <div className='add-booking-button-contianer'>
          <Link href={'/vehicles'}>Add Booking Now</Link>
        </div>
      )}
    </div>
  )
}

export default MyBookings