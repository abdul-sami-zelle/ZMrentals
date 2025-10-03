import React, { useEffect, useState } from 'react'
import './UpdateBooking.css'
import axios from 'axios';
import { url } from '@/utils/services';
import { GiGearStickPattern } from "react-icons/gi";
import { FaBluetoothB } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const UpdateBooking = () => {

    // Get Vehicle data
    const [vehicleData, setVehicleData] = useState([]);
    const [driverEdit, setDriverEdit] = useState(null)
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

    const handleGetVehicleData = async () => {
        const api = `https://zm.skyhub.pk/booking/get/222`;
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
                    // signature: {
                    //     signature_image: response?.data?.data?.signature[0]?.signature_image || ''
                    // }
                    signature: response.data.data.signature || []
                })
            }
            console.log("response", response.data.data)
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }
    useEffect(() => { handleGetVehicleData() }, [])

    const carFeatures = [
        { id: 1, icon: GiGearStickPattern, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.transmission}` },
        { id: 1, icon: FaBluetoothB, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.is_bluetooth_capable === true ? 'Yes' : 'No'}` },
        { id: 1, icon: TbAirConditioning, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.air_conditioned === true ? 'Yes' : 'No'}` },
        { id: 1, icon: HiUserGroup, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.passenger_capacity}` },
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

    useEffect(() => { console.log("edit payload", editBookingPayload) }, [editBookingPayload])



    return (
        <div className='booking-edit-main-continair'>

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
                            <button>
                                <CiEdit size={15} color='#000' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>Auckland</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>3</h3>
                                <p>rd</p>
                                <h3>October</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>10: 00 AM</h3>
                        </div>
                    </div>

                    <div className='pick-drop-details-box'>
                        <div className='pick-drop-detial-head'>
                            <h3>Drop-off Location</h3>
                            <button>
                                <CiEdit size={15} color='#000' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>Auckland</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>3</h3>
                                <p>rd</p>
                                <h3>October</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>10: 00 AM</h3>
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
                        <div className='hirer-info-two-columns'>
                            <label>
                                First Name
                                <input
                                    type='text'
                                    name='firstname'
                                    value={editBookingPayload?.user?.firstname}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                            <label>
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
                            <div className='living-country'>
                                <p>Which country do you live</p>
                                <h3>{editBookingPayload?.user?.country}</h3>
                            </div>
                            <label>
                                Email
                                <input type='text' readOnly name='email' value={editBookingPayload?.user?.email} />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            <label>
                                Phone Number
                                <input
                                    type='text'
                                    name='phone'
                                    value={editBookingPayload?.user?.phone}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                            <label>
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
                            <div className='living-country'>
                                <p>How did you find us?</p>
                                <h3>{editBookingPayload?.user?.how_find_us}</h3>
                            </div>
                            <div className='living-country'>
                                <p>Purpose of visit</p>
                                <h3>{editBookingPayload?.user?.travel_reason}</h3>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='edit-driver-info'>
                    <div className='edit-driver-info-head'>
                        <h3>Driver Info</h3>
                        <button>
                            <CiEdit size={15} color='#000' />
                        </button>
                    </div>

                    <div className='edit-drivers-list-contianer'>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div className='driver-list-single-item'>
                                <div className='driver-list-single-item-head' onClick={() => handleDriverIndex(index)}>
                                    <h3>Driver Name</h3>
                                    <IoIosArrowDown size={20} color='#000' />
                                </div>
                                <div className={`driver-list-single-item-inputs ${driverEdit === index ? 'edit-driver-detials' : ''}`}>

                                    <div className='hirer-info-two-columns'>
                                       
                                        <div className='living-country'>
                                            <p>Date of birth</p>
                                            <h3>20-01-1998</h3>
                                        </div>

                                        <div className='living-country'>
                                            <p>Driver Age</p>
                                            <h3>24</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UpdateBooking