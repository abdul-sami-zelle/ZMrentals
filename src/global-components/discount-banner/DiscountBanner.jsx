'use client'

import React from 'react'
import './DiscountBanner.css';
import Image from 'next/image';
import SecondaryButton from '../secondary-button/SecondaryButton';

const DiscountBanner = ({ discountImage , marginBottom}) => {
  return (
    <div className='discount-banner-main-container' style={{marginBottom: marginBottom}}>
      <div className='discount-banner-inner-container'>

        <div className='discount-banner-image-container'>
          <Image src='/assets/images/discount-banners/Go_Rentals_Newsletter.jpg' width={1599} height={130}  alt='discount image' className='discount-banner-image' />
        </div>

        <div className='discount-banner-details-and-subscribe-button-container'>
          <div className='discount-banner-detail-container'>
            <span>
              <h3>Get Exclusive Deals</h3>
              <h3>For Your Next Adventure</h3>
            </span>
            <h3 className='mobile-view-discount-banner-heading'>Get Exclusive Deals For Your Next Adventure</h3>
            <span>
              <p>Join our ZM newsletter for exclusive deals, travel tips</p>
              <p>and inspirations</p>
            </span>
            <p className='mobile-view-paragraph'>
              Join our ZM newsletter for exclusive deals, travel tips and inspirations
            </p>
          </div>
          <SecondaryButton
            secondaryButtonClass={'secondary-prop-class'}
            width={'157px'}
            height={'44px'}
            secondaryBgColor={'transparent'}
            secondaryBorder={'2px solid var(--color-white)'}
            textColor={'var(--color-white)'}
            fontSize={'var(--font-body-lg)'}
            lineHeight={'var(--line-height-body)'}
            fontWeight={'var(--font-weight-body)'}
            secondaryText={'Subscribe'}
          />
        </div>
      </div>
    </div>
  )
}

export default DiscountBanner
