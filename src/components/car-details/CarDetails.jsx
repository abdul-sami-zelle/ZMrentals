import React, { useEffect, useState } from 'react'
import './CarDetails.css';
import Link from 'next/link';
import VehicleCard from '../../global-components/vehicle-card/VehicleCard'
import CarDetailsModal from '@/modals/car-details-modal/CarDetailsModal';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';



const CarDetails = ({ data, openModal }) => {

  const { searchedVehicles } = useSearchVehicle()
  const url = `https://zm.skyhub.pk`

  console.log("searched vehicles on vehicle page from context", searchedVehicles)

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
        {searchedVehicles.map((car, carIndex) => (
          <VehicleCard
            key={carIndex}
            vehicleImage={url + car.image}
            vehicleName={car.name}
            vehicleAge={getAgeFromYear(car.details.model)}
            seePrice={'See Price'}
            transmission={car.transmission}
            fuelType={car.fuelType}
            handleModalOpen={() => handleOpenDetailsModal(car)}
          />
        ))}
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