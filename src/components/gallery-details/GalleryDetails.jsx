'use client'
import React from 'react'
import './GalleryDetails.css'
import PrimaryButton from '@/global-components/primary-button/PrimaryButton'
import { GoArrowRight } from "react-icons/go";
import imageOne from '../../assets/images/mix/Home_Fair_Rentals.avif';
import qualityVehicle from '../../assets/images/mix/Home_Quality_Vehicle_1.avif';
import qualityVehicleTwo from '../../assets/images/mix/Home_Quality_Vehicle_2.avif'
import Image from 'next/image';

const GalleryDetails = ({ flexDirection }) => {
    const descriptionsData = [
        `
            We make renting a car in New Zealand ridiculously simple. Apart from GO Rentals being one of New Zealand’s 
            largest independent car rental companies, we also have brand new cars of all shapes and sizes to best suit the 
            holiday you’ve got planned.
        `,
        `
            With a fleet of some of the best rental cars in NZ, pop onto the vehicles page and check out our huge range of modern 
            rental cars, including the Tesla Model 3 and Model Y, Ford Everest Titanium, Mitsubishi Pajero Sport, and Toyota CHR.
        `,
        `
            And don’t worry, its not all about the techy car details – you can also explore some of our fantastic trip planning 
            resources and discounts from our local experts.
        `,
        `
            Once you’ve sorted out where you’re going and what you want to see along the way, booking your rental car is as simple 
            as clicking a button.
        `,
        `
            Don’t worry if you’re not built for the internet though as we have a helpful team of road savvy experts happy to 
            chat on the phone and answer your questions or take care of the booking for you. GO Rentals - making car hire in New 
            Zealand simple for over 20 years.
        `,
    ]

    

  return (
    <div className='gallery-details-main-container' style={{flexDirection: flexDirection}}>

        <div className='gallery-details-descriptions'>
              <h3>NZ Car Rental <br /> Made Easy</h3>
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
            <Image src={imageOne} alt='' className='gallery-main-image' />
            <div className='gallery-multiple-images-container'>
                <Image src={qualityVehicle} alt='quality vehicle' className='gallery-multi-image' />
                <Image src={qualityVehicleTwo} alt='quality vehicle two' className='gallery-multi-image' />
            </div>
        </div>
    </div>
  )
}

export default GalleryDetails