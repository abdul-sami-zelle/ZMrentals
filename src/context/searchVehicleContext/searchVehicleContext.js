'use client'

import { createContext, useContext, useEffect, useState } from "react";;

const SearchVehicleContext = createContext();

export const SearchVehicleProvider = ({children}) =>  {
    const [loader, setLoader] = useState(false);
    const [sesionLocation, setSesionLocation] = useState({})
    useEffect(() => {
        const tempData = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
        setSesionLocation(tempData)
    }, []);
    const [searchVehiclePayload, setSearchVehiclePayload] = useState({
        "pickup_location": null,
        "drop_location": null,
        "pickup_time":  "",
        "drop_time":  ""
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
            setLoader
        }}>
            {children}
        </SearchVehicleContext.Provider>
    )
}

export const useSearchVehicle = () =>  useContext(SearchVehicleContext);