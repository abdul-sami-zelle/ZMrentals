import React from 'react'
import './HappySnapGallery.css';
import snapOne from '../../assets/images/happy-snap/Home_GO_Snap_Happy_0.avif'
import snapTwo from '../../assets/images/happy-snap/Home_GO_Snap_Happy_1.avif'
import snapThree from '../../assets/images/happy-snap/Home_GO_Snap_Happy_2.avif'
import mainLogo from '../../assets/logo.png';
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';

const HappySnapGallery = () => {
  return (
    <>
        <div className='happy-snap-mobile-main-container'>
            <Image src={snapOne} alt='happy snap' className='happy-snap-single-image' />

            <div className='happy-snap-description-main-container'>
                <Image src={mainLogo} alt='logo' className='happy-snap-logo' />
                <h3>GO Snap Happy</h3>
                <p>
                      At GO Rentals, we love being a part of your travel journey and helping you make wonderful memories.
                      Snap a picture of your travels around New Zealand, and be in to win up to $500 of the cost of your rental back.
                </p>

                  <SecondaryButton
                      secondaryButtonClass={'secondary-prop-class'}
                      width={'157px'}
                      height={'44px'}
                      secondaryBgColor={'transparent'}
                      secondaryBorder={'2px solid var(--primary-color)'}
                      textColor={'var(--primary-color)'}
                      fontSize={'var(--font-body-lg)'}
                      lineHeight={'var(--line-height-body)'}
                      fontWeight={'var(--font-weight-body)'}
                      secondaryText={'Find out more'}
                  />
            </div>

            <div className='happy-snap-gallery-container'>
                <Image src={snapTwo} alt='snap two' className='happy-snap-gallery-image-one' />
                <Image src={snapThree} alt='snap Three' className='happy-snap-gallery-image-two' />
            </div>
        </div>

        <div className='happy-snap-desktop-main-container'>
            <div className='happy-snap-desktop-gallery-main-container'>
                <div className='happy-snap-desktop-single-image-container'>
                    <Image src={snapOne} alt='snap one' className='desktop-snap-gallery-main-image' />
                </div>
                <div className='happy-snap-desktop-multi-images-container'>
                      <Image src={snapTwo} alt='snap two' className='desktop-snap-gallery-image-one' />
                      <Image src={snapThree} alt='snap two' className='desktop-snap-gallery-image-two' />
                </div>
            </div>
            <div className='happy-snap-desktop-description-container'>
                <Image src={mainLogo} alt='desktop logo' className='happy-snap-desktop-logo' />
                <h3>GO Snap Happy</h3>
                <p>
                      At GO Rentals, we love being a part of your travel journey and helping you make wonderful memories.
                      Snap a picture of your travels around New Zealand, and be in to win up to $500 of the cost of your rental back.
                </p>
                  <SecondaryButton
                      secondaryButtonClass={'secondary-prop-class'}
                      width={'157px'}
                      height={'44px'}
                      secondaryBgColor={'transparent'}
                      secondaryBorder={'2px solid var(--primary-color)'}
                      textColor={'var(--primary-color)'}
                      fontSize={'var(--font-body-lg)'}
                      lineHeight={'var(--line-height-body)'}
                      fontWeight={'var(--font-weight-body)'}
                      secondaryText={'Find out more'}
                  />
            </div>
        </div>
    </>
  )
}

export default HappySnapGallery