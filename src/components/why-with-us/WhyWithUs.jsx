import React from 'react'
import './WhyWithUs.css';
import { SiAdguard } from "react-icons/si";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaLeafSolid } from "react-icons/lia";
import { SiVlcmediaplayer } from "react-icons/si";
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';

const WhyWithUs = () => {
    const whyWithUsData = [
        {
            icon: SiAdguard, 
            title: 'Unlimited Freedom:',
            para: (
                <p>
                    Explore Auckland without limits, thanks to our unlimited kilometers.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            ),
        },
        {
            icon: FaArrowRightLong, 
            title: '24/7 Peace of Mind:',
            para: (
                <p>
                     Drive confidently with round-the-clock roadside assistance, always there when you need it.
                    {/* We can organise <strong> one-way rentals </strong> with pick-up in one location and drop-off in another. Stick to your dream itinerary without worrying about circling back. */}
                </p>
            )
        },
        {
            icon: LiaLeafSolid, 
            title: 'Prime Location: ',
            para: (
                <p>
                    Conveniently located just minutes from the airport for easy pick-up and drop-off.
                    {/* In partnership with <strong>CarbonClick, </strong> you can choose to offset the carbon emission of your GO Rentals road trip. */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Always Here for You:',
            para: (
                <p>
                    Our customer support team is available 24/7, ready to assist with anything you need.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'No Hidden Surprises:',
            para: (
                <p>
                    Our transparent car rental process means no hidden fees, just honest pricing.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Tailored for You:',
            para: (
                <p>
                    Personalize your Auckland car hire experience with flexible rental plans designed to fit your needs.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Affordable Quality:',
            para: (
                <p>
                    Get the best budget deals without compromising on comfort, safety, or quality.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Comfort and Safety:',
            para: (
                <p>
                    Enjoy a smooth ride in our well-maintained, air-conditioned vehicles, built for your comfort.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Navigate with Ease:',
            para: (
                <p>
                    Find your way effortlessly with the integrated GPS, guiding you through Auckland.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Stay Connected:',
            para: (
                <p>
                    With Bluetooth and USB ports, keeping your devices charged and connected is easy.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'Choose Your Coverage:',
            para: (
                <p>
                    Select from basic or premium insurance plans to suit your peace of mind.
                    {/* Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available! */}
                </p>
            )
        },
    ]
  return (
    <div className='why-with-us-main-container'>
        <div className='why-with-us-inner-container'>
            <h3>Why Partner with ZM Rentals?</h3>
            <div className='why-with-us-cards-container'>
                {whyWithUsData.map((item, index) => {
                    let Icon = item.icon;
                    return <div key={index} className='why-with-us-single-card'>
                        <Icon className='why-with-us-card-icon' size={30} color='var(--primary-color)' />
                        <h3>{item.title}</h3>
                        {item.para}
                    </div>
                })}

            </div>
                <SecondaryButton
                  secondaryButtonClass={'secondary-prop-class'}
                  width={'157px'}
                  height={'44px'}
                  secondaryBgColor={'#fff'}
                  secondaryBorder={'2px solid var(--primary-color)'}
                  textColor={'var(--primary-color)'}
                  fontSize={'var(--font-body-lg)'}
                  lineHeight={'var(--line-height-body)'}
                  fontWeight={'var(--font-weight-bold)'}
                  secondaryText={'Learn more'}
                  display={'flex'}
              />
        </div>
    </div>
  )
}

export default WhyWithUs