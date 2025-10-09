import React, { useEffect, useRef, useState } from 'react'
import './UpdateBooking.css'
import axios from 'axios';
import { url } from '@/utils/services';
import { GiGearStickPattern } from "react-icons/gi";
import { FaBluetoothB } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import CarAvailabilityModal from '../CarAvailabilityModal/CarAvailabilityModal'
import { useOutsideClick } from '@/utils/DetectClickOutside';
import { useDropdownNavigation } from '@/utils/keyPress';
import InsuranceUpdateModal from '../InsuranceUpdateModal/InsuranceUpdateModal';
import ExtrasUpdateModal from '../ExtrasUpdateModal/ExtrasUpdateModal'
import { GoPlus } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import EditDriverModal from '../EdtiDriverModal/EditDriverModal'
import MainLoader from '@/loaders/MainLoader/MainLoader';

const UpdateBooking = () => {



    // Get Vehicle data
    const [loading, setLoading] = useState(false)
    const [vehicleData, setVehicleData] = useState([]);
    const [driverEdit, setDriverEdit] = useState(null)
    const [showLivingCountry, setShowLivingCountry] = useState(false)
    const [howFind, setHowFind] = useState(false);
    const [showVisitPerpose, setShowVisitPerpose] = useState(false)
    const [editBookingPayload, setEditBookingPayload] = useState({
        booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
            shuttle_option: 3,
            flight_number: '',
            arrival_city: ''
        },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            local_phone: "",
            country: "New Zealand",
            driver_age: '24',
            how_find_us: "",
            travel_reason: "Leisure"
        },
        driverDetails: [],
        signature: {
            signature_image: ''
        }
    });

    const livingCountryRef = useRef();
    const howFindusRef = useRef();
    const visitPerposeRef = useRef();

    useOutsideClick(livingCountryRef, () => setShowLivingCountry(false));
    useOutsideClick(howFindusRef, () => setHowFind(false));
    useOutsideClick(visitPerposeRef, () => setShowVisitPerpose(false));

    const livingCountryIndex = useDropdownNavigation(livingCountryRef, showLivingCountry, 'living-country-list-item')
    const HowFindIndex = useDropdownNavigation(howFindusRef, howFind, 'edit-where-found-item')
    const visitPerposeIndex = useDropdownNavigation(visitPerposeRef, showVisitPerpose, 'visit-perpose-item')

    const [locations, setLocations] = useState([])
    const getApi = async () => {
        try {
            const response = await axios.get(`https://zm.skyhub.pk/locations/get`);
            setLocations(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    const handleGetVehicleData = async () => {
        const api = `https://zm.skyhub.pk/booking/get/253`;
        setLoading(true)
        try {
            const response = await axios.get(api);
            if (response.status === 200) {
                setVehicleData(response.data.data)
                setEditBookingPayload({
                    booking: {
                        car_id: response.data.data.car_id,
                        pickup_location: response.data.data.pickupLocation.id,
                        drop_location: response.data.data.dropLocation.id,
                        pickup_time: response.data.data.pickup_time,
                        drop_time: response.data.data.drop_time,
                        extras: response.data.data.extras,
                        insurance_id: response.data.data?.insurances[0]?.id,
                        shuttle_option: response.data.data.shuttle_option || '',
                        flight_number: response.data.data.flight_number || '',
                        arrival_city: response.data.data.arrival_city || ''
                    },
                    user: {
                        firstname: response.data.data.user.firstname,
                        lastname: response.data.data.user.lastname,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        local_phone: response.data.data.user.local_phone ?? '',
                        country: response.data.data.user.country,
                        driver_age: response.data.data.user.driver_age || '24',
                        how_find_us: response.data.data.user.how_find_us,
                        travel_reason: response.data.data.user.travel_reason
                    },
                    drivers: response.data.data.drivers,
                    signature: response.data.data.signature || []
                })
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { handleGetVehicleData() }, [])


    const carFeatures = [
        { id: 1, icon: GiGearStickPattern, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.transmission}` },
        { id: 2, icon: FaBluetoothB, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.is_bluetooth_capable === true ? 'Yes' : 'No'}` },
        { id: 3, icon: TbAirConditioning, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.air_conditioned === true ? 'Yes' : 'No'}` },
        { id: 4, icon: HiUserGroup, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.passenger_capacity}` },
    ]

    const [isHirerEditable, setIsHirerEditable] = useState(false);
    const handleHirerDetialsChange = (event) => {
        const { name, value } = event.target;
        setEditBookingPayload((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                [name]: value
            }
        }))
    }

    const handleHirerAdit = () => {
        setIsHirerEditable(!isHirerEditable)
    }

    const handleDriverIndex = (index) => {
        setDriverEdit((prev) => prev !== index ? index : null)
    }

    const [showDriverAge, setShowDriverAge] = useState(false);
    const driverAgeList = ['21', '22', '23', '24', '25+']

    const handleDriverAge = () => {
        setShowDriverAge(!showDriverAge);
    }

    function formatIsoDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2); // last 2 digits
        return `${day}-${month}-${year}`;
    }

    const [countriesList, setCountriesList] = useState([])
    useEffect(() => {
        const handleGetAllCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
                const data = await res.json();



                const formatted = data
                    .map((item) => {
                        const root = item.idd?.root || "";
                        const suffix = item.idd?.suffixes?.[0] || "";
                        return {
                            country: item.name.common,
                            code: root + suffix, // e.g. +92
                        };
                    })
                    // sort alphabetically by country name
                    .sort((a, b) => a.country.localeCompare(b.country));


                setCountriesList(formatted);
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        handleGetAllCountries();
    }, []);

    const [showLLicenceCountry, setShowLicenceCountry] = useState(false);
    const handleShowLicenceCountry = () => {
        setShowLicenceCountry(!showLLicenceCountry)
    }

    const [showAvailabilitycheckModal, setShowAvailabilitycheckModal] = useState(false);
    const handleShowAvailabilityCheckModal = () => {
        setShowAvailabilitycheckModal(!showAvailabilitycheckModal);
    }

    const [pickupDetails, setPickupDetails] = useState({})
    const [dropupDetails, setDropUpDetails] = useState({})
    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get day with suffix
        const day = date.getUTCDate();
        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        // Get month name
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getUTCMonth()];

        // Get time
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");
        const time = `${hours}:${minutes}:${seconds}`;

        return { day, suffix, month, time };
    }

    useEffect(() => {
        const { day, suffix, month, time } = formatDate(editBookingPayload.booking.pickup_time)
        setPickupDetails({
            pickDate: day,
            pickSuffix: suffix,
            pickMonth: month,
            pickTime: time
        })

    }, [editBookingPayload])

    useEffect(() => {
        const { day, suffix, month, time } = formatDate(editBookingPayload.booking.drop_time);
        setDropUpDetails({
            dropDate: day,
            dropSuffix: suffix,
            dropMonth: month,
            dropTime: time
        })
    }, [editBookingPayload])

    const handleLivingRoom = (item) => {
        setEditBookingPayload((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                country: item.country

            }
        }))
        setShowLivingCountry(false)
    }

    const whereFindUs = [
        'Google',
        'Facebook',
        'Instagram',
        'Tiktok',
        'Friends referral',
        'Other',
    ]

    const handleHowFindUsItem = (item) => {

        setEditBookingPayload((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                how_find_us: item
            }
        }))
        setHowFind(false)
    }

    const perposes = ['Leisure', 'Business', 'Other']
    const handleSetVisitPerpose = (item) => {
        setEditBookingPayload((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                travel_reason: item
            }
        }))
        setShowVisitPerpose(false);
    }

    // Driver Functionality
    const [selectedDriver, setSelectedDriver] = useState({})
    const [showDriverEdit, setShowDriverEdit] = useState(false)

    const handleDriverEditModal = (item) => {
        setShowDriverEdit(true)
        setSelectedDriver(item)
    }

    const handleDetails = (item) => {
        console.log("driver item", item);
        setSelectedDriver(item)
    }




    const [insuranceModal, setInsuranceModal] = useState(false);
    const handleUpdateInsurance = () => {
        setInsuranceModal(true)
    }


    const handleExtrasTotal = () => {
        const extrasPrices = [];

        let extrasTotal = 0

        editBookingPayload?.booking?.extras.map((item, index) => {
            extrasPrices.push(parseFloat(item.rate) * vehicleData?.rates?.length)
        })

        extrasPrices.map((item) => {
            extrasTotal += parseFloat(item)
        })

        return extrasTotal
    }

    const handleGrandTotal = () => {

        const extraArray = []
        let extraValues = 0
        editBookingPayload?.booking?.extras?.map((item, index) => {
            extraArray.push(parseFloat(item.rate) * vehicleData?.rates?.length)
        })
        extraArray.map((item) => {
            extraValues += parseFloat(item)
        })

        const carRates = vehicleData?.car_rates;
        const discount = vehicleData?.discount_amount;
        const subTotal = parseFloat(carRates) - parseFloat(discount);
        const offHourCharges = vehicleData?.off_hour_charges;
        const insuranceTotal = vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0
        
        const grandTotal = parseFloat(subTotal) + parseFloat(offHourCharges) + parseFloat(insuranceTotal) + parseFloat(extraValues)
        
        return grandTotal
    }




    useEffect(() => { console.log("vehicle data payload", vehicleData) }, [vehicleData])

    return (
        <div className='booking-edit-main-continair'>
            {loading && <MainLoader />}
            <div className='edit-booking-left-sec'>

                <div className='edit-booking-vehicle-image-and-name'>
                    <img src={url + vehicleData?.Car?.image} />
                    <div className='edit-booking-vehicle-name'>
                        <h3>{vehicleData?.Car?.name}</h3>
                    </div>
                </div>

                <div className='edit-booking-car-features'>
                    {carFeatures.map((item) => (
                        <span>
                            <item.icon size={20} color='#000' />
                            {item.value}
                        </span>
                    ))}
                </div>

                <div className='edit-booking-dick-and-drop-time'>

                    <div className='pick-drop-details-box'>
                        <div className='pick-drop-detial-head'>
                            <h3>Pick-up Location</h3>
                            <button onClick={handleShowAvailabilityCheckModal}>
                                <CiEdit size={15} color='#000' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>{locations.find((item) => item.id === editBookingPayload?.booking?.pickup_location)?.name}</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>{pickupDetails.pickDate}</h3>
                                <p>{pickupDetails.pickSuffix}</p>
                                <h3>{pickupDetails.pickMonth}</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>{pickupDetails.pickTime}</h3>
                        </div>
                    </div>

                    <div className='pick-drop-details-box'>
                        <div className='pick-drop-detial-head'>
                            <h3>Drop-off Location</h3>
                            <button onClick={handleShowAvailabilityCheckModal}>
                                <CiEdit size={15} color='#000' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>{locations.find((item) => item.id === editBookingPayload?.booking?.drop_location)?.name}</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>{dropupDetails.dropDate}</h3>
                                <p>{dropupDetails.dropSuffix}</p>
                                <h3>{dropupDetails.dropMonth}</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>{dropupDetails.dropTime}</h3>
                        </div>
                    </div>

                </div>

            </div>

            <div className='edit-booking-left-right'>

                <div className='edit-hirer-details-main-container'>

                    <div className='hirer-info-head'>
                        <h3>Hirer Information</h3>
                        <button onClick={handleHirerAdit}>
                            <CiEdit size={15} color='#000' />
                        </button>
                    </div>

                    <div className='hirer-info-inputs'>
                        <div className={`hirer-info-two-columns `}>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                First Name
                                <input
                                    type='text'
                                    name='firstname'
                                    value={editBookingPayload?.user?.firstname}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Last Name
                                <input
                                    type='text'
                                    name='lastname'
                                    value={editBookingPayload?.user?.lastname}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            {isHirerEditable ? (
                                <div ref={livingCountryRef} className='edit-booking-living-country'>
                                    <p>Which country do you live</p>
                                    <div className='edit-booking-living-country-head' onClick={() => setShowLivingCountry(!showLivingCountry)}>
                                        <h3>{editBookingPayload?.user?.country}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`edit-booking-living-country-dropdown ${showLivingCountry ? 'show-living-country-list' : ''}`}>
                                        {countriesList.map((item, index) => (
                                            <p key={index} className={`living-country-list-item ${livingCountryIndex === index ? 'active-country-list-item' : ''} `} onClick={() => handleLivingRoom(item)}>{item.country}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>Which country do you live</p>
                                    <h3>{editBookingPayload?.user?.country}</h3>
                                </div>
                            )}

                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Email
                                <input type='text' readOnly name='email' value={editBookingPayload?.user?.email} />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Phone Number
                                <input
                                    type='text'
                                    name='phone'
                                    value={editBookingPayload?.user?.phone}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Local Phone
                                <input
                                    type='text'
                                    name='local_phone'
                                    value={editBookingPayload?.user?.local_phone}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            {isHirerEditable ? (
                                <div ref={howFindusRef} className='edit-how-you-find-us'>
                                    <p>How did you find us?</p>
                                    <div className='edit-how-you-find-head' onClick={() => setHowFind(!howFind)}>
                                        <h3>{editBookingPayload?.user?.how_find_us}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`edit-how-you-find-list ${howFind ? 'show-how-find-us' : ''}`}>
                                        {whereFindUs.map((item, index) => (
                                            <p key={index} className={`edit-where-found-item ${HowFindIndex === index ? 'active-find-us-item' : ''}`} onClick={() => handleHowFindUsItem(item)} >{item}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>How did you find us?</p>
                                    <h3>{editBookingPayload?.user?.how_find_us}</h3>
                                </div>
                            )}

                            {isHirerEditable ? (
                                <div ref={visitPerposeRef} className='visit-perpose-dropdown-main'>
                                    <p>Purpose of visit</p>
                                    <div className='visit-perpose-head' onClick={() => setShowVisitPerpose(!showVisitPerpose)}>
                                        <h3>{editBookingPayload?.user?.travel_reason}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`visit-perpose-list ${showVisitPerpose ? 'show-visit-perpose' : ''}`}>
                                        {perposes.map((item, index) => (
                                            <p
                                                key={index}
                                                className={`visit-perpose-item ${visitPerposeIndex === index ? 'active-visit-perpose' : ''}`}
                                                onClick={() => handleSetVisitPerpose(item)}
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>Purpose of visit</p>
                                    <h3>{editBookingPayload?.user?.travel_reason}</h3>
                                </div>
                            )}


                        </div>
                    </div>

                    {/* <div className='hirer-info-update-button-contianer' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                        <button style={{ cursor: isHirerEditable ? 'pointer' : 'not-allowed' }}>Update</button>
                    </div> */}

                </div>

                <div className='edit-driver-info'>

                    <div className='edit-driver-info-head'>
                        <h3>Driver Info</h3>
                        <button>
                            <GoPlus size={15} color='#000' />
                        </button>
                    </div>

                    <div className='edit-drivers-list-contianer'>
                        {editBookingPayload?.drivers && editBookingPayload?.drivers?.map((item, index) => (
                            <div className='driver-list-single-item'>
                                <div className='driver-list-single-item-head' onClick={() => handleDriverIndex(index)}>
                                    <h3>{item.driver_name}</h3>
                                    <span className='driver-view-or-adit-contianer'>
                                        <FaEye size={20} color='#000' onClick={() => handleDetails(item)} />
                                        <CiEdit size={20} color='#000' onClick={() => handleDriverEditModal(item)} />
                                    </span>
                                </div>
                                {/* <div className={`driver-list-single-item-inputs ${driverEdit === index ? 'edit-driver-detials' : ''}`}>

                                    <div className='hirer-info-two-columns'>

                                        <div className='living-country'>
                                            <p>Date of birth</p>
                                            <h3>{formatIsoDate(item.driver_dob)}</h3>
                                        </div>

                                        <div className='living-country'>
                                            <p>Driver Age</p>
                                            <h3>24</h3>
                                        </div>

                                    </div>
                                    <div className='hirer-info-two-columns'>

                                        <div className='living-country'>
                                            <p>Licence Issuing Country</p>
                                            <div className='licence-issue-country-list-main-contianer'>
                                                <div className='licence-issue-country-head' onClick={handleShowLicenceCountry}>
                                                    <h3>{item.license_country}</h3>
                                                </div>
                                                <div className={`licence-issue-country-list ${showLLicenceCountry ? 'show-licence-country-list' : ''}`}>
                                                    {countriesList.map((item, index) => (
                                                        <p key={index} className={`licence-country-list-item`}>{item.country}</p>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                        <div className='living-country'>
                                            <p>Licence Number</p>
                                            <h3>{item.license_no}</h3>
                                        </div>

                                    </div>
                                    <div className='hirer-info-two-columns'>

                                        <div className='living-country'>
                                            <p>Licence Expiry Date</p>
                                            <h3>{formatIsoDate(item.license_expiry)}</h3>
                                        </div>

                                        <div className='living-country'>
                                            <p>Living Country</p>
                                            <h3>24</h3>
                                        </div>

                                    </div>


                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='insurance-main-contianer'>
                    <div className='car-insurance-head'>
                        <h3>Insurance</h3>
                        {vehicleData?.insurances && (
                            <span>
                                <h3>{vehicleData?.insurances[0]?.CarInsurancePricing?.name}</h3> /
                                <p>NZD {vehicleData?.insurances[0]?.CarInsurancePricing?.rate}</p>
                            </span>
                        )}
                        {vehicleData.insurances && (
                            <span>
                                <h3>Total: </h3>
                                <p>NZD {parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length}</p>
                            </span>
                        )}

                    </div>
                    <div className='insurance-content-sec' onClick={handleUpdateInsurance}>
                        <button>
                            <CiEdit size={15} color='#000' />
                        </button>
                    </div>

                </div>

                <div className='summary-main-contianer'>
                    <div className='summary-extras-and-signature'>

                        <div className='extras-count-container'>
                            <div className='extras-count-head'>
                                <h3>Extras</h3>
                                <button>
                                    <CiEdit size={15} color='#000' />
                                </button>
                            </div>
                            <div className='extras-count-option-contianer'>
                                {editBookingPayload?.booking?.extras?.map((item, index) => (
                                    <span key={index}>
                                        <h3>{item.name}</h3>
                                        <p>NZD {parseFloat(item.rate) * vehicleData?.rates?.length}</p>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='summary-signature-option'>
                            <p>Add Signature</p>
                        </div>

                    </div>
                    <div className='summary-total-section'>
                        <h3>Summary</h3>
                        <div className='summary-values-and-totals'>
                            <span>
                                <p>Car Rate</p>
                                <h3>NZD {parseFloat(vehicleData?.car_rates)}</h3>
                            </span>
                            <span>
                                <p>Discount {parseInt(vehicleData?.discount_percent)}%</p>
                                <h3>NZD {vehicleData?.discount_amount}</h3>
                            </span>
                            <span>
                                <p>Duration</p>
                                <h3>{vehicleData?.rates?.length} {vehicleData?.rates?.length > 1 ? 'days' : 'day'}</h3>
                            </span>
                            <span>
                                <p>Sub Total</p>
                                <h3>NZD {parseFloat(vehicleData?.car_rates) - parseFloat(vehicleData?.discount_amount)}</h3>
                            </span>
                            <span>
                                <p>Off hour charges</p>
                                <h3>NZD {vehicleData?.off_hour_charges}</h3>
                            </span>
                            <span>
                                <p>Transaction Fees</p>
                                <h3>NZD 0</h3>
                            </span>
                            <span>
                                <p>Insurance</p>
                                <h3>NZD {vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0}</h3>
                            </span>
                            <span>
                                <p>Extras</p>
                                <h3>NZD {handleExtrasTotal()}</h3>
                            </span>
                            <span style={{borderTop: '1px solid #afafaf', paddingTop: '10px'}}>
                                <p style={{fontSize: '15px', fontWeight: 400, color: '#000'}}>Grand Total</p>
                                <h3 style={{fontSize: '15px', fontWeight: 500, color: '#000'}}>NZD {handleGrandTotal()}</h3>
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <CarAvailabilityModal
                showModal={showAvailabilitycheckModal}
                setShowModal={setShowAvailabilitycheckModal}
                vehicleData={vehicleData}
                setVehicleData={setVehicleData}
                editBookingPayload={editBookingPayload}
                setEditBookingPayload={setEditBookingPayload}
            />

            <InsuranceUpdateModal
                insuranceModal={insuranceModal}
                setInsuranceModal={setInsuranceModal}
                carId={vehicleData?.car_id}
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
            />

            <ExtrasUpdateModal
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
                carId={vehicleData?.car_id}
            />

            <EditDriverModal
                isEdit={showDriverEdit}
                setIsEdit={setShowDriverEdit}
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
                data={selectedDriver}
                setData={setSelectedDriver}
            />

        </div>
    )
}

export default UpdateBooking