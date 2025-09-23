import React, { useEffect, useState } from 'react'
import './AddressAndPhone.css'
import { IoIosLock, IoMdArrowDropdown } from "react-icons/io";
import { url } from '@/utils/services';

const AddressAndPhone = () => {
  const [showCountries, setShowCountries] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountryItem, setSelectedCountryItem] = useState('')
  // const [addressAndPhon, setAddressAndPhone] = useState({

  // })


  useEffect(() => {
    const handleGetAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
        const data = await res.json();


        const formatted = data
          .map((item) => {
            const root = item.idd?.root || "";
            const suffix = item.idd?.suffixes?.[0] || "";
            return {
              country: item.name.common,
              code: root + suffix, // e.g. +92
            };
          })
          // sort alphabetically by country name
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountriesList(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    handleGetAllCountries();
  }, []);

  const handleSelectCountry = (item) => {
    setSelectedCountryItem(item.country)
    setShowCountries(false);
  }

  // const handleGetAddressAndPhone = async () => {
  //   const api = `${url}/customer/address`
  // }


  return (
    <div className='address-and-phone-main-contianer'>
      <div className='address-and-phone-width-controller'>

        <div className='address-input-contianer'>
          <h3 className='address-and-phone-heading'>Address</h3>
          <div className='address-details'>

            <div className='two-input-row'>
              <label>
                Street number & name 
                <input type='text' />
              </label>

              <label>
                Suburb 
                <input type='text' />
              </label>
            </div>

              <div className='two-input-row'>
              <label>
                City/town 
                <input type='text' />
              </label>

              <label>
                Post code
                <input type='text' />
              </label>
            </div>

            <div className='country-dropdown-main-continar'>
              <p className='country-dropdown-main-continar-label'>Country</p>
              <div className='country-dropdown-label' onClick={() => setShowCountries(!showCountries)}>
                <p>{selectedCountryItem !== '' ? selectedCountryItem : 'Select Country'}</p>
                <IoMdArrowDropdown size={20} color='var(--primary-color)' />
              </div>

              <div className={`country-dropdown-list-container ${showCountries ? 'show-countries-list' : ''}`}>
                {countriesList.map((item, index) => (
                  <p 
                    key={index} 
                    className={`countries-list-item ${selectedCountryItem === item.country ? 'active-country-list-item' : ''}`}
                    onClick={() => handleSelectCountry(item)}
                  >
                    {item.country}
                  </p>
                ))}
              </div>

            </div>

          </div>
        </div>

        <div className='phone-input-contianer'>
          <h3 className='address-and-phone-heading'>Phone</h3>

          <div className='phone-input'>
            <p>Phone number</p>
            <input type='text' />
          </div>
        </div>

        <span className='protected-data-message'>
          <IoIosLock size={20} color='var(--primary-color)' />
          Your personal information is secure and encrypted
        </span>
        
        <button className='address-and-phone-save-button'>Save Address & Phone</button>
      </div>
    </div>
  )
}

export default AddressAndPhone