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
    

    useEffect(() => { console.log("booking details", bookingPayload) }, [bookingPayload])
    useEffect(() => { console.log("booking data", bookingVehicleData) }, [bookingVehicleData])

    return (
        <BookingContext.Provider value={{
            bookingPayload,
            setBookingPayload,
            bookingVehicleData,
            setBookingVehicleData,
            extraQuantities,
            setExtraQuantities
        }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext)