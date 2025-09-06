import React, { use, useEffect, useState } from 'react'
import './VehicleCard.css';
import Image from 'next/image';
import { BsFillFuelPumpFill, BsFillGearFill } from "react-icons/bs";
import { FaDroplet } from "react-icons/fa6";
import { handleScrolllTop } from '../../utils/midlewares'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import Toust from '@/modals/Toust/Toust';

const VehicleCard = (
  {
    vehicleImage,
    vehicleName,
    vehicleAge,
    seePrice,
    transmission,
    fuelType,
    handleModalOpen,
    vehicleId,
    vehicleData
  }) => {

  console.log("vehicle data", vehicleData)

  const { searchVehiclePayload, setSearchVehiclePayload } = useSearchVehicle()
  const [toustShow, setTOustShow] = useState(false)
  const [toustMessage, setToustMessage] = useState('');

  const router = useRouter();
  const { setBookingVehicleData } = useBookingContext()

  const { isVehicleSearched } = useSearchVehicle()


  const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;
  const [showBookingButton, setShowBookingButton] = useState(false);
  useEffect(() => {
    if (pickup_location && drop_location && pickup_time && drop_time) {
      setShowBookingButton(true);
    } else {
      setShowBookingButton(false);
    }
  }, [])

  const handleBookVehicle = async (e) => {
    e.stopPropagation();
    const api = `https://zm.skyhub.pk/cars/get/${vehicleId}`;

    try {

      const response = await axios.get(api);
      if (response.status === 200) {
        setShowBookingButton(true);
        setBookingVehicleData(response.data);
        sessionStorage.setItem('vehicle-details', JSON.stringify(response.data));
        router.push('/book-now');
      } else {
        setShowBookingButton(false);
      }
    } catch (error) {
      console.error("Validation or Server Error:", error.message);
      setShowBookingButton(false);
      return;
    }
  };

  const [bookingDays, setBookingDays] = useState({})

  useEffect(() => {
    const bookingDetails = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setBookingDays(bookingDetails)
  }, [])

  function countDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Convert both to UTC midnight (ignore local timezone)
    const utcStart = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    const utcEnd = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

    // Difference in days
    const diffDays = Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));

    // Always include the start day
    return diffDays + 1;
  }

  return (
    <div className='vehicle-card-main-container' onClick={handleModalOpen}>
      <div className='vehicle-card-image-container'>
        <Image src={vehicleImage} alt='small car' width={315} height={160} />
      </div>
      <div className='vehicle-details-container'>
        <div className='vehicle-name-and-price'>
          <span>
            <h3>{vehicleName}</h3>
            <div className='vehicle-age-and-fuel-efficiency-container'>
              <p>{vehicleAge} Year Old</p>
              <Image src={'/assets/icons/fuel-efficiency-4-stars.png'} width={100} height={30} alt='img' />
            </div>
          </span>
          <div className='price-and-book-now'>
            {isVehicleSearched ? (
              <div className='price-and-book-now-ammount'>
                <span> <h3>${vehicleData.base_rate}</h3> <p>NZD/Day</p> </span>
                <span> <h3>${vehicleData.base_rate * countDays(bookingDays.pickup_time, bookingDays.drop_time)}</h3> <p>Total</p> </span>
              </div>
            ) : (
              <h3 className='vehicle-price-heading' onClick={(e) => { e.stopPropagation(); handleScrolllTop() }}>{seePrice}</h3>
            )}
            {/* <button className={`booking-button`} onClick={handleBookVehicle}>Book Now</button> */}
            <button className={`booking-button ${showBookingButton ? 'show-booking-button' : ''}`} onClick={handleBookVehicle}>Book Now</button>
          </div>
        </div>
        <div className='vehicle-type' >
          <div className='vehicle-fuel-type-and-gear-container'>
            <span>
              <BsFillGearFill size={20} color='var(--primary-color)' />
              {transmission}
            </span>

            <span>
              <FaDroplet size={20} color='var(--primary-color)' />
              {fuelType}
            </span>
          </div>

          <p className='vehicle-type-info'>+info</p>
        </div>
      </div>
      <Toust
        showToust={toustShow}
        setShowToust={setTOustShow}
        message={toustMessage}
      />
    </div>
  )
}

export default VehicleCard