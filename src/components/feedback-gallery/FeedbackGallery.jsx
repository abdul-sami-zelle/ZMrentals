import React from 'react'
import './FeedbackGallery.css';
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';

const FeedbackGallery = () => {
    return (
        <div className='feedback-gallery-main-container'>

            <div className='feedback-gallery-images-container'>
                <div className='feedback-gallery-images-single-image-container'>
                    <Image src={'/assets/images/feedback-gallery/Home_Road_Support_1.jpg'} fill alt='home road support' className='feedback-gallery-image' />
                </div>
                <div className='feedback-gallery-images-single-image-container'>
                    <Image src={'/assets/images/feedback-gallery/Home_Road_Support_2.jpg'} fill alt='home road support' className='feedback-gallery-image-two' />
                </div>
            </div>
            <div className='feedback-gallery-description-container'>
                <h3 className='section-main-heading'>Outstanding on-road support</h3>
                <p>
                    24/7 roadside assistance, we’ve got your back — so you can make the most of your time in New Zealand.
                    Tick rental car off your list of things to do when you book with ZM - we’ve got you covered every step of the way.
                </p>
                <SecondaryButton
                    secondaryButtonClass={'secondary-prop-class'}
                    width={'157px'}
                    height={'44px'}
                    secondaryBgColor={'#fff'}
                    secondaryBorder={'2px solid var(--primary-color)'}
                    textColor={'var(--primary-color)'}
                    fontSize={'var(--font-body-lg)'}
                    lineHeight={'var(--line-height-body)'}
                    fontWeight={'var(--font-weight-body)'}
                    secondaryText={'Why ZM with us'}
                />
            </div>

            <div className='feedback-gallery-customer-comment-card-main-container'>
                <div className='feedback-gallery-customer-comment-card-inner-container'>
                    <p>
                        ZM Rentals are AWESOME! The car was fantastic, safe and didn’t miss a beat. From the moment we picked up the car
                        the staff were so helpful and gave us lots of local knowledge tips. 10/10 thanks ZM rentals!
                    </p>
                    <div className='feedback-gallery-user-profile-section'>
                        <div className='feedback-gallery-profile-container'>
                            <Image src={'/assets/images/feedback-gallery/Home_Road_Support_1.jpg'} fill alt='home image' className='feedback-gallery-customer-profile' />
                        </div>
                        <span>
                            <h3>Tegan</h3>
                            <p>Australia</p>
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FeedbackGallery