import React, { useEffect } from 'react'
import './CarDetailsModal.css'
import { IoClose } from "react-icons/io5";
import mainImage from '../../assets/images/cars/images.jpg';
import imageTwo from '../../assets/images/cars/images (1).jpg';
import imageThree from '../../assets/images/cars/download.jpg';
import imageFour from '../../assets/images/cars/download (1).jpg';
import imageFive from '../../assets/images/cars/download (2).jpg';
import imageSix from '../../assets/images/cars/download (3).jpg';
import imageSeven from '../../assets/images/cars/download (4).jpg';
import Image from 'next/image';
import { TbAirConditioning } from "react-icons/tb";
import { FaBluetoothB } from "react-icons/fa6";
import { FaOilCan } from 'react-icons/fa';
import { FaCar, FaTachometerAlt } from 'react-icons/fa';
import { FaGasPump } from 'react-icons/fa';

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { WiTime3 } from "react-icons/wi";
import { TbLuggage } from "react-icons/tb";
import { PiEngine } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdLuggage } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';

const CarDetailsModal = ({ showModal, handleClose, vehicleDetails }) => {

    const url = `https://zm.skyhub.pk`
    const { searchedVehicles } = useSearchVehicle()
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])



    const isNullOrNA = (val) =>
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim().toLowerCase() === 'n/a');

    const spacificationData = [
        {
            title: vehicleDetails?.details?.air_conditioned === true ? 'Yes' : 'No',
            icon: TbAirConditioning,
            is_null: false
        },
        {
            title: `${vehicleDetails?.details?.car_sample_cc} CC`,
            icon: PiEngine,
            is_null: isNullOrNA(vehicleDetails?.details?.car_sample_cc)
        },
        {
            title: vehicleDetails?.details?.engine,
            icon: PiEngine,
            is_null: isNullOrNA(vehicleDetails?.details?.engine)
        },
        {
            title: vehicleDetails?.details?.fuel_type,
            icon: BsFillFuelPumpFill,
            is_null: isNullOrNA(vehicleDetails?.details?.fuel_type)
        },
        {
            title: vehicleDetails?.details?.is_bluetooth_capable === true ? 'Yes' : 'No',
            icon: FaBluetoothB,
            is_null: false
        },
        {
            title: `${vehicleDetails?.details?.litre_per_100_km}L / 100km`,
            icon: IoSpeedometerOutline,
            is_null: isNullOrNA(vehicleDetails?.details?.litre_per_100_km)
        },
        {
            title: vehicleDetails?.details?.model,
            icon: FaCar,
            is_null: isNullOrNA(vehicleDetails?.details?.model)
        },
        {
            title: `${vehicleDetails?.details?.passenger_capacity} Seats`,
            icon: FaUser,
            is_null: isNullOrNA(vehicleDetails?.details?.passenger_capacity)
        },
        {
            title: `${vehicleDetails?.details?.tank_capacity} Liters`,
            icon: FaGasPump,
            is_null: isNullOrNA(vehicleDetails?.details?.tank_capacity)
        },
        {
            title: `${vehicleDetails?.details?.trunk_capacity} Begs`,
            icon: MdLuggage,
            is_null: isNullOrNA(vehicleDetails?.details?.trunk_capacity)
        },
        {
            title: vehicleDetails?.details?.transmission,
            icon: BsFillGearFill,
            is_null: isNullOrNA(vehicleDetails?.details?.transmission)
        },
    ]

    return (
        <div className={`car-detail-modal-main-container ${showModal ? 'show-details-modal' : ''} `} onClick={handleClose}>
            <div className={`car-details-modal-inner-content-container ${showModal ? 'show-inner-modal-on-mobile-view' : ''}`}>
                <div className='car-detail-heading-and-close-section' onClick={() => e.stopPropagation()}>
                    <h3>Small Cars</h3>
                    <button onClick={(e) => { e.stopPropagation(); handleClose() }}>
                        <IoClose size={30} color='#595959' />
                    </button>
                </div>
                <div className='car-details--image-slide'>
                    {vehicleDetails?.images?.length > 0 && vehicleDetails.images.map((item, index) => (
                        <Image key={index} src={url + item.image_url} width={250} height={250} alt='car' />
                    ))}
                </div>
                <div className='single-car-every-details-container'>
                    <div className='car-spacifications'>
                        {spacificationData.map((item, index) => (
                            <div className={`car-single-spacification ${item.is_null === true ? 'hide-details-item' : ''}`} key={index}>
                                <item.icon size={20} color='var(--primary-color)' />
                                <h3>{item.title}</h3>
                            </div>
                        ))}


                    </div>
                    <div className='car-features'>
                        {vehicleDetails?.features?.length > 0 && vehicleDetails.features.map((item, index) => (
                            <span key={index}>
                                <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                                {item.name}
                            </span>
                        ))}

                    </div>
                </div>
                <div className='car-detail-modal-enquiry-section'>
                    <span>
                        <FaRegEnvelope size={20} color='var(--primary-color)' />
                        Email Enquiry
                    </span>

                    <span>
                        Enter your itinerary to show price
                        <BsArrowRight size={20} color='var(--primary-color)' />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CarDetailsModal