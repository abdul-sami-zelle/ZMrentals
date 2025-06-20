import React, { useEffect, useState } from 'react'
import './CarDetails.css';
import Link from 'next/link';
import VehicleCard from '../../global-components/vehicle-card/VehicleCard'
import CarDetailsModal from '@/modals/car-details-modal/CarDetailsModal';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import CardShimmer from './CardShimmer'



const CarDetails = ({ data, openModal }) => {

  const { searchedVehicles } = useSearchVehicle()
  const url = `https://zm.skyhub.pk`


  const [modalData, setModalData] = useState([])
  const [showDetalModal, setShowDetailModal] = useState(false);
  const handleOpenDetailsModal = (item) => {

    setShowDetailModal(true);
    setModalData(item)
  }
  const handleCloseModal = () => {
    setShowDetailModal(false)
  }

  useEffect(() => {
    if (showDetalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showDetalModal])

  const getAgeFromYear = (birthYear) => {
    const currentYear = new Date().getFullYear();
    if (!birthYear || isNaN(birthYear) || birthYear > currentYear) {
      return "Invalid year";
    }
    return currentYear - birthYear;
  };

  return (
    <div className='car-details-main-container' onClick={openModal}>
      <h3 className='section-main-heading'>{data.heading}</h3>
      <div className='car-details-description-and-all-vehicles-link-container'>
        {/* <p>{data.description}</p> */}
        <Link href={'/'} className='global-heading-style'>{`Our Fleet`}</Link>
      </div>
      <div className='cars-cars-container'>
        {searchedVehicles.length !== 0 ? (
          searchedVehicles.map((car, carIndex) => (
          <VehicleCard
            key={carIndex}
            vehicleId={car.car_id}
            vehicleImage={url + car.image}
            vehicleName={car.name}
            vehicleAge={getAgeFromYear(car.details.model)}
            seePrice={'See Price'}
            transmission={car.transmission}
            fuelType={car.fuelType}
            handleModalOpen={() => handleOpenDetailsModal(car)}
          />
        ))
        ) : (
            Array.from({length: 4}).map((_, index) => (
              <CardShimmer key={index} />
            ))
        )}
        
      </div>

      <div className='vehicle-page-cars-details'>
        <p className='global-content-style'>{data.description}</p>
      </div>

      <CarDetailsModal
        showModal={showDetalModal}
        handleClose={handleCloseModal}
        vehicleDetails={modalData}
      />

    </div>
  )
}

export default CarDetails