import React from 'react'
import './RoadCare.css'
import SecondaryButton from '../../global-components/secondary-button/SecondaryButton'
import { SiVlcmediaplayer } from "react-icons/si";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { LuCircleDollarSign } from "react-icons/lu";

const RoadCare = () => {
    const roadCAreData = [
        {
            icon: SiVlcmediaplayer,
            title: 'Roadside Assistance',
            para: `Complimentary callout service for ALL types of breakdowns.`
        },
        {
            icon: LuCircleDollarSign,
            title: 'Government Road Taxes',
            para: `Covers registration costs, safety inspections and road user charges.`
        },
        {
            icon: TbCurrencyDollarOff,
            title: 'Toll Road Freedom',
            para: `Enjoy free passage on all toll roads, we cover all costs including admin fees.`
        },

    ]
  return (
    <div className='road-care-main-container'>
        <div className='road-care-inner-container'>
            <h3>Total Road Care</h3>
            <p>A comprehensive $3 per day fee ensures your journey is simple and stress-free, <br /> we include the following services:</p>
            <div className='road-care-cards-container'>
                {roadCAreData.map((item, index) => {
                    let Icon = item.icon
                    return (
                        <div className='road-care-single-item' key={index}>
                            <Icon size={30} color='var(--primary-color)' />
                            <h3>{item.title}</h3>
                            <p>{item.para}</p>
                        </div>
                    )
                })}
            </div>
            <p className='road-care-litle-details'>With Total Road Care, we handle all the essentials so you can focus on the adventure ahead.</p>
            <SecondaryButton
                  secondaryButtonClass={'secondary-prop-class'}
                  width={'220px'}
                  height={'44px'}
                  secondaryBgColor={'#fff'}
                  secondaryBorder={'2px solid var(--primary-color)'}
                  textColor={'var(--primary-color)'}
                  fontSize={'var(--font-body-lg)'}
                  lineHeight={'var(--line-height-body)'}
                  fontWeight={'var(--font-weight-bold)'}
                  secondaryText={'Terms and Conditions'}
                  display={'flex'}
              />
        </div>
    </div>
  )
}

export default RoadCare