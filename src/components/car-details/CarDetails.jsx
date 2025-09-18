import React, { useEffect, useState } from 'react'
import './CarDetails.css';
import Link from 'next/link';
import VehicleCard from '../../global-components/vehicle-card/VehicleCard'
import CarDetailsModal from '@/modals/car-details-modal/CarDetailsModal';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import CardShimmer from './CardShimmer'
import { usePathname } from 'next/navigation';
import EmailEnquiryModal from '../../modals/EmailEnquiryModal/EmailEnquiryModal'



const CarDetails = ({ data, openModal, showLength, maxWidth = '100%' }) => {

  const pathname = usePathname()


  const { searchedVehicles, isVehicleSearched, setIsVehicleSearched } = useSearchVehicle()
  const url = `https://zm.skyhub.pk`


  const [modalData, setModalData] = useState([])
  const [showDetalModal, setShowDetailModal] = useState(false);

  const [emailModal, setEmailModal] = useState(false);

  const handleOpenDetailsModal = (item) => {
    setShowDetailModal(true);
    setModalData(item)
  }
  const handleCloseModal = () => {
    setShowDetailModal(false)
  }

  const [modalType, setModalType] = useState('')
  const handleOpenEmailEnquiry = (type) => {
    setModalType(type)
    setEmailModal(true);
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

  const [isMobile, setIsMobile] = useState(false);

  console.log("searched vehilcle payload", searchedVehicles)

  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // mobile breakpoint
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='car-details-main-container' onClick={openModal} style={{ maxWidth: maxWidth }}>
      <h3 className={pathname === '/' ? 'main-page-section-heading' : 'section-main-heading'}>{data?.heading}</h3>
      <div className='car-details-description-and-all-vehicles-link-container' style={{ display: pathname === '/' ? 'none' : 'flex' }}>
        {/* <p>{data.description}</p> */}
        <Link href={'/'} className='global-heading-style'>{`Our Fleet`}</Link>
      </div>
      <div className='cars-cars-container'>
        {searchedVehicles.length !== 0 ? (
          searchedVehicles.slice(0, showLength).map((car, carIndex) => (
            <VehicleCard
              key={carIndex}
              vehicleData={car}
              vehicleId={car.car_id}
              vehicleImage={url + car.image}
              vehicleName={car.name}
              vehicleAge={getAgeFromYear(car.details.model)}
              seePrice={'See Price'}
              transmission={car.details.transmission}
              fuelType={car.details.fuel_type}
              handleModalOpen={() => handleOpenDetailsModal(car)}
            />
          ))
        ) : (
          Array.from({ length: isMobile ? 1 : 4 }).map((_, index) => (
            <CardShimmer key={index} />
          ))
        )}

      </div>

      <div className='vehicle-page-cars-details'>
        <p className='global-content-style'>{data?.description}</p>
      </div>

      <CarDetailsModal
        showModal={showDetalModal}
        handleClose={handleCloseModal}
        vehicleDetails={modalData}
        isVehicleSearched={isVehicleSearched}
        emailModal={handleOpenEmailEnquiry}
      />

      <EmailEnquiryModal
        showEmailEnquiry={emailModal}
        setShowEmailEnquiry={setEmailModal}
        carObj={modalData}
        modalType={modalType}

      />

    </div>
  )
}

export default CarDetails