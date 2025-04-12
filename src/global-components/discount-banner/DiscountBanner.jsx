'use client'

import React from 'react'
import './DiscountBanner.css';
import Image from 'next/image';
import SecondaryButton from '../secondary-button/SecondaryButton';

const DiscountBanner = ({ discountImage }) => {
  return (
    <div className='discount-banner-main-container'>
      <div className='discount-banner-inner-container'>

        <div className='discount-banner-image-container'>
          <Image src={discountImage} alt='discount image' className='discount-banner-image' />
        </div>

        <div className='discount-banner-details-and-subscribe-button-container'>
          <div className='discount-banner-detail-container'>
            <span>
              <h3>Save 10% on your</h3>
              <h3>next adventure</h3>
            </span>
            <h3 className='mobile-view-discount-banner-heading'>Save 10% on your next adventure</h3>
            <span>
              <p>Join our GO newsletter for exclusive deals, travel tips</p>
              <p>and inspirations</p>
            </span>
            <p className='mobile-view-paragraph'>
              Join our GO newsletter for exclusive deals, travel tips and inspirations
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