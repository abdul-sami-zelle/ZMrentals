import React from 'react'
import './Hero.css'
import BookingForm from '../booking-form/BookingForm'
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const Hero = () => {
    const { searchVehiclePayload, setSearchedVehicles, setLoader } = useSearchVehicle()
    const router = useRouter()
    const handleSearchVehicles = async () => {
        const api = "https://zm.skyhub.pk/cars/available-cars";

        try {
            setLoader(true)
            const response = await axios.post(api, searchVehiclePayload);

            if (response.status === 200) {
                console.log("[SUCCESS] Vehicles fetched successfully.");
                setSearchedVehicles(response.data);
                router.push("/vehicles");
                setLoader(false)
                
            } else {
                setLoader(false)
                console.warn(`[WARN] Unexpected status code: ${response.status}`);
                alert("Unexpected response from server. Please try again later.");

            }
            
        } catch (error) {
            setLoader(false);
            if (error.response) {
                const status = error.response.status;

                if (status === 400) {
                    alert("Invalid search request. Please check your input and try again.");
                } else if (status >= 500) {
                    alert("Server error occurred. Please try again later.");
                } else {
                    alert("Something went wrong. Please try again.");
                }

                console.error(`[ERROR] ${status}:`, error.response.data);

            } else if (error.request) {
                alert("No response from server. Please check your internet connection.");
                console.error("[NO RESPONSE] Request was made but no response received.");
            } else {
                alert("Unexpected error occurred. Please try again.");
                console.error("[CLIENT ERROR] Something went wrong:", error.message);
            }
        } finally {
            setLoader(false)
        }
    };

  return (
    <div className='hero-section-main-container'>
        <div className='hero-section-inner-container'>
            <div className='hero-section-content-container'>
                <div className='hero-section-main-heading-container'>
                    <h3>
                        {/* Celebrating 25 Years of ZM: <br />  WIN Your Share of $25,000!* */}
                        Your Auckland <br /> Adventure Starts Here
                    </h3>
                </div>
                <div className='hero-section-main-pera-container'>
                    <p>
                          {/* ZM in to <strong> WIN 1 of 25 car hire vouchers valued at $1,000 each </strong> when you book <br /> your car rental
                          with travel concluded by 31 March 2026 <strong> *See the full T&Cs here </strong> */}
                          Explore Auckland with sustainable & <br /> reliable car rentals - your perfect ride awaits!
                    </p>
                </div>
                <div className='booking-form-container-parent'>
                    <div className='booking-form-width-control-container'>
                        <BookingForm bgColor={'var(--color-white)'} handleSearchVehicles={handleSearchVehicles} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} textColor={'var(--color-white)'} textShadow={'1px 1px 2px #FF8B40;'} primaryButtonText={'Search Cars'} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero