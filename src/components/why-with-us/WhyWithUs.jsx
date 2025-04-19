import React from 'react'
import './WhyWithUs.css';
import { SiAdguard } from "react-icons/si";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaLeafSolid } from "react-icons/lia";
import { SiVlcmediaplayer } from "react-icons/si";

const WhyWithUs = () => {
    const whyWithUsData = [
        {
            icon: SiAdguard, 
            title: 'FREE basic car rental insurance',
            para: (
                <p>
                    Our basic insurance cover is included in the cost of every car hire with two upgraded <stron> insurance options </stron> available!
                </p>
            )
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
                    In partnership with <strong></strong> CarbonClick, you can choose to offset the carbon emission of your GO Rentals road trip.
                </p>
            )
        },
        {
            icon: SiAdguard, 
            title: 'FREE basic car rental insurance',
            para: (
                <p>
                    Our basic insurance cover is included in the cost of every car hire with two upgraded <stron> insurance options </stron> available!
                </p>
            )
        },
    ]
  return (
    <div className='why-with-us-main-container'>
        <div className='why-with-us-inner-container'>
            <h3>Why GO with us</h3>
            <div className='why-with-us-cards-container'>

            </div>
        </div>
    </div>
  )
}

export default WhyWithUs