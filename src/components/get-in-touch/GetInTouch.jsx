import React from 'react'
import './GetinTouch.css'
import Link from 'next/link'
import { IoArrowDown } from "react-icons/io5";

const GetInTouch = () => {


  return (
    <div className='get-in-touch-main-container'>
        <h3>Get in Touch with Speedy Rentals</h3>
        <p>Thank you for choosing Speedy Rentals as your car hire service in Auckland.</p>
        <p>We are here to assist you with any inquiries or support you may need.</p>
        <p>Below are the different ways you can get in touch with us</p>

        <div className='get-in-touch-types-container'>
            <div className='get-in-touch-phone'>
                <h3>Phone</h3>
                <p>For immediate assistance,</p>
                <p>Give us a call at <Link href={'#'}> 0955 8371 3 </Link></p>
            </div>

            <div className='get-in-touch-phone'>
                <h3>Email</h3>
                <p>Have a question or need more</p>
                <p>information?</p>
                <p>Reach out to us at</p>
                <p>info@speedyrentals.co.nz</p>
            </div>

            <div className='get-in-touch-address'>
                <h3>Address</h3>
                <div className='address-dropdown-main-container'>
                    <div className='address-dropdown-head'>
                        <IoArrowDown size={20}  color='var(--color-white)'/>
                        <p>Auckland City</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetInTouch