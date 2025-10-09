import React, { useState } from 'react'
import './SelectBooking.css'

const SelectBooking = ({ manageBookingSteper, setManageBookingSteper, imageChaneg }) => {
    const [bookingPayload, setBookingPayload] = useState({
        booking_no: '',
        email: ''
    })

    const [errors, setErrors] = useState({});
    const validate = (name, value) => {
        let newErrors = { ...errors };

        // check for empty field
        if (!value.trim()) {
            newErrors[name] = `${name} is required`;
        } else {
            delete newErrors[name]; // remove error if not empty
        }

        // check email format
        if (name === "email" && value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                newErrors[name] = "Invalid email format";
            } else {
                delete newErrors[name];
            }
        }

        setErrors(newErrors);
    };

    const handleBookingSelect = (event) => {
        const { name, value } = event.target;

        setBookingPayload((prev) => ({
            ...prev,
            [name]: value
        }))

        validate(name, value);
    }

    const handleSubmit = () => {
        // run validation for all fields first
        let newErrors = {};

        Object.entries(bookingPayload).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = `${key} is required`;
            }
            if (key === "email" && value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors[key] = "Invalid email format";
                }
            }
        });

        setErrors(newErrors);

        // if there are errors, stop here
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setManageBookingSteper(manageBookingSteper + 1)
        localStorage.setItem('booking_email_and_number', JSON.stringify(bookingPayload))
        imageChaneg()
    };

    return (
        <div className='select-booking-main-contianer'>
            <div className='select-booking-heaing-contianer'>
                <h3>Manage Booking</h3>
                <p>Manage Your Booking</p>
            </div>

            <div className='select-booking-inputs-continaer'>
                <label>
                    Booking Number
                    <input type='text' name='booking_no' value={bookingPayload.booking_no} onChange={handleBookingSelect} style={{ border: errors.booking_no ? '1px solid red' : '1px solid #000' }} />
                </label>
                <label>
                    Email
                    <input type='text' name='email' value={bookingPayload.email} onChange={handleBookingSelect} style={{ border: errors.email ? '1px solid red' : '1px solid #000' }} />
                </label>
            </div>

            <div className='manage-booking-steper-button-contianer'>
                <button onClick={handleSubmit}>Proceed To Manage</button>
            </div>
        </div>
    )
}

export default SelectBooking