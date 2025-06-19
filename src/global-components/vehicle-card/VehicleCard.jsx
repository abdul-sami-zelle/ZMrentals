import React from 'react'
import './VehicleCard.css';
import Image from 'next/image';
import { BsFillFuelPumpFill, BsFillGearFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useBookingContext } from '@/context/bookingContext/bookingContext';

const VehicleCard = (
  { 
    vehicleImage, 
    vehicleName, 
    vehicleAge, 
    seePrice, 
    transmission, 
    fuelType,
    handleModalOpen,
    vehicleId
  }) => {

    const router = useRouter();
    const {setBookingVehicleData} = useBookingContext()
    const handleBookVehicle = async (e) => {
      e.stopPropagation()
      const api = `https://zm.skyhub.pk/cars/get/${vehicleId}`;

      try {
        const response = await axios.get(api)
        if(response.status === 200) {
          setBookingVehicleData(response.data)
          router.push('/book-now')
          console.log("booking response", response)

        }
      } catch (error) {
        console.log("UnExpected Server Error", error);
      }
    }

  return (
    <div className='vehicle-card-main-container'>
        <div className='vehicle-card-image-container'>
          <Image src={vehicleImage} alt='small car' width={315} height={160} />
        </div>
        <div className='vehicle-details-container'>
            <div className='vehicle-name-and-price'>
                <span>
                  <h3>{vehicleName}</h3>
                  <p>{vehicleAge} Year Old</p>
                </span>
                <div className='price-and-book-now'>
                  <h3 className='vehicle-price-heading'>{seePrice}</h3>
                  <button className='booking-button' onClick={handleBookVehicle}>Book Now</button>
                </div>
            </div>
            <div className='vehicle-type' onClick={handleModalOpen}>
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