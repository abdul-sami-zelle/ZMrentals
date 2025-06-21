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

    const [searchVehiclePayload, setSearchVehiclePayload] = useState({
        "pickup_location": null,
        "drop_location": null,
        "pickup_time": "",
        "drop_time": ""
    })

    const [searchedVehicles, setSearchedVehicles] = useState([])

    // useEffect(() => {console.log("searched vehicles on vehicle page from context", searchedVehicles)}, [searchedVehicles])
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
        }}>
            {children}
        </SearchVehicleContext.Provider>
    )
}

export const useSearchVehicle = () => useContext(SearchVehicleContext);