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

const BookNowClient = () => {

  const searchParam = useSearchParams();
  const router = useRouter();
  const step = parseInt(searchParam.get('step')) || 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  useEffect(() => {
    if(!step) {
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

  
  const handleBookNow = () => {

    if (selectedTabIndex < 3) {
      goToNewStep(selectedTabIndex + 1);
    }
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

              {selectedTabIndex === 0 ? <InsuranceType />
                : selectedTabIndex === 1 ? <Extras />
                  : selectedTabIndex === 2 ? <HirerDetails />
                    : <Payments />}

              <button className='payment-continue-button' onClick={() => handleBookNow()}>{selectedTabIndex > 2 ? 'Complete Booking' : 'Continue'}</button>

            </div>

            <div className={`booking-summary-main-container`}>
              <h3>Booking Summary</h3>
              <div className='booking-summary-details-container'>
                  <div className='pick-drop-detail-section'>
                    <div className='pick-up-section'>
                      <h3>Pick-up</h3>
                      <h3>Auckland City</h3>
                      <p>25 Apr 2025</p>
                      <p className='pick-drop-time'>02: 30 PM</p>
                      <p className='edit-enquiry'>Edit Enquiry</p>
                    </div>
                    <div className='drop-off-section'>
                      <h3>Drop-off</h3>
                      <h3>Auckland City</h3>
                      <p>25 Apr 2025</p>
                      <p>02: 30 PM</p>
                    </div>
                  </div>
                  <div className='vehicle-details-section'>
                    <div className='vehicle-details'>
                      <h3>Mitsubishi Outlander</h3>
                      <p>$104/day x 1 day</p>
                      <span>$104</span>
                      <p>Change Vehicle</p>
                    </div>
                    <div className='vehicle-image-container'>
                      <Image src={'/assets/images/cars/small_cars_menu_Tablet.jpg'} alt='vehicle image' width={192} height={96} className='vehicle-image' />
                    </div>
                  </div>
                  <div className='booking-prices-details-section'>
                    <span>
                      <p>Basic Insurance</p>
                      <h3>Free</h3>
                    </span>

                    <span>
                      <p>One Way Fee</p>
                      <h3>$150</h3>
                    </span>

                    <span>
                      <p>Tota Road Care <FaQuestionCircle size={15} color='var(--primary-color)' className='booking-price-que' /></p>
                      <h3>$3</h3>
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
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookNowClient