'use client'

import { createContext, useContext, useEffect, useState } from "react";;

const SearchVehicleContext = createContext();

export const SearchVehicleProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);

    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDropDate, setSelectedDropDate] = useState(null);

    const [pickupCity, setPickupCity] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [dropupCity, setDropupCity] = useState('')
    const [dropupTime, setDropupTime] = useState('')
    const [driverAge, setDriverAge] = useState('24')
    const [isVehicleSearched, setIsVehicleSearched] = useState(false)

    const [searchVehiclePayload, setSearchVehiclePayload] = useState({
        "pickup_location": null,
        "drop_location": null,
        "pickup_time": "",
        "drop_time": "",
        "driver_age": '24'
    })

    const [searchedVehicles, setSearchedVehicles] = useState([])

    const getCurrentFormattedHourInAuckland = () => {
        const formatter = new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            hour: '2-digit',
            hour12: true,
        });

        // Just to keep the formatter in use if you want future adjustments
        formatter.formatToParts(new Date());

        const hour = "10";
        const dayPeriod = "AM";

        setPickupTime(`${hour}:00 ${dayPeriod}`);
        setDropupTime(`${hour}:00 ${dayPeriod}`);
    };

    const getInitialNZDateTimeUTC = () => {
        const now = new Date();

        // Get NZ parts
        const formatter = new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const parts = formatter.formatToParts(now);

        const year = parts.find(p => p.type === 'year')?.value;
        const month = parts.find(p => p.type === 'month')?.value;
        const day = parts.find(p => p.type === 'day')?.value;
        const hour = parts.find(p => p.type === 'hour')?.value;

        // Construct a local ISO-like string (but not "Z")
        const dateTimeLocal = `${year}-${month}-${day}T${hour}:00:00`;

        // Convert this local NZ time to an actual UTC ISO string
        const nzDate = new Date(`${dateTimeLocal}+12:00`); // +12:00 is common NZ offset (adjusts automatically)
        const utcISOString = nzDate.toISOString();

        // Save actual UTC string
        setSearchVehiclePayload((prev) => ({
            ...prev,
            pickup_time: utcISOString,
            drop_time: utcISOString,
        }));

        // Step 1: Convert to NZ date parts
        const nzDateStr = new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(utcISOString)); // e.g., "24/06/2025"

        // Step 2: Convert back to Date object
        const [dateDay, dateMonth, dateYear] = nzDateStr.split('/');
        const nzDateObj = new Date(`${dateYear}-${dateMonth}-${dateDay}`);

        // setSelectedPickupDate(nzDateObj);
        // setSelectedDropDate(nzDateObj);

        return utcISOString;
    };

    useEffect(() => {
        getCurrentFormattedHourInAuckland()
        getInitialNZDateTimeUTC()
    }, [])



    return (
        <SearchVehicleContext.Provider value={{
            searchVehiclePayload,
            setSearchVehiclePayload,
            searchedVehicles,
            setSearchedVehicles,
            loader,
            setLoader,
            pickupCity,
            setPickupCity,
            pickupTime,
            setPickupTime,
            dropupCity,
            setDropupCity,
            dropupTime,
            setDropupTime,
            selectedPickupDate,
            setSelectedPickupDate,
            selectedDropDate,
            setSelectedDropDate,
            isVehicleSearched,
            setIsVehicleSearched,
            driverAge,
            setDriverAge,
        }}>
            {children}
        </SearchVehicleContext.Provider>
    )
}

export const useSearchVehicle = () => useContext(SearchVehicleContext);