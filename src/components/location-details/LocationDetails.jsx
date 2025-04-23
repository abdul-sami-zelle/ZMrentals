import React from 'react'
import './LocationDetails.css'
import { TfiLocationPin } from "react-icons/tfi";

const LocationDetails = () => {
    return (
        <>
            <div className='location-details-desktop-main-container'>
                <div className='location-detail-desktop-inner-container'>
                    <div className='location-details-row-container'>
                        <div className='location-detain-desktop-map-section'>
                            <span>
                                <TfiLocationPin size={20} color='var(--primary-color)' />
                                Aukland City
                            </span>
                        </div>
                        <div className='location-details-desktop-details-section'>
                            <h3>New Zealand Car Hire Locations</h3>
                            <p className='location-details-para-one'>Every road in New Zealand leads to "WOW!" With many winding, scenic drives leading to rural snow-capped mountains or pristine lakes, you will want to be in the driver's seat for your adventure!</p>
                            <p className='location-details-para-two'>Waste no time in exploring every inch of New Zealand. With 9 locations across the North and South Islands, you are never too far away from an easy car rental experience.</p>
                            <span>
                                <TfiLocationPin size={20} color='var(--color-white)' />
                                Aukland City
                            </span>
                        </div>
                    </div>
                    <div className='city-details-section'>
                        <h3>Auckland City</h3>
                        <div className='city-and-opening-times-contianer'>
                            <p><strong>Address: </strong> 165 Beach Road, Auckland City, Auckland, 1010</p>
                            <p><strong>Office open hours: </strong> 08:00 - 17:00, 7 days a week.</p>
                            <p><strong>Pick up & Drop off: </strong> 08:00 - 17:00, 7 days a week.</p>
                            <p>
                                Our off-airport location in Auckland CBD is conveniently located to give you flexibility between a city break and a world of adventure. Pick up a small rental car to zip through the streets of Auckland or swap to a 4WD to explore the rugged country.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mobile-location-details-main-container'>
                <div className='mobile-location-details-inner-container'>
                    <h3>New Zealand Car Hire Locations</h3>
                    <p>Every road in New Zealand leads to "WOW!" With many winding, scenic drives leading to rural snow-capped mountains or pristine lakes, you will want to be in the driver's seat for your adventure!</p>
                    <p>Waste no time in exploring every inch of New Zealand. With 9 locations across the North and South Islands, you are never too far away from an easy car rental experience.</p>
                    <span>
                        <TfiLocationPin size={20} color='var(--primary-color)' />
                        Aukland City
                    </span>
                </div>
                <div className='mobile-city-details-section'>
                        <h3>Auckland City</h3>
                        <div className='mobile-city-and-opening-times-contianer'>
                            <p><strong>Address: </strong> 165 Beach Road, Auckland City, Auckland, 1010</p>
                            <p><strong>Office open hours: </strong> 08:00 - 17:00, 7 days a week.</p>
                            <p><strong>Pick up & Drop off: </strong> 08:00 - 17:00, 7 days a week.</p>
                            <p>
                                Our off-airport location in Auckland CBD is conveniently located to give you flexibility between a city break and a world of adventure. Pick up a small rental car to zip through the streets of Auckland or swap to a 4WD to explore the rugged country.
                            </p>
                        </div>
                    </div>
            </div>

        </>
    )
}

export default LocationDetails