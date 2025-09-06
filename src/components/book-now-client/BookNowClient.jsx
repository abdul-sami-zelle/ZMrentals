'use client'
import React, { useEffect, useState } from 'react';
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
import Toust from '@/modals/Toust/Toust';
import Link from 'next/link';
import EmailEnquiryModal from '@/modals/EmailEnquiryModal/EmailEnquiryModal';
import MainLoader from '@/loaders/MainLoader/MainLoader';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const BookNowClient = () => {
  const stripe = useStripe();
  const elements = useElements();
  const url = `https://zm.skyhub.pk`
  const { bookingVehicleData, bookingPayload, setBookingPayload, validateForm } = useBookingContext()
  const searchParam = useSearchParams();
  const router = useRouter();
  const step = parseInt(searchParam.get('step')) || 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [insuranceSeleted, setInsuranceSelected] = useState({})
  // const [packageSelected, setPackageSelected] = useState(bookingVehicleData && bookingVehicleData?.insurance[0]?.insurance_option_id);
  const [packageSelected, setPackageSelected] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const [toustShow, setTOustShow] = useState(false)
  const [toustMessage, setToustMessage] = useState('')

  const [selectPaymentType, setSelectPaymentType] = useState(0)

  function getTotalDays(pickupISO, dropISO) {
    const pickupDate = new Date(pickupISO);
    const dropDate = new Date(dropISO);

    // Convert both to date-only strings (UTC)
    const pickupStr = pickupDate.toISOString().split('T')[0];
    const dropStr = dropDate.toISOString().split('T')[0];

    // Convert back to Date objects (midnight UTC)
    const d1 = new Date(pickupStr);
    const d2 = new Date(dropStr);

    const diffMs = d2 - d1;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays === 0 ? 1 : diffDays;
  }


  useEffect(() => {
    if (!step) {
      router.replace(`/book-now?step=1`)
    } else {
      setSelectedTabIndex(step - 1);
    }
  }, [step, searchParam, router]);

  const isUserInfoFilled = () => {
    return Object.values(bookingPayload.user).every(value => value && value.trim() !== '');
  }

  const goToNewStep = (newIndex) => {
    setSelectedTabIndex(newIndex)
    const param = new URLSearchParams(searchParam.toString());
    param.set('step', (newIndex + 1).toString());
    router.push(`/book-now?${param.toString()}`)
  }

  const [submitBookingMessage, setSubmitBookingMessage] = useState({
    head: '',
    para: '',
    link: ''
  })

  const [isLoading, setISloading] = useState(false)
  const [paymentError, setPaymentError] = useState("");
  const handleCompleteBooking = async () => {
    const api = `https://zm.skyhub.pk/booking/add-booking`;

    try {
      setISloading(true)
      const response = await axios.post(api, bookingPayload);
      if (response.status === 201) {
        setISloading(false);
        setShowAvailableModal(true)
        setCloseType('success');
        setSubmitBookingMessage({
          head: 'Thank You For Booking',
          para: `We'll monitor your arrival to make sure we have your car ready on time`,
          link: 'Explore More Options'
        })

        setBookingPayload({
          booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
          },
          user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            country: "",
            how_find_us: "",
            travel_reason: "Leisure"
          }
        })

        sessionStorage.removeItem('pick_and_drop_details');



      } else {
        setISloading(false);
        setShowAvailableModal(true)
        setCloseType('reject');
        setSubmitBookingMessage({
          head: 'Selected Car Not Available',
          para: `Sorry The selected date is already taken`,
          link: 'Please Try Another Date'
        })
      }

    } catch (error) {
      setISloading(false);
      console.log("UnExpected Error", error);
      setShowAvailableModal(true)
      setCloseType('reject');
      setSubmitBookingMessage({
        head: 'Selected Car Not Available',
        para: `Sorry The selected date is already taken`,
        link: 'Please Try Another Date'
      })
    } finally { setISloading(false) }
  }

  // Handle Pay Now
