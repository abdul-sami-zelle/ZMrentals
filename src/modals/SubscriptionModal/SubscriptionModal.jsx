import React, { useEffect, useState } from 'react'
import './SubscriptionModal.css'
import { IoIosClose, IoMdArrowDropdown } from 'react-icons/io'

const SubscriptionModal = ({ showSubscription, setShowSubscription, imgUrl }) => {

    const [showCountry, setShowCountry] = useState(false);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
                const data = await res.json();

                // Extract only country names
                const countryNames = data.map((country) => country.name.common).sort();

                setCountries(countryNames);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const [subscribePayload, setSubscribePayload] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country: '', 
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setSubscribePayload((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const handleCountrySelect = (item) => {
        setSubscribePayload((prev) => ({
            ...prev,
            country: item
        }))

        setErrors((prev) => ({
            ...prev,
            country: ''
        }))
        setShowCountry(false)
    }

    const handleSubmitSubscription = (e) => {
         e.preventDefault(); 

        let newError = {};
        Object.keys(subscribePayload).forEach((key) => {
            if(!subscribePayload[key]) {
                newError[key] = "Field Required"
            }
        })

        setErrors(newError);

        if(Object.keys(newError).length === 0) {
            alert("you are good to go")
        }
    }


    return (
        <div className={`subscription-main-container ${showSubscription ? 'show-subscription' : ''}`} onClick={() => setShowSubscription(false)}>
            <div className={`subscription-inner-modal ${showSubscription ? 'show-subscription-inner' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='subscription-head-container'>
                    <div className='subscription-close-and-heading-contianer'>
                        <h3>Join our ZM Newsletter</h3>
                        <IoIosClose size={20} color='#595959' onClick={() => setShowSubscription(false)} style={{cursor: 'pointer'}} />
                    </div>
                    <h3 className='subscription-main-heading'>Save 10% off your next adventure</h3>
                </div>

                <div className='subscribe-modal-banner'>
                    <img src={imgUrl} alt='img' />
                </div>

                <div className='subscription-terms-and-inputs'>
                    <p className='subscribe-modal-promotional-text'>Receive exclusive deals, exciting updates, travel tips, and inspiration!</p>

                    <div className='subscrive-modal-inputs'>
                        <div className='subscribe-modal-first-and-last-name'>
                            <label style={{border: errors.first_name ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                                First Name
                                <input type='text' name='first_name' value={subscribePayload.first_name} onChange={handleInputChange} />
                            </label>
                            <label style={{border: errors.last_name ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                                Last Name
                                <input type='text' name='last_name' value={subscribePayload.last_name} onChange={handleInputChange}  />
                            </label>
                        </div>
                        <div className='subscribe-modal-email-and-country'>
                            <label style={{border: errors.email ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                                Email
                                <input type='text' name='email' value={subscribePayload.email} onChange={handleInputChange}  />
                            </label>

                            <div className='subscribe-modal-country-select-main-contianer' style={{border: errors.country ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                                <p>Which country do you live?</p>
                                <div className='subscribe-modal-country-select-head' onClick={() => setShowCountry(!showCountry)}>
                                    <h3>{subscribePayload.country !== '' ? subscribePayload.country : 'Select Your Country'}</h3>
                                    <IoMdArrowDropdown size={15} color='#000' />
                                </div>
                                <div className={`subscribe-modal-country-select-list ${showCountry ? 'show-countries-list' : ''}`}>
                                    {countries.map((item, index) => (
                                        <p key={index} onClick={() => handleCountrySelect(item)}>{item}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className='subscribe-modal-terms-and-conditions'>Read Terms & Conditions</p>
                </div>
                <button className='submit-subscribe-modal-button' onClick={handleSubmitSubscription}>Subscribe</button>
            </div>
        </div>
    )
}

export default SubscriptionModal