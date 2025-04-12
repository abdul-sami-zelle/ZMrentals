import React from 'react'
import './VehicleCard.css';
import Image from 'next/image';

const VehicleCard = ({ vehicleImage, vehicleName, vehicleAge, vehiclePriceProp, transmissionIcon, transmission, fuelTypeIcon, fuelType }) => {
  return (
    <div className='vehicle-card-main-container'>

      {/* <Image src={vehicleImage} alt='vehicle image' className='vehicle-card-image' /> */}
      <div>
        <div>
          <h3>{vehicleName}</h3>
          <p>{vehicleAge}</p>
          <hr />
          <h3>{vehiclePriceProp}</h3>
        </div>
        <div>
          <div>
            <span>
              {transmissionIcon}
              {transmission}
            </span>
            <span>
              {fuelTypeIcon}
              {fuelType}
            </span>
          </div>
          <h3>+info</h3>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard