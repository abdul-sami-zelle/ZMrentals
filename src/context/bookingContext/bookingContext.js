'use client'

import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingVehicleData, setBookingVehicleData] = useState({})
    const [extraQuantities, setExtraQuantities] = useState({});
    const [bookingPayload, setBookingPayload] = useState({
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
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        Object.entries(bookingPayload.user).forEach(([key, value]) => {
            if (!value || value.trim() === "") {
                newErrors[key] = "Required"; // mark field as missing
            }
        });

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const vehicleSessionData = JSON.parse(sessionStorage.getItem('vehicle-details'));
        if (Object.keys(bookingVehicleData).length === 0) {
            setBookingVehicleData(vehicleSessionData);
        }
    }, [])



    return (
        <BookingContext.Provider value={{
            bookingPayload,
            setBookingPayload,
            bookingVehicleData,
            setBookingVehicleData,
            extraQuantities,
            setExtraQuantities,
            validateForm,
            errors, 
            setErrors,
        }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext)