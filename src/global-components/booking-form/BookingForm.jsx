import React, { useState } from 'react'
import './BookingForm.css';
import DropdownInput from '../dropdown-input/DropdownInput'
import PrimaryButton from '../primary-button/PrimaryButton';
import { GoArrowRight } from "react-icons/go";
import Calendar from 'react-calendar';

const BookingForm = ({ bgColor, textColor, primaryButtonText }) => {

    // const [showCalendar, setShowCalendar] = useState(false);
    const [pickupCalender, setPickupCalender] = useState(false);
    const [dropCalender, setDropCalender] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDropDate, setSelectedDropDate] = useState(null);

    const citiesList = [
        'Auckland',
        'Auckland Airport',
        'Waiheke City',
        'Waiheke Airport',
        'Queenstown',
        'Queenstown Airport',
        'Auckland',
        'Auckland Airport',
        'Waiheke City',
        'Waiheke Airport',
        'Queenstown',
        'Queenstown Airport',

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
        setPickupCalender(false); // hide after selection
    };
    const handleDropDateChange = (date) => {
        setSelectedDropDate(date);
        setDropCalender(false); // hide after selection
    };

    return (
        <div className='booking-form-main-container'>
            <div className='booking-form-inputs-container'>
                <div className='booking-form-inputs'>
                    <div className='booking-form-input-single-col'>
                        <DropdownInput 
                            width={'100%'}
                            defaultValue={'Pick-up Location'}
                            placeholder={'Pick-up Location'}
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
                                            view="month"            // always show month view
                                            maxDetail="month"       // prevent navigating into days
                                            minDetail="month"       // prevent navigating to years
                                            next2Label={null}       // hides double right arrow (>>)
                                            prev2Label={null}
                                            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
                                            minDate={new Date()}
                                        />
                                    </div>
                                )}

                            </div>
                            
                            <DropdownInput 
                                width={'48%'} 
                                defaultValue={'Time'}
                                data={timeList}
                                bgColor={bgColor}
                            />
                        </div>

                    </div>

                    <div className='booking-form-input-single-col'>
                        <DropdownInput 
                            width={'100%'} 
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
                                    style={{backgroundColor: bgColor}}
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
                                        />
                                    </div>
                                )} 
                                
                            </div>
                            <DropdownInput 
                                width={'48%'} 
                                defaultValue={'Time'}
                                data={timeList}
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
                <p className='add-promo-option' style={{color: textColor}}>Add a promo code</p>
            </div>
        </div>
    )
}

export default BookingForm