const handlePayNowAndBook = async () => {
  try {
    setISloading(true);
    setPaymentError('');

    // 1️⃣ Create booking first
    const bookingResponse = await axios.post(
      `https://zm.skyhub.pk/booking/add-booking`,
      bookingPayload
    );

    if (bookingResponse.status !== 201) {
      setShowAvailableModal(true);
      setCloseType('reject');
      setSubmitBookingMessage({
        head: 'Selected Car Not Available',
        para: `Sorry, the selected date is already taken`,
        link: 'Please Try Another Date',
      });
      return;
    }

    console.log("Booking created successfully:", bookingResponse.data);

    // 2️⃣ Proceed with Stripe Payment
    if (!stripe || !elements) throw new Error("Stripe not initialized");

    const { data } = await axios.post(
      'https://zm.skyhub.pk/create-payment-intent',
      {
        amount: getGrandTotal() * 100, // convert to cents
        currency: 'NZD',
        booking_id: bookingResponse.data.booking_id, // send booking id
      }
    );

    const clientSecret = data.clientSecret;

    // 3️⃣ Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${bookingPayload.user.firstname || 'Guest'} ${bookingPayload.user.lastname || ''}`.trim(),
        },
      },
    });

    // 4️⃣ Handle payment result
    if (result.error) {
      setPaymentError(result.error.message);
      console.error("Payment error:", result.error.message);

      setShowAvailableModal(true);
      setCloseType('reject');
      setSubmitBookingMessage({
        head: 'Payment Failed',
        para: result.error.message,
        link: 'Try Again',
      });

    } else {
      const status = result.paymentIntent.status;

      if (status === 'succeeded') {
        // ✅ Payment successful
        setShowAvailableModal(true);
        setCloseType('success');
        setSubmitBookingMessage({
          head: 'Paid Successfully!',
          para: `Your Booking has been Confirmed. We'll monitor your arrival to make sure we have your car ready on time`,
          link: 'Explore More Options',
        });

        // Reset booking form
        setBookingPayload({
          booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
          },
          user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            country: "",
            how_find_us: "",
            travel_reason: "Leisure",
          },
        });

        sessionStorage.removeItem('pick_and_drop_details');

      } else if (status === 'requires_action' || status === 'requires_source_action') {
        // Handle 3D Secure
        const confirmResult = await stripe.confirmCardPayment(clientSecret);
        if (confirmResult.error) {
          setPaymentError(confirmResult.error.message);
          setShowAvailableModal(true);
          setCloseType('reject');
          setSubmitBookingMessage({
            head: 'Payment Failed',
            para: confirmResult.error.message,
            link: 'Try Again',
          });
        } else if (confirmResult.paymentIntent.status === 'succeeded') {
          setCloseType('success');
          setSubmitBookingMessage({
            head: 'Paid Successfully!',
            para: `Your Booking has been Confirmed. We'll monitor your arrival to make sure we have your car ready on time`,
            link: 'Explore More Options',
          });

          // Reset booking form
          setBookingPayload({
            booking: {
              car_id: null,
              pickup_location: "",
              drop_location: "",
              pickup_time: "",
              drop_time: "",
              extras: [],
              insurance_id: null,
            },
            user: {
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              country: "",
              how_find_us: "",
              travel_reason: "Leisure",
            },
          });

          sessionStorage.removeItem('pick_and_drop_details');
        }
      } else {
        // Other failure
        setPaymentError('Payment could not be completed.');
        setShowAvailableModal(true);
        setCloseType('reject');
        setSubmitBookingMessage({
          head: 'Payment Failed',
          para: 'Your payment could not be completed. Please try again.',
          link: 'Try Again',
        });
      }
    }

  } catch (error) {
    console.error("Error in booking/payment:", error);
    setPaymentError(error.message);

    setShowAvailableModal(true);
    setCloseType('reject');
    setSubmitBookingMessage({
      head: 'Something went wrong',
      para: `Please try again later`,
      link: 'Try Again',
    });

  } finally {
    setISloading(false);
  }
};



  const [pickDropLocation, setPickDropLocation] = useState({});
  const [totalDays, setTotalDays] = useState(0);
  useEffect(() => {

    const pickDrop = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setTotalDays(getTotalDays(pickDrop?.pickup_time, pickDrop?.drop_time))
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
      if (selectedTabIndex === 2 && !isUserInfoFilled()) {
        setTOustShow(true)
        setToustMessage("Please Fill All The Information")
      } else {
        goToNewStep(selectedTabIndex + 1);
      }
    } else {
      if (selectPaymentType === 0) {
        handleCompleteBooking()
      } else if (selectPaymentType === 1) {
        handlePayNowAndBook()
      } else {

      }

    }
  }

  const [showCarAvailableModal, setShowAvailableModal] = useState(false);
  const [closeType, setCloseType] = useState('')
  const handleCloseCarNotAvailableModal = () => {
    if (closeType === 'success') {
      setShowAvailableModal(false)
      router.push('/')
    } else {
      setShowAvailableModal(false)
    }
  }

  const getGrandTotal = () => {
    let total = 0;

    const safeDays = totalDays > 0 ? totalDays : 1;
    // Base Rate (vehicle)
    const baseRate = parseFloat(bookingVehicleData?.base_rate || 0);
    total += baseRate * safeDays;


    // Insurance
    if (insuranceSeleted && Object.keys(insuranceSeleted).length > 0) {
      const insuranceRate = parseFloat(insuranceSeleted?.rate || 0);
      total += insuranceRate * safeDays;
    }

    // Extras
    if (bookingPayload?.booking?.extras && bookingVehicleData?.extras) {
      bookingPayload.booking.extras.forEach((item) => {
        const matchedExtra = bookingVehicleData.extras.find(extra => extra.id === item.extras_option_id);
        if (matchedExtra) {
          const rate = parseFloat(matchedExtra.rate || 0);
          total += rate * item.quantity * safeDays;
        }
      });
    }

    // Road Care (currently $0)
    total += 0;
    return total.toFixed(2); // format to 2 decimal places if needed
  };

  const [emailModal, setEmailModal] = useState(false);
  const [modalType, setModalType] = useState('')
  const handleOpenEmailEnquiry = (type) => {
    setModalType(type)
    setEmailModal(true);
  }



  return (
    <div className="book-now-page-main-container">
      {isLoading && <MainLoader />}
      <div className="book-now-inner-section">
        <div className="book-now-max-width-container">

          <div className='book-now-main-container'>

            <div className='booking-steps-main-container'>

              <div className='insurance-type-head'>
                <span>
                  {
                    selectedTabIndex === 0 ? `${selectedTabIndex + 1}. Choose Insurance`
                      : selectedTabIndex === 1 ? `${selectedTabIndex + 1}. Extras`
                        : selectedTabIndex === 2 ? `${selectedTabIndex + 1}. Hirer Details`
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
                    : <Payments grandTotal={getGrandTotal()} isChecked={isChecked} setIsChecked={setIsChecked} selectPaymentType={selectPaymentType} setSelectPaymentType={setSelectPaymentType} />}

              <button disabled={selectedTabIndex > 2 && !isChecked} className={`payment-continue-button ${selectedTabIndex > 2 && !isChecked ? 'disable-continue-booking' : ''}`} onClick={() => handleBookNow()}>{selectedTabIndex > 2 ? 'Complete Booking' : 'Continue'}</button>

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
                      <p className='edit-enquiry'>Edit Itinerary</p>
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
                      <p>${bookingVehicleData.base_rate}/day x {totalDays} day</p>
                      <span>${bookingVehicleData.base_rate * totalDays}</span>
                      <Link href={'/vehicles'}>Change Vehicle</Link>
                    </div>
                    <div className='vehicle-image-container'>
                      <Image src={url + bookingVehicleData.image} alt='vehicle image' width={192} height={96} className='vehicle-image' />
                    </div>
                  </div>
                  <div className='booking-prices-details-section'>
                    <span>
                      <p>Basic Insurance</p>
                      <h3>{Object.keys(insuranceSeleted).length > 0 ? insuranceSeleted.name : bookingVehicleData?.insurance[0]?.name}</h3>
                    </span>

                    {/* <span>
                      <p>One Way Fee</p>
                      <h3>${Object.keys(insuranceSeleted).length > 0 ? parseInt(insuranceSeleted.rate) === 0 ? 0 : parseInt(insuranceSeleted?.rate) * totalDays : '0'}</h3>
                    </span> */}

                    {bookingPayload?.booking?.extras && bookingPayload?.booking?.extras.map((item, index) => (
                      <span key={index}>
                        <p> {bookingVehicleData?.extras?.find(extra => extra.id === item?.extras_option_id)?.name} <FaQuestionCircle size={15} color='var(--primary-color)' className='booking-price-que' /></p>
                        <h3>${bookingVehicleData?.extras?.find(extra => extra.id === item.extras_option_id)?.rate * item.quantity * totalDays}</h3>
                      </span>
                    ))}


                    {/* <span>
                      <p>Total Road Care <FaQuestionCircle size={15} color='var(--primary-color)' className='booking-price-que' /></p>
                      <h3>$0</h3>
                    </span> */}
                  </div>
                  <div className='grand-total-section'>
                    <p>Grand Total</p>
                    <h3>{getGrandTotal()}</h3>
                    {/* <h3>${Object.keys(insuranceSeleted).length > 0 ? bookingVehicleData.base_rate * totalDays + parseInt(insuranceSeleted?.rate) * totalDays : bookingVehicleData.base_rate * totalDays}</h3> */}
                  </div>
                  <div className='queries-section'>
                    <span onClick={() => handleOpenEmailEnquiry('email-qoute')}>
                      <FaEnvelope size={15} color='var(--primary-color)' />
                      <p>Email Enquiry</p>
                    </span>
                    <span onClick={() => handleOpenEmailEnquiry('qoute')}>
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
        modalMessages={submitBookingMessage}
      />

      <Toust
        showToust={toustShow}
        setShowToust={setTOustShow}
        message={toustMessage}
      />

      <EmailEnquiryModal
        showEmailEnquiry={emailModal}
        setShowEmailEnquiry={setEmailModal}
        carObj={bookingVehicleData}
        modalType={modalType}

      />

    </div>
  )
}

export default BookNowClient