import React from 'react'
import './Locations.css';
import { TfiLocationPin } from "react-icons/tfi";
import Link from 'next/link';

const Locations = () => {
  const locationsData = [
    { branchName: 'Auckland City', link: '#'},
    { branchName: 'Auckland Airport', link: '#'},
    { branchName: 'Waiheke Island', link: '#'},
    { branchName: 'Wellington Airport', link: '#'},
    { branchName: 'Nelson Airport', link: '#'},
    { branchName: 'Christchurch Airport', link: '#'},
    { branchName: 'Queenstown Airport', link: '#'},
    { branchName: 'Dunedin Airport', link: '#'},
    { branchName: 'Invercargill Airport', link: '#'},
  ]
  return (
    <div className='location-outer-main-container'>
      <div className='locations-main-container'>
        <div className='nz-map-locations'>
          <span>
            <TfiLocationPin size={40} color='var(--primary-color)' />
            Nelson Airport
          </span>
        </div>
        <div className='locations-details-container'>
          <h3>ZM all across NZ</h3>
          <p>
            We have nine car rental branches spread evenly throughout New Zealand, in the major destinations of Auckland,
            Wellington, Christchurch, Nelson, Queenstown, Dunedin and Invercargill so that you’re never far from a ZM rental car.
          </p>
          <div  className='locations-list-main-container'>
            {locationsData.map((item, index) => (
              <Link key={index} href={item.link}>
                <TfiLocationPin size={30} color='var(--primary-color)' />
                {item.branchName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Locations