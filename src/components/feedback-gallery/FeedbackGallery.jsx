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
                <h3 className='section-main-heading'>Beyond Rentals: Comprehensive On-Road Support</h3>
                <p>
                    We are more than just a reliable car rental service in Auckland, we’re your partner throughout your adventures and exploration. Our commitment to 
                    customer satisfaction extends far beyond handing over the keys and having them returned. We are committed to supporting you every step of the way, 
                    addressing any rental-related concerns and needs quickly and efficiently. With our 24/7 roadside assistance, you can drive with peace, knowing that 
                    help is always just a text or call away, no matter where you are or when you need it. With our comprehensive Auckland car rental services, we ensure 
                    you drive confidently during your journey.
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