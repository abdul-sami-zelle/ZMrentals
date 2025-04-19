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

const CarDetailsModal = ({showModal, handleClose}) => {
    useEffect(() => {
        if(showModal) {
            document.body.style.overflow = 'hidden';
        }else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    const imagesGallery = [
        mainImage,
        imageTwo,
        imageThree,
        imageFour,
        imageFive,
        imageSix,
        imageSeven
    ]

    const spacificationData = [
        {title: '1 Years old', icon: WiTime3},
        {title: '3 Large Bags', icon: TbLuggage},
        {title: '2500 cc engine', icon: PiEngine},
        {title: 'Petrol Hybrid', icon: BsFillFuelPumpFill},
        {title: '5 Deats', icon: FaUser},
        {title: '4 Small bags', icon: MdLuggage},
        {title: 'Automatic', icon: BsFillGearFill},
        {title: '5.3L/100KM', icon: IoSpeedometerOutline},
    ]

  return (
    <div className={`car-detail-modal-main-container ${showModal ? 'show-details-modal' : ''} `} onClick={handleClose}>
        <div className={`car-details-modal-inner-content-container ${showModal ? 'show-inner-modal-on-mobile-view' : ''}`}>
            <div className='car-detail-heading-and-close-section' onClick={() => e.stopPropagation()}>
                <h3>Small Cars</h3>
                <button onClick={(e) => {e.stopPropagation(); handleClose()}}>
                    <IoClose size={30} color='#595959' />
                </button>
            </div>
            <div className='car-details--image-slide'>
                {imagesGallery.map((item, index) => (
                    <Image key={index} src={item} alt='car' />
                ))}
            </div>
            <div className='single-car-every-details-container'>
                <div className='car-spacifications'>
                    {spacificationData.map((item ,index) => (
                        <div className='car-single-spacification' key={index}>
                            <item.icon size={20} color='var(--primary-color)' />
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
                <div className='car-features'>
                    <span>
                        <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                        All Wheel Drive
                    </span>

                    <span>
                        <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                        Reversing Camera
                    </span>

                    <span>
                        <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                        5 Star ANCAP Safety Rating
                    </span>

                    <span>
                        <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                        Cruise Control
                    </span>

                    <span>
                        <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                        Parking Sensors
                    </span>
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