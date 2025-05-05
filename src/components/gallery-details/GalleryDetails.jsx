'use client'
import React from 'react'
import './GalleryDetails.css'
import PrimaryButton from '@/global-components/primary-button/PrimaryButton'
import { GoArrowRight } from "react-icons/go";
import Image from 'next/image';

const GalleryDetails = ({ flexDirection }) => {

    const descriptionsData = [
        `
            Renting a car in Auckland is hassle-free with ZM Rentals. As an independent car rental company, we offer a straightforward service that lets you explore 
            the city and suburbs with ease. Whether you're visiting Auckland’s cultural sites or seeking a peaceful escape to the outskirts, we have the perfect 
            vehicle for you.
        `,
        `
            Our carefully selected fleet ensures quality, comfort, and efficiency, offering reliable cars with excellent fuel economy for cost-effective travel. 
            Plus, enjoy peace of mind with our 24/7 roadside assistance, always just a call away.
        `,
        `
            Booking with ZM Rentals is simple – reserve online in a few clicks or visit us in-person for personalized service. Whatever your travel plans in Auckland, 
            we’ve got you covered with the right vehicle and flexible options.
        `,
    ]

    return (
        <>
            <div className='gallery-details-main-container' style={{ flexDirection: flexDirection }}>

                <div className='gallery-details-descriptions'>
                    <h3 className='section-main-heading'>
                        {/* ZM Car Rental <br /> Made Easy */}
                        Seamless Car Rental <br /> Experience in Auckland
                    </h3>
                    {descriptionsData.map((item, index) => (
                        <p key={index} className={index === 0 ? 'gallery-main-description' : 'gallery-second-description'}>{item}</p>
                    ))}
                    <PrimaryButton
                        primaryMainClass={'primary-button-main-class'}
                        primaryText={'Subscribe'}
                        primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                        width={'192px'}
                        height={'52px'}
                        gap={'20px'}
                        fontSize={'var(--font-body-lg)'}
                        lineHeight={'var(--line-height-body)'}
                        fontWeight={'var(--font-weight-bold)'}
                    />
                </div>

                <div className='gallery-details-images'>
                    <div className='gallery-main-image-container'>
                        <Image src={'/assets/images/mix/Home_Fair_Rentals.jpg'} fill alt='' className='gallery-main-image' />
                    </div>
                    <div className='gallery-multiple-images-container'>
                        <div className='gallery-multi-images-single-image-container'>
                            <Image src={'/assets/images/mix/Home_Quality_Vehicle_1.jpg'} fill alt='quality vehicle' className='gallery-multi-image' />
                        </div>
                        <div className='gallery-multi-images-single-image-container'>
                            <Image src={'/assets/images/mix/Home_Quality_Vehicle_2.jpg'} fill alt='quality vehicle two' className='gallery-multi-image' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mobile-gallery-details-main-contaier'>
                <div className='mobile-main-image-container'>
                    <Image src={'/assets/images/mix/Home_Fair_Rentals.jpg'} fill alt='main image' />
                </div>
                <div className='mobile-gallery-details-description-container'>
                    <h3 className='section-main-heading'>ZM Car Rental Made Easy</h3>
                    {descriptionsData.map((item, index) => (
                        <p key={index} className={index === 0 ? 'mobile-gallery-main-description' : 'mobile-gallery-second-description'}>{item}</p>
                    ))}
                    <PrimaryButton
                        primaryMainClass={'primary-button-main-class'}
                        primaryText={'Subscribe'}
                        primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                        width={'160px'}
                        height={'40px'}
                        gap={'20px'}
                        fontSize={'var(--font-body-sm)'}
                        lineHeight={'var(--line-height-body)'}
                        fontWeight={'var(--font-weight-medium)'}
                    />
                </div>
                <div className='mobile-gallery-multiple-images-container'>
                <div className='mobile-gallery-multi-images-item'>
                    <Image src={'/assets/images/mix/Home_Quality_Vehicle_1.jpg'} fill alt='quality vehicle' className='mobile-gallery-multi-image' />
                </div>
                <div className='mobile-gallery-multi-images-item'>
                    <Image src={'/assets/images/mix/Home_Quality_Vehicle_2.jpg'} fill alt='quality vehicle two' className='mobile-gallery-multi-image' />
                </div>
                </div>
            </div>
        </>
    )
}

export default GalleryDetails