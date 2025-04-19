import React from 'react'
import './VehicleCard.css';
import Image from 'next/image';
import { BsFillFuelPumpFill, BsFillGearFill } from "react-icons/bs";

const VehicleCard = (
  { 
    vehicleImage, 
    vehicleName, 
    vehicleAge, 
    seePrice, 
    transmission, 
    fuelType,
    handleModalOpen
  }) => {

  return (
    <div className='vehicle-card-main-container' onClick={handleModalOpen}>
        <div className='vehicle-card-image-container'>
          <Image src={vehicleImage} alt='small car' width={315} height={160} />
        </div>
        <div className='vehicle-details-container'>
            <div className='vehicle-name-and-price'>
                <span>
                  <h3>{vehicleName}</h3>
                  <p>{vehicleAge}</p>
                </span>
                <h3 className='vehicle-price-heading'>{seePrice}</h3>
            </div>
            <div className='vehicle-type'>
              <div className='vehicle-fuel-type-and-gear-container'>
                <span>
                  <BsFillGearFill size={20} color='var(--primary-color)' />
                  {transmission}
                </span>

                <span>
                  <BsFillFuelPumpFill size={20} color='var(--primary-color)' />
                  {fuelType}
                </span>
              </div>

              <p className='vehicle-type-info'>+info</p>
            </div>
        </div>
    </div>
  )
}

export default VehicleCard