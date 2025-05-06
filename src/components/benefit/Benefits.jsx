import React from 'react'
import './Benefits.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

const Benefits = () => {
  const benefitsDetails = [
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Unlimited Freedom:</strong> Explore Auckland without limits, thanks to our unlimited kilometers.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>24/7 Peace of Mind:</strong> Drive confidently with round-the-clock roadside assistance, always there when you need it.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Prime Location:</strong> Conveniently located just minutes from the airport for easy pick-up and drop-off.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Always Here for You:</strong> Our customer support team is available 24/7, ready to assist with anything you need.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>No Hidden Surprises:</strong> Our transparent car rental process means no hidden fees, just honest pricing.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Tailored for You:</strong> Personalize your Auckland car hire experience with flexible rental plans designed to fit your needs.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Affordable Quality:</strong> Get the best budget deals without compromising on comfort, safety, or quality.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Comfort and Safety:</strong> Enjoy a smooth ride in our well-maintained, air-conditioned vehicles, built for your comfort.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Navigate with Ease:</strong> Find your way effortlessly with the integrated GPS, guiding you through Auckland.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Stay Connected:</strong> With Bluetooth and USB ports, keeping your devices charged and connected is easy.</>) },
    { title: (<> <strong style={{color: 'var(--primary-color)'}}>Choose Your Coverage:</strong> Select from basic or premium insurance plans to suit your peace of mind.</>) },
  ]
  return (
    <div className='benefits-main-container'>
      <h3 className='section-main-heading'>Why Partner with ZM Rentals</h3>
      <div className='benefits-options-main-container'>
        {benefitsDetails.map((item, index) => (
          <React.Fragment key={index}>
            <div className='benefits-option-container' key={index}>
              <MdKeyboardDoubleArrowRight className='benifit-option-icon'/>
              {item.link ? (<Link href={item.link}>{item.title}</Link>) : (<p>{item.title}</p>)}
            </div>
            {/* {(index % 2 === 1) && <div className='benefits-empty-column'></div>} */}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Benefits