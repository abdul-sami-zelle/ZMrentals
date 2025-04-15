import React from 'react'
import './CarDetails.css';
import Link from 'next/link';
import VehicleCard from '../../global-components/vehicle-card/VehicleCard'



const CarDetails = ({data, openModal}) => {
    return (
        <div className='car-details-main-container' onClick={openModal}>
            <h3>{data.heading}</h3>
            <div className='car-details-description-and-all-vehicles-link-container'>
                <p>{data.description}</p>
                <Link href={'/'}>{`View all ${data.viewAll} details`}</Link>
            </div>
            <div className='cars-cars-container'>
                {data.carsData.map((car, carIndex) => (
                    <VehicleCard
                    key={carIndex}
                    vehicleImage={car.image}
                    vehicleName={car.name}
                    vehicleAge={car.age}
                    seePrice={car.seePrice}
                    transmission={car.transmission}
                    fuelType={car.fuelType}
                />
                ) )}
            </div>

            
            
        </div>
    )
}

export default CarDetails