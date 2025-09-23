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
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';

const BookNowClient = () => {
  const stripe = useStripe();
  const elements = useElements();
  const url = `https://zm.skyhub.pk`
  const {
    bookingVehicleData,
    bookingPayload,
    setBookingPayload,
    activeShuttle,
    setActiveShuttle,
    validateForm,
    vehicleSesionData,
    setVehicleSesionData,
    errors,
    userType,
    setUserType,
    userData,
    setUserData,
    countryCode,
    setCountryCode,
  } = useBookingContext()

  const { setSearchVehiclePayload, setIsVehicleSearched, setSearchedVehicles, setPickupCity, setDropupCity, setPickupTime, setDropupTime, setShowBookingButton  } = useSearchVehicle()
  const searchParam = useSearchParams();
  const router = useRouter();
  const step = parseInt(searchParam.get('step')) || 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [insuranceSeleted, setInsuranceSelected] = useState({})
  const [packageSelected, setPackageSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [toustShow, setTOustShow] = useState(false)
  const [toustMessage, setToustMessage] = useState('')
  const [selectPaymentType, setSelectPaymentType] = useState(2)
  const [userDiscount, setUserDiscount] = useState('');
  const [isLoading, setISloading] = useState(false)
  const [paymentError, setPaymentError] = useState("");
  // const [countryCode, setCountryCode] = useState('')

  const getUserDiscount = async () => {
    const guesApi = `${url}/discounts/get/1`
    const userApi = `${url}/discounts/get/1`

    if (userType === 'guest') {
      try {
        const response = await axios.get(guesApi);
        if (response.status === 200) {
          const discountValue = parseFloat(response.data.data.off_percent)
          setUserDiscount(discountValue)
        }
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    } else {
      try {
        const response = await axios.get(userApi);
        if (response.status === 200) {
          const discountValue = parseFloat(response.data.data.off_percent)
          setUserDiscount(discountValue)
        }
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    }
  }

  useEffect(() => {
    getUserDiscount()
  }, [])

  function getTotalDays(pickupISO, dropISO) {
    if (!pickupISO || !dropISO) return 0;
    const pickupDate = new Date(pickupISO);
    const dropDate = new Date(dropISO);

    if (isNaN(pickupDate) || isNaN(dropDate)) return 0;

    // Convert both to date-only strings (UTC)
    const pickupStr = pickupDate?.toISOString().split('T')[0];
    const dropStr = dropDate?.toISOString().split('T')[0];

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
    // return Object.values(bookingPayload.user).every(value => value && value.trim() !== '');

    // 1. Check if all fields have some value
    const allFilled = Object.values(bookingPayload.user).every(
      (value) => value && value.trim() !== ""
    );

    // 2. Check if there are any errors (like invalid email/phone etc.)
    const noErrors = Object.keys(errors).length === 0;

    // ✅ Only allow if both conditions are true
    return allFilled && noErrors;
  }

  const isArrivalDetailsAdded = () => {
    const flightNumber = bookingPayload?.booking?.flight_number || "";
    const arrivalCity = bookingPayload?.booking?.arrival_city || "";

    return flightNumber.trim() !== "" && arrivalCity.trim() !== "";
  };

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

  const handleCompleteBooking = async () => {
    const api = `https://zm.skyhub.pk/booking/add-booking`;

    const payloadWithPhoneCode = {
      ...bookingPayload,
      user: {
        ...bookingPayload.user,
        phone: `${countryCode}${bookingPayload.user.phone}`
      }
    };

    try {
      setISloading(true)
      const response = await axios.post(api, payloadWithPhoneCode);
      if (response.status === 201) {
        setISloading(false);
        setShowAvailableModal(true)
        setShowBookingButton(false);
        setSearchedVehicles([])
        setSearchedVehicles([])
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

        setSearchVehiclePayload({
          "pickup_location": null,
          "drop_location": null,
          "pickup_time": "",
          "drop_time": "",
          "driver_age": '24'
        })
        setIsVehicleSearched(false)
        setPickupCity('')
        setDropupCity('')
        setPickupTime('')
        setDropupTime('')

        sessionStorage.removeItem('pick_and_drop_details');
        sessionStorage.removeItem('selected-vehicle-details');
        sessionStorage.removeItem('vehicle-details');



      } else {
        setISloading(false);
        setShowAvailableModal(true)
        setShowBookingButton(false)
        setSearchedVehicles([])
        setSearchedVehicles([])
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
      setShowBookingButton(false)
      setSearchedVehicles([])
      setSearchedVehicles([])
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
    const payloadWithPhoneCode = {
      ...bookingPayload,
      user: {
        ...bookingPayload.user,
        phone: `${countryCode}${bookingPayload.user.phone}`
      }
    };


    try {
      setISloading(true);
      setPaymentError('');

      // 1️⃣ Create booking first
      const bookingResponse = await axios.post(
        `https://zm.skyhub.pk/booking/add-booking`,
        payloadWithPhoneCode
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
          setShowBookingButton(false)
          setSearchedVehicles([])
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

          setSearchVehiclePayload({
            "pickup_location": null,
            "drop_location": null,
            "pickup_time": "",
            "drop_time": "",
            "driver_age": '24'
          })
          setIsVehicleSearched(false)
          setPickupCity('')
          setDropupCity('')
          setPickupTime('')
          setDropupTime('')

          sessionStorage.removeItem('pick_and_drop_details');
          sessionStorage.removeItem('selected-vehicle-details');
          sessionStorage.removeItem('vehicle-details');

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

            setShowBookingButton(false)
            setSearchedVehicles([])
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

            setSearchVehiclePayload({
              "pickup_location": null,
              "drop_location": null,
              "pickup_time": "",
              "drop_time": "",
              "driver_age": '24'
            })
            setIsVehicleSearched(false)
            setPickupCity('')
            setDropupCity('')
            setPickupTime('')
            setDropupTime('')

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

  const [pickDropLocation, setPickDropLocation] = useState({

  });
  const [totalDays, setTotalDays] = useState(0);
  useEffect(() => {

    const pickDrop = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setTotalDays(getTotalDays(pickDrop?.pickup_time, pickDrop?.drop_time))
    setPickDropLocation(pickDrop)
    if (pickDrop.pickup_location === null && pickDrop.drop_location === null) {
      sessionStorage.removeItem('pick_and_drop_details');
      sessionStorage.removeItem('selected-vehicle-details');
      sessionStorage.removeItem('vehicle-details');
      router.push('/vehicles')
    }
  }, [])

  const [locations, setLocations] = useState([])
  useEffect(() => {

    const getApi = async () => {
      try {
        const response = await axios.get(`https://zm.skyhub.pk/locations/get`);
        setLocations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getApi()
  }, [pickDropLocation])

  const formatDateFromISO = (isoString) => {
    try {
      const [year, month, day] = isoString.split("T")[0].split("-");
      const date = new Date(`${year}-${month}-${day}T00:00:00`); // force local parsing

      return new Intl.DateTimeFormat("en-NZ", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(date);
    } catch (err) {
      return "Invalid Date";
    }
  };

  const formatTimeFromISO = (isoString) => {
    try {
      // Extract HH:MM:SS from the ISO string
      const timePart = isoString.split("T")[1].substring(0, 5); // "07:00"

      let [hours, minutes] = timePart.split(":").map(Number);

      // Convert to 12-hour format
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
    } catch (err) {
      return "Invalid Time";
    }
  };

  const handleBookNow = () => {

    if (selectedTabIndex < 3) {

      if (activeShuttle !== 3 && selectedTabIndex === 0 && !isArrivalDetailsAdded()) {
        setTOustShow(true)
        setToustMessage("Please Fill Flight Number and Arrival City");
      } else if (selectedTabIndex === 2 && !isUserInfoFilled()) {
        setTOustShow(true)
        setToustMessage("Please Fill All The Information")
      } else if (activeShuttle === 3 && selectedTabIndex === 0) {
        setBookingPayload((prev) => ({
          ...prev,
          booking: {
            ...prev.booking,
            flight_number: '',
            arrival_city: ''
          }
        }))
        goToNewStep(selectedTabIndex + 1);
      } else {
        goToNewStep(selectedTabIndex + 1);
      }
    } else {
      if (selectPaymentType === 1) {
        handleCompleteBooking()
      } else if (selectPaymentType === 2) {
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

  const getInsurancesTotal = () => {
    let total = 0;
    const safeDays = totalDays > 0 ? totalDays : 1;
    // Insurance
    if (insuranceSeleted && Object.keys(insuranceSeleted).length > 0) {
      const insuranceRate = parseFloat(insuranceSeleted?.rate || 0);
      total += insuranceRate * safeDays;
    }
    return total.toFixed(2)
  }

  const getSubTotal = () => {
    let total = 0;

    // Get Total Days
    const subTotal = parseFloat(vehicleSesionData.sub_total || 0);
    total += subTotal - parseFloat(vehicleSesionData?.discounts?.value);
    return total.toFixed(2)
  }

  const getGrandTotal = () => {
    let total = 0;

    // Get Total Days
    const safeDays = totalDays > 0 ? totalDays : 1;


    const subTotal = parseFloat(vehicleSesionData.sub_total || 0);
    total += subTotal - parseFloat(vehicleSesionData?.discounts?.value);

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
          if (matchedExtra.is_daily_rate === true) {
            total += rate * item.quantity * safeDays;
          } else {
            total += rate * item.quantity
          }
        }
      });
    }

    if (vehicleSesionData?.off_hour_charges !== 0) {
      const offHourCharges = vehicleSesionData?.off_hour_charges;
      total += offHourCharges
    }

    return total.toFixed(2); // format to 2 decimal places if needed
  };


  const [emailModal, setEmailModal] = useState(false);
  const [modalType, setModalType] = useState('')
  const handleOpenEmailEnquiry = (type) => {
    setModalType(type)
    setEmailModal(true);
  }

  const applyDiscount = (price, discountPercent) => {
    const numPrice = parseFloat(price);
    const discount = parseFloat(discountPercent);

    if (isNaN(numPrice) || isNaN(discount)) return price;

    const discountedPrice = numPrice - (numPrice * (discount / 100));
    return discountedPrice.toFixed(2); // keep 2 decimal places
  };

  const getDiscountAmount = (price, discountPercent) => {
    const numPrice = parseFloat(price);
    const discount = parseFloat(discountPercent);

    if (isNaN(numPrice) || isNaN(discount)) return 0;
    return (numPrice * (discount / 100)).toFixed(2); // discount amount
  };


  return (
    <div className="book-now-page-main-container">
      {isLoading && <MainLoader />}
      <div className="book-now-inner-section">
        <div className="book-now-max-width-container">

          <div className='book-now-main-container'>

            <div className='booking-steps-main-container'>

              <div className='booking-steper-and-tab'>
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

                {selectedTabIndex === 0 ? <InsuranceType
                  insurances={bookingVehicleData?.insurance}
                  selectedTabIndex={selectedTabIndex}
                  insuranceSeleted={insuranceSeleted}
                  setInsuranceSelected={setInsuranceSelected}
                  packageSelected={packageSelected}
                  setPackageSelected={setPackageSelected}
                />
                  : selectedTabIndex === 1 ? <Extras
                    extras={bookingVehicleData.extras}
                  />
                    : selectedTabIndex === 2 ? <HirerDetails />
                      : <Payments
                        grandTotal={applyDiscount(getGrandTotal(), userDiscount)}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        selectPaymentType={selectPaymentType}
                        setSelectPaymentType={setSelectPaymentType}
                      />
                }
              </div>


              <button disabled={selectedTabIndex > 2 && !isChecked} className={`payment-continue-button ${selectedTabIndex > 2 && !isChecked ? 'disable-continue-booking' : ''}`} onClick={() => handleBookNow()}>{selectedTabIndex > 2 ? 'Complete Booking' : 'Continue'}</button>

            </div>

            {/*Booking Summary*/}
            {bookingVehicleData ? (
              <div className={`booking-summary-main-container`}>
                <h3>Booking Summary</h3>
                <div className='booking-summary-details-container'>
                  <div className='pick-drop-detail-section'>
                    <div className='pick-up-section'>
                      <h3>Pick-up</h3>
                      <h3>{locations.find((item) => item.id === pickDropLocation.pickup_location)?.name}</h3>
                      <p>{formatDateFromISO(pickDropLocation.pickup_time)}</p>
                      <p className='pick-drop-time'>{formatTimeFromISO(pickDropLocation?.pickup_time)}</p>
                      <Link href={'/vehicles'} className='edit-enquiry'>Edit Itinerary</Link>
                    </div>
                    <div className='drop-off-section'>
                      <h3>Drop-off</h3>
                      <h3>{locations.find((item) => item.id === pickDropLocation.drop_location)?.name}</h3>
                      <p>{formatDateFromISO(pickDropLocation?.drop_time)}</p>
                      <p>{formatTimeFromISO(pickDropLocation?.drop_time)}</p>
                    </div>
                  </div>
                  <div className='vehicle-details-section'>
                    <div className='vehicle-details'>
                      <h3>{bookingVehicleData.name}</h3>
                      {/* <p>${bookingVehicleData.base_rate}/day x {totalDays} day</p> */}
                      {vehicleSesionData?.duration_discount !== 0 ? (
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: 'auto', flexDirection: 'column' }}>
                          <del>NZ$ {vehicleSesionData?.was_price}</del>

                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: 'max-content' }}>
                            NZ$ {vehicleSesionData?.sub_total}
                            <p style={{ fontSize: '10px', lineHeight: '12px', fontWeight: 400 }}>({vehicleSesionData?.duration_discount} days discount)</p>
                          </span>
                        </div>
                      ) : (
                        <span>NZ$ {vehicleSesionData?.sub_total}</span>
                      )}

                      <Link href={'/vehicles'}>Change Vehicle</Link>
                    </div>
                    <div className='vehicle-image-container'>
                      <Image src={url + bookingVehicleData?.image} alt='vehicle image' width={192} height={96} className='vehicle-image' />
                    </div>
                  </div>


                  <div className='booking-prices-details-section'>
                    <span>
                      <p>{vehicleSesionData?.discounts?.name}</p>
                      <h3>NZ$ {getDiscountAmount(vehicleSesionData?.sub_total, vehicleSesionData?.discounts?.percent)}</h3>
                    </span>

                    <span>
                      <p>Sub Total</p>
                      <h3>NZ$ {getSubTotal()}</h3>
                    </span>


                    {Object.keys(insuranceSeleted).length > 0 && (
                      <span>
                        <p>Insurance</p>
                        {
                          parseFloat(insuranceSeleted?.rate) === 0 ? (
                            <h3>Free</h3>
                          ) : (
                            <h3>{getInsurancesTotal()}</h3>
                          )
                        }

                      </span>
                    )}


                    {bookingPayload?.booking?.extras && bookingPayload?.booking?.extras.map((item, index) => (
                      <span key={index}>
                        <p> {bookingVehicleData?.extras?.find(extra => extra.id === item?.extras_option_id)?.name} <FaQuestionCircle size={15} color='var(--primary-color)' className='booking-price-que' /></p>
                        <h3>NZ$ {bookingVehicleData?.extras?.find(extra => extra.id === item.extras_option_id)?.rate * item.quantity * totalDays}</h3>
                      </span>
                    ))}

                    {
                      vehicleSesionData?.off_hour_charges !== 0 && (
                        <span>
                          <p>Off Hour Charges</p>
                          <h3>NZ$ {vehicleSesionData?.off_hour_charges}</h3>
                        </span>
                      )
                    }


                  </div>
                  <div className='grand-total-section'>
                    <p>Grand Total</p>
                    <span>
                      <h3>NZ$ {getGrandTotal()}</h3>
                      <p>(Inclusive of GST)</p>
                    </span>
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