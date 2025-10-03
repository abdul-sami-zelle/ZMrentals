'use client'
import React, { useEffect, useState } from 'react'
import './ManageBooking.css'
import SelectBooking from '../../components/manage-bookings-components/SelectBooking/SelectBooking'
import VerifyBooking from '../../components/manage-bookings-components/VerifyBooking/VerifyBooking'
import UpdateBooking from '../../components/manage-bookings-components/UpdateBooking/UpdateBooking'
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios'

const page = () => {
    const [manageBookingSteper, setManageBookingSteper] = useState(0);

    const images = [
        "/assets/manage-bookings/blur-bg.jpg",
        "/assets/manage-bookings/big-extra-image.jpg",
        "/assets/manage-bookings/big-image-1.jpg",
        "/assets/manage-bookings/big-image-2.jpg",
        "/assets/manage-bookings/big-image-3.jpg",
        "/assets/manage-bookings/big-image-4.jpg",
    ];
    const posterImages = [
        "/assets/manage-bookings/inner-poster-1.jpg",
        "/assets/manage-bookings/inner-poster-2.jpg",
        "/assets/manage-bookings/inner-poster-3.jpg",
        "/assets/manage-bookings/inner-poster-4.jpg",
        "/assets/manage-bookings/inner-poster-5.jpg",
    ];

    const [bgImage, setBgImage] = useState(images[0]);
    const [posterBg, setPosterBg] = useState(posterImages[0]);

    const changeBackground = () => {
        console.log("called")
        const randomIndex = Math.floor(Math.random() * images.length);
        const posterINdex = Math.floor(Math.random() * posterImages.length)
        setBgImage(images[randomIndex]);
        setPosterBg(posterImages[posterINdex])
    };

    

    return (
        <div
            className='manage-booking-main-contianer'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {manageBookingSteper < 2 ? (
                <div className='manage-booking-inner-contianer'>
                    <div
                        className='manage-booking-left-sec'
                        style={{
                            backgroundImage: `url(${posterBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                    </div>

                    <div className='manage-booking-right-sec'>
                        <div className='manage-booking-form-arrow-back-contianer'>
                            <IoIosArrowRoundBack size={35} color='#000' style={{ cursor: 'pointer' }} />
                        </div>

                        <div className='manage-booking-right-content-scroll-contianer'>
                            {manageBookingSteper === 0 ? <SelectBooking imageChaneg={changeBackground} manageBookingSteper={manageBookingSteper} setManageBookingSteper={setManageBookingSteper} />
                                : <VerifyBooking imageChange={changeBackground} manageBookingSteper={manageBookingSteper} setManageBookingSteper={setManageBookingSteper} />}
                        </div>

                    </div>
                </div>
            ) : (
                <UpdateBooking />
                
            )}

        </div>
    )
}

export default page