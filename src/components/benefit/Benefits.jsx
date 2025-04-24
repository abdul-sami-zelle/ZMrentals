import React from 'react'
import './Benefits.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

const Benefits = () => {
  const benefitsDetails = [
    { title: 'New Zealand Tourism Awards winners. Visitor Experience' },
    { title: 'Most Satisfied Customers Award. Canstar Blue 2018, 2020, 2022 & 2023' },
    { title: 'Huge choice of great rental cars to choose from' },
    { title: 'Highly recommended on major review sites' },
    { title: 'Competitive and affordable car hire rates' },
    { title: 'Convenient airport locations', link: '#' },
    { title: 'The car you book is the car you drive' },
    { title: '24hr AA Roadside Assistance' },
    { title: 'Unlimited kilometres' },
    { title: 'FREE Basic car rental insurance' },
    { title: 'FREE maps and guides' },
    { title: 'Kiwi-owned and operated for over 25 years' },
    { title: 'After-hours support', link: '#' },
    { title: 'Local knowledge' },
    { title: 'Ability to offset carbon emissions of your trip' },
    { title: 'Environmentally conscious business committed to carbon neutrality' },
  ]
  return (
    <div className='benefits-main-container'>
      <h3 className='section-main-heading'>Reasons to ZM with us</h3>
      <div className='benefits-options-main-container'>
        {benefitsDetails.map((item, index) => (
          <React.Fragment key={index}>
            <div className='benefits-option-container' key={index}>
              <MdKeyboardDoubleArrowRight size={20} />
              {item.link ? (<Link href={item.link}>{item.title}</Link>) : (<p>{item.title}</p>)}
            </div>
            {(index % 2 === 1) && <div className='benefits-empty-column'></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Benefits