'use client'

import { createContext, useContext, useEffect, useState } from "react";;

const SearchVehicleContext = createContext();

export const SearchVehicleProvider = ({children}) =>  {
    const [searchVehiclePayload, setSearchVehiclePayload] = useState({
        "pickup_location": null,
        "drop_location":  null,
        "pickup_time": "2025-06-01T17:30:00.000Z",
        "drop_time": "2025-06-01T18:23:00.000Z"
    })
    useEffect(() => {console.log("searhced value", searchVehiclePayload)}, [searchVehiclePayload])
    return (
        <SearchVehicleContext.Provider value={{
            searchVehiclePayload,
            setSearchVehiclePayload,
        }}>
            {children}
        </SearchVehicleContext.Provider>
    )
}

export const useSearchVehicle = () =>  useContext(SearchVehicleContext);