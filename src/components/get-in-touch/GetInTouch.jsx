import React, { useEffect, useState } from 'react'
import './GetinTouch.css'
import Link from 'next/link'
import { IoArrowDown } from "react-icons/io5";

import { FaLocationArrow, FaPhone, FaClock, FaEnvelope, FaMapLocation, FaMinus } from "react-icons/fa6";
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';


const GetInTouch = () => {

    const [showAddrss, setShowAddress] = useState(false);
    const addresses = [
        {
            city: 'Auckland City',
            address: `Address: 11 peninsula road Mangere Auckland 2022`,
            phone: `+6421467261`,
            openingHours: `Operating Hours: 9am - 5pm`,
            googleLocation: 'Google Location'
        }
    ]

    const [contactData, setContactData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })

    const handleContactData = (e) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className='get-in-touch-main-container'>
            <h3>Get in Touch with ZM Rentals</h3>
            <p>Thank you for choosing ZM Rentals as your car hire service in Auckland.</p>
            <p>We are here to assist you with any inquiries or support you may need.</p>
            {/* <p>Below are the different ways you can get in touch with us</p> */}

            <div className='get-in-touch-types-container'>
                <div className='contact-form-container'>

                    <div className='contact-card'>
                        <Image
                            src={'/assets/images/mix/auckland_city.jpg'}
                            fill
                            alt="Profile"
                            className="profile-image"
                        />

                        <div className='cotact-info-section'>

                            <div className='contact-info-heading-section'>
                                <h3>Contact Information</h3>
                                <p>Thank you for choosing ZM Rentals as your car hire service in Auckland.</p>
                            </div>
                            <span className='contact-type-section'>
                                <FaPhone size={20} color='var(--color-white)' />
                                <a href="tel:+6421467261">+64 21 467 261</a>
                            </span>
                            <span className='contact-type-section'>
                                <FaEnvelope size={20} color='var(--color-white)' />
                                <a href="mailto:info@zmrentals.co.nz">info@zmrentals.co.nz</a>
                            </span>
                            <span className='contact-type-section'>
                                <FaLocationArrow size={20} color='var(--color-white)' />
                                Auckland, New Zeeland
                            </span>
                        </div>

                    </div>


                    <div className='contact-form-inputs-container'>
                        <div className='contact-input-name-and-last-name'>
                            <label className={`contact-input-label ${contactData.name ? 'filled' : ''}`}>
                                <p>Your Name</p>
                                <input type='text' className='contact-form-input' name='name' value={contactData.name} onChange={(e) => handleContactData(e)} />
                            </label>

                            <label className={`contact-input-label ${contactData.phone ? 'filled' : ''}`}>
                                <p>Your Phone</p>
                                <input type='text' className='contact-form-input' name='phone' value={contactData.phone} onChange={(e) => handleContactData(e)} />
                            </label>
                        </div>

                        <label className={`contact-input-label ${contactData.email ? 'filled' : ''}`}>
                            <p>Your Email</p>
                            <input type='text' className='contact-form-input' name='email' value={contactData.email} onChange={(e) => handleContactData(e)} />
                        </label>

                        <label className={`contact-input-label ${contactData.message ? 'filled' : ''}`}>
                            <p>Message</p>
                            {/* message */}
                            <textarea rows={3}  className='contact-form-input' name='message' value={contactData.message} onChange={(e) => handleContactData(e)} />
                        </label>
                        <div className='contact-form-inputs-submit-button-container'>
                            <button>Submit</button>

                        </div>
                    </div>
                    
                    <div className='mobile-view-contact-details'>
                        <span>
                            <h3>Phone</h3>
                            <a href="tel:+6421467261">+64 21 467 261</a>
                        </span>
                        <span>
                            <h3>Email</h3>
                            <a href="mailto:info@zmrentals.co.nz">info@zmrentals.co.nz</a>
                        </span>
                        <span>
                            <h3>Address</h3>
                            Auckland City
                        </span>
                    </div>


                    
                </div>

            </div>
        </div>
    )
}

export default GetInTouch