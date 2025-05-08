import React, { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';
import DropdownInput from '../dropdown-input/DropdownInput'
import PrimaryButton from '../primary-button/PrimaryButton';
import { GoArrowRight } from "react-icons/go";
import Calendar from 'react-calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';

const BookingForm = ({ bgColor, textColor, textShadow, primaryButtonText, boxShadow }) => {

    // const [showCalendar, setShowCalendar] = useState(false);
    const [pickupCalender, setPickupCalender] = useState(false);
    const [dropCalender, setDropCalender] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDropDate, setSelectedDropDate] = useState(null);
    const [pickupTime, setPickupTime] = useState();
    const [dropofTime, setDropofTime] = useState()

    const {searchVehiclePayload, setSearchVehiclePayload} = useSearchVehicle()

    const citiesList = [
        'Mangere Auckland',

    ]

    const timeList = [
        '12: 00 AM',
        '11: 00 AM',
        '10: 00 AM',
        '09: 00 AM',
        '08: 00 AM',
        '07: 00 AM',
        '06: 00 AM',
        '05: 00 AM',
        '05: 00 AM',
        '04: 00 AM',
        '03: 00 AM',
        '01: 00 AM',
    ]

    // const toggleCalendar = () => {
    //     setShowCalendar(prev => !prev);
    // };
    const togglePickupCalendar = () => {
        setPickupCalender(prev => !prev);
    };

    const toggleDropCalendar = () => {
        setDropCalender(prev => !prev);
    };

    const handlePickupDateChange = (date) => {
        setSelectedPickupDate(date);
        console.log("picked date", date)
        setPickupCalender(false); // hide after selection
    };
    const handleDropDateChange = (date) => {
        setSelectedDropDate(date);
        setDropCalender(false); // hide after selection
    };

    const handleLocationChange = () => {
        setSearchVehiclePayload((prevValue) => ({
            ...prevValue,
            pickup_location: 4,
            drop_location: 4
        }))
    }

    const handleSelectPickupTime = (value) => {
        setPickupTime(value);
        formatePickupDateAndTime(selectedPickupDate, value)
        console.log("selected time is", value)
    }

    const handleDropofTime = (value) => {
        console.log("dropof time", value)
        setDropofTime(value);
        handleDropofTimeAndDate(selectedDropDate, value)
    }

    const formatePickupDateAndTime = (dateObj, timeObj) => {
        if(!dateObj || !timeObj) return null;
        const cleanedTime = timeObj.replace(/\s+/g, '');
        const dateStr = `${dateObj.toDateString()} ${cleanedTime}`;

        const fullDate = new Date(dateStr)
        setSearchVehiclePayload((prevValue) => ({
            ...prevValue,
            pickup_time: fullDate
        }))
    }

    const handleDropofTimeAndDate = (dateObj, timeObj) => {
        if(!dateObj || !timeObj) return null;

        const cleanedTime = timeObj.replae(/\s+/g, '');

        const dateStr = `${dateObj.toDateString()} ${cleanedTime}`;

        const fullDate = new Date(dateStr);

        setSearchVehiclePayload((prevValue) => ({
            ...prevValue,
            drop_time: fullDate
        }))
    }


    return (
        <div className='booking-form-main-container' style={{ boxShadow: boxShadow }}>
            <div className='booking-form-inputs-container'>
                <div className='booking-form-inputs'>
                    <div className='booking-form-input-single-col'>
                        <DropdownInput
                            width={'100%'}
                            height={'32px'}
                            defaultValue={'Pick-up Location'}
                            placeholder={'Pick-up Location'}
                            setSelectedCity={handleLocationChange}
                            data={citiesList}
                            bgColor={bgColor}
                        />
                        <div className='booking-time-container'>

                            <div className='select-pickup-date-button'>

                                <button className="select-date-button" onClick={togglePickupCalendar} style={{ backgroundColor: bgColor }}>
                                    {selectedPickupDate ? selectedPickupDate.toDateString() : 'Date'}
                                </button>
                                {pickupCalender && (
                                    <div className='booking-pickup-calender-container'>
                                        <Calendar
                                            onChange={handlePickupDateChange}
                                            value={selectedPickupDate}
                                            view="month"
                                            maxDetail="month"
                                            minDetail="month"
                                            next2Label={null}
                                            prev2Label={null}
                                            minDate={new Date()}
                                            formatShortWeekday={(locale, date) =>
                                                date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                                            }
                                            nextLabel={<IoIosArrowForward />}
                                            prevLabel={<IoIosArrowBack />}
                                            tileDisabled={({ date }) => {
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0); // strip time

                                                const checkDate = new Date(date);
                                                checkDate.setHours(0, 0, 0, 0); // strip time

                                                return checkDate < today;
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                            <DropdownInput
                                width={'48%'}
                                height={'162px'}
                                defaultValue={'Time'}
                                data={timeList}
                                setSelectedCity={handleSelectPickupTime}
                                bgColor={bgColor}
                            />
                        </div>

                    </div>

                    <div className='booking-form-input-single-col'>
                        <DropdownInput
                            width={'100%'}
                            height={'32px'}
                            defaultValue={'Drop-of Location'}
                            placeholder={'Drop-of Location'}
                            data={citiesList}
                            
                            bgColor={bgColor}
                        />

                        <div className='booking-time-container'>

                            <div className='select-drop-up-date-button'>
                                <button
                                    className="select-date-button"
                                    onClick={toggleDropCalendar}
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {selectedDropDate ? selectedDropDate.toDateString() : 'Date'}
                                </button>

                                {dropCalender && (
                                    <div className='booking-drop-calender-container'>
                                        <Calendar
                                            onChange={handleDropDateChange}
                                            value={selectedDropDate}
                                            view="month"            // always show month view
                                            maxDetail="month"       // prevent navigating into days
                                            minDetail="month"       // prevent navigating to years
                                            next2Label={null}       // hides double right arrow (>>)
                                            prev2Label={null}
                                            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
                                            minDate={new Date()}
                                            tileDisabled={({ date }) => {
                                                if (!selectedPickupDate) return true; // disable everything if no pickup date selected

                                                const pickupDate = new Date(selectedPickupDate);
                                                pickupDate.setHours(0, 0, 0, 0);

                                                const checkDate = new Date(date);
                                                checkDate.setHours(0, 0, 0, 0);

                                                return checkDate < pickupDate;
                                            }}
                                        />
                                    </div>
                                )}

                            </div>
                            <DropdownInput
                                width={'48%'}
                                height={'162px'}
                                defaultValue={'Time'}
                                data={timeList}
                                setSelectedCity={handleDropofTime}
                                bgColor={bgColor}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='booking-form-confirm-button-container'>
                <PrimaryButton
                    primaryMainClass={'primary-button-main-class'}
                    primaryText={primaryButtonText}
                    primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                    width={'192px'}
                    height={'52px'}
                    gap={'20px'}
                    fontSize={'var(--font-body-lg)'}
                    lineHeight={'var(--line-height-body)'}
                    fontWeight={'var(--font-weight-bold)'}
                />
                <p className='add-promo-option' style={{ color: textColor, fontWeight: 700, }}> Add a promo code</p>
            </div>
        </div>
    )
}

export default BookingForm
