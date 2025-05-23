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
            title: 'FREE basic car rental insurance',
            para: (
                <p>
                    Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available!
                </p>
            ),
        },
        {
            icon: FaArrowRightLong, 
            title: 'One-way car rentals',
            para: (
                <p>
                    We can organise <strong> one-way rentals </strong> with pick-up in one location and drop-off in another. Stick to your dream itinerary without worrying about circling back.
                </p>
            )
        },
        {
            icon: LiaLeafSolid, 
            title: 'Offset carbon emissions',
            para: (
                <p>
                    In partnership with <strong>CarbonClick, </strong> you can choose to offset the carbon emission of your GO Rentals road trip.
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'FREE basic car rental insurance',
            para: (
                <p>
                    Our basic insurance cover is included in the cost of every car hire with two upgraded <strong> insurance options </strong> available!
                </p>
            )
        },
    ]
  return (
    <div className='why-with-us-main-container'>
        <div className='why-with-us-inner-container'>
            <h3>Why GO with us</h3>
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