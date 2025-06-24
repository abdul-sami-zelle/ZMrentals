import React, { useEffect, useState } from 'react'
import './Hero.css'
import BookingForm from '../booking-form/BookingForm'
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Toust from '../../modals/Toust/Toust'


const Hero = () => {
    const { searchVehiclePayload, setSearchedVehicles, setLoader } = useSearchVehicle()
    const router = useRouter()
    const [toustShow, setTOustShow] = useState(false)
    const [toustMessage, setToustMessage] = useState('')

    const handleSearchVehicles = async () => {
        const api = "https://zm.skyhub.pk/cars/available-cars";
        const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;

        try {
            setLoader(true)
            if (pickup_location && drop_location && pickup_time && drop_time) {
                const response = await axios.post(api, searchVehiclePayload);

                if (response.status === 200) {
                    setLoader(false)
                    setSearchedVehicles(response.data);
                    sessionStorage.setItem('pick_and_drop_details', JSON.stringify(searchVehiclePayload));
                    router.push("/vehicles");
                } else {
                    setLoader(false)
                    console.warn(`[WARN] Unexpected status code: ${response.status}`);
                    console.log("Unexpected response from server. Please try again later.");

                }
            } else {
                setTOustShow(true)
                setToustMessage("Please Fill All The Fields To Search Vehicle")
            }


        } catch (error) {
            setLoader(false);
            if (error.response) {
                const status = error.response.status;

                if (status === 400) {
                    setToustMessage("Please Fill All The Fields To Search Vehicle")("Invalid search request. Please check your input and try again.");
                } else if (status >= 500) {
                    setToustMessage("Please Fill All The Fields To Search Vehicle")("Server error occurred. Please try again later.");
                } else {
                    setToustMessage("Please Fill All The Fields To Search Vehicle")("Something went wrong. Please try again.");
                }

                console.error(`[ERROR] ${status}:`, error.response.data);

            } else if (error.request) {
                setToustMessage("Please Fill All The Fields To Search Vehicle")("No response from server. Please check your internet connection.");
                console.error("[NO RESPONSE] Request was made but no response received.");
            } else {
                setToustMessage("Please Fill All The Fields To Search Vehicle")("Unexpected error occurred. Please try again.");
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
            <Toust 
                showToust={toustShow}
                setShowToust={setTOustShow}
                message={toustMessage}
            />
        </div>
    )
}

export default Hero