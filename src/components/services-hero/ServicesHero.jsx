import React from 'react'
import './ServicesHero.css'
import servicesHeroBg from '../../assets/images/mix/About_Hero_Desktop_Wide.webp'
import Image from 'next/image'
import PrimaryButton from '@/global-components/primary-button/PrimaryButton'
import { GoArrowRight } from "react-icons/go";

const ServicesHero = ({heading, paraOne, paraTwo, buttonText}) => {
  return (
    <div className='services-hero-main-container'>
        <div className='services-hero-inner-content-container'>
            <Image src={servicesHeroBg} alt='hero bg' className='services-hero-bg-image' />
            <div className='services-hero-container-outer-container'>
                <div className='services-hero-detail-container'>
                    <h3>{heading}</h3>
                    <span>
                        <p>{paraOne}</p>
                        <p>{paraTwo}</p>
                    </span>

                    <PrimaryButton
                        primaryMainClass={'primary-button-main-class'}
                        primaryText={buttonText}
                        primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                        width={'max-content'}
                        height={'52px'}
                        gap={'20px'}
                        padding={'5px 15px'}
                        fontSize={'var(--font-body-lg)'}
                        lineHeight={'var(--line-height-body)'}
                        fontWeight={'var(--font-weight-bold)'}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServicesHero