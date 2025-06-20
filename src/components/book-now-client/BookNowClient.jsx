'use client'
import React, { Suspense, useEffect, useState } from 'react';
import './BookNowClient.css';
import InsuranceType from '../../components/book-now-components/InsuranceType/InsuranceType'
import Extras from '../../components/book-now-components/extras/Extras'
import HirerDetails from '../../components/book-now-components/hirer-details/HirerDetails'
import Payments from '../../components/book-now-components/payments/Payments'
import Image from 'next/image';
import { FaQuestionCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import CarDateNotAvailable from '../../modals/CarDateNotAvailable/CarDateNotAvailable'
import axios from 'axios';

const BookNowClient = () => {
  const url = `https://zm.skyhub.pk`
  const { bookingVehicleData, bookingPayload } = useBookingContext()
  const searchParam = useSearchParams();
  const router = useRouter();
  const step = parseInt(searchParam.get('step')) || 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [insuranceSeleted, setInsuranceSelected] = useState({})
  const [packageSelected, setPackageSelected] = useState(bookingVehicleData && bookingVehicleData?.insurance[0]?.insurance_option_id);

  

  useEffect(() => {
    if (!step) {
      router.replace(`/book-now?step=1`)
    } else {
      setSelectedTabIndex(step - 1);
    }
  }, [step, searchParam, router]);

  const goToNewStep = (newIndex) => {
    setSelectedTabIndex(newIndex)
    const param = new URLSearchParams(searchParam.toString());
    param.set('step', (newIndex + 1).toString());
    router.push(`/book-now?${param.toString()}`)
  }
  const handleCompleteBooking = async () => {
    const api = `https://zm.skyhub.pk/booking/add-booking`;

    try {
      const response = await axios.post(api, bookingPayload);
      if(response.status === 200) {
        console.log("complete booking response", response)
      } else {
        console.log("else part")
        setShowAvailableModal(true)
      }
      
    } catch (error) {
      console.log("UnExpected Error", error);
      if(error.response.data.error === "Car already booked for selected time/location.") {
        setShowAvailableModal(true)
      }
    }
  }

  const [pickDropLocation, setPickDropLocation] = useState({});
  useEffect(() => {
    const pickDrop = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setPickDropLocation(pickDrop)
  }, [])

  const formatDateInNZ = (isoString) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date)) throw new Error('Invalid date');

      return new Intl.DateTimeFormat('en-NZ', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'Pacific/Auckland'
      }).format(date);
    } catch (err) {
      return 'Invalid Date';
    }
  };


  const formatTimeInNZ = (isoString) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date)) throw new Error('Invalid date');

      return new Intl.DateTimeFormat('en-NZ', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Pacific/Auckland'
      })
        .format(date)
        .replace(/^(\d):/, '0$1')  // pad hour if needed
        .replace(':', ': ');       // format to `HH: MM AM/PM`
    } catch (err) {
      return 'Invalid Time';
    }
  };


  const handleBookNow = () => {

    if (selectedTabIndex < 3) {
      goToNewStep(selectedTabIndex + 1);
    } else {
      handleCompleteBooking()
    }
  }

  const [showCarAvailableModal, setShowAvailableModal] = useState(false);
  const handleCloseCarNotAvailableModal = () => {
    setShowAvailableModal(false)
  }



  return (
    <div className="book-now-page-main-container">
      <div className="book-now-inner-section">
        <div className="book-now-max-width-container">

          <div className='book-now-main-container'>

            <div className='booking-steps-main-container'>

              <div className='insurance-type-head'>
                <span>
                  {
                    selectedTabIndex === 1 ? `${selectedTabIndex + 1}. Choose Insurance`
                      : selectedTabIndex === 2 ? `${selectedTabIndex + 1}. Extras`
                        : selectedTabIndex === 3 ? `${selectedTabIndex + 1}. Hirer Details`
                          : `${selectedTabIndex + 1}. Payments`
                  }
                </span>
                <div className='insurance-tab-number'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <p
                      key={index}
                      className={`booking-tabs-numbers ${selectedTabIndex === index ? 'booking-selected-tab' : ''}`}
                      onClick={() => {
                        if (index < selectedTabIndex) {
                          setSelectedTabIndex(index);
                          goToNewStep(index)
                        }
                      }}
                    >
                      {index + 1}
                    </p>
                  ))}
                </div>
              </div>

              {selectedTabIndex === 0 ? <InsuranceType insurances={bookingVehicleData.insurance} setInsuranceSelected={setInsuranceSelected} packageSelected={packageSelected} setPackageSelected={setPackageSelected} />
                : selectedTabIndex === 1 ? <Extras extras={bookingVehicleData.extras} />
                  : selectedTabIndex === 2 ? <HirerDetails />
                    : <Payments />}

              <button className='payment-continue-button' onClick={() => handleBookNow()}>{selectedTabIndex > 2 ? 'Complete Booking' : 'Continue'}</button>

            </div>
          
          {bookingVehicleData ? (
            <div className={`booking-summary-main-container`}>
              <h3>Booking Summary</h3>
              <div className='booking-summary-details-container'>
                <div className='pick-drop-detail-section'>
                  <div className='pick-up-section'>
                    <h3>Pick-up</h3>
                    <h3>Auckland City</h3>
                    <p>{formatDateInNZ(pickDropLocation.pickup_time)}</p>
                    <p className='pick-drop-time'>{formatTimeInNZ(pickDropLocation.pickup_time)}</p>
                    <p className='edit-enquiry'>Edit Enquiry</p>
                  </div>
                  <div className='drop-off-section'>
                    <h3>Drop-off</h3>
                    <h3>Auckland City</h3>
                    <p>{formatDateInNZ(pickDropLocation.drop_time)}</p>
                    <p>{formatTimeInNZ(pickDropLocation.drop_time)}</p>
                  </div>
                </div>
                <div className='vehicle-details-section'>
                  <div className='vehicle-details'>
                    <h3>{bookingVehicleData.name}</h3>
                    <p>${bookingVehicleData.base_rate}/day x 1 day</p>
                    <span>${bookingVehicleData.base_rate}</span>
                    <p>Change Vehicle</p>
                  </div>
                  <div className='vehicle-image-container'>
                    <Image src={url + bookingVehicleData.image} alt='vehicle image' width={192} height={96} className='vehicle-image' />
                  </div>
                </div>
                <div className='booking-prices-details-section'>
                  <span>
                    <p>Basic Insurance</p>
                    <h3>{Object.keys(insuranceSeleted).length > 0 ? insuranceSeleted.name : '---'}</h3>
                  </span>

                  <span>
                    <p>One Way Fee</p>
                    <h3>$0</h3>
                  </span>

                  <span>
                    <p>Tota Road Care <FaQuestionCircle size={15} color='var(--primary-color)' className='booking-price-que' /></p>
                    <h3>$0</h3>
                  </span>
                </div>
                <div className='grand-total-section'>
                  <p>Grand Total</p>
                  <h3>$257</h3>
                </div>
                <div className='queries-section'>
                  <span>
                    <FaEnvelope size={15} color='var(--primary-color)' />
                    <p>Email Enquiry</p>
                  </span>
                  <span>
                    <CgFileDocument size={15} color='var(--primary-color)' />
                    <p>Save Quote</p>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className='booking-vehicle-detailsshimmer'></div>
          )}
            

          </div>

        </div>
      </div>

      <CarDateNotAvailable 
        showModal={showCarAvailableModal}
        handleCloseModal={handleCloseCarNotAvailableModal}
      />
    </div>
  )
}

export default BookNowClient