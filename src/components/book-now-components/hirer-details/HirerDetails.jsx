'use client'
import React, { useEffect, useRef, useState } from 'react'
import './HirerDetails.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import { useOutsideClick } from '../../../utils/DetectClickOutside'
import useDropdownNavigation from '@/utils/keyPress';
import useDropdownNavigationWithSearch from '@/utils/keyPress';

// import { MdOutlineArrowDropDown } from "react-icons/md";

const HirerDetails = () => {

  

  // const countryList = [
  //   'Pakistan',
  //   'Russia',
  //   'Dubai',
  //   'Saudi Arabia',
  //   'Qatar',
  //   'New Zealand',
  //   'Australia',
  //   'Spain',
  // ]
  const whereFindUs = [
    'Google',
    'Facebook',
    'Instagram',
    'Tiktok',
    'Friends referral',
    'Other',
  ]

  const { bookingPayload, setBookingPayload, errors, setErrors, validateForm, countryCode, setCountryCode } = useBookingContext()

  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [driverAgeShow, setDriverAgeShow] = useState(false);
  const [findUs, setFindUs] = useState(false);
  const [countryList, setCountryList] = useState([]);
  // const [highlightedIndex, setHighlightedIndex] = useState(null);
  // const [searchChar, setSearchChar] = useState("");
  // const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleGetAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
        const data = await res.json();

        console.log("country raw data", data);


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

          console.log("country formates data", formatted)

        setCountryList(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    handleGetAllCountries();
  }, []);

  // useEffect(() => {
  //   if (!parentCountryShow) return;

  //   const handleKeyPress = (e) => {
  //     if (!/^[a-z]$/i.test(e.key)) return; // only letters

  //     const char = e.key.toLowerCase();

  //     if (searchChar === char) {
  //       setCharIndex((prev) => prev + 1);   // ✅ correct setter
  //     } else {
  //       setSearchChar(char);
  //       setCharIndex(0);
  //     }

  //     const matches = countryList
  //       .map((c, i) => ({ ...c, index: i }))
  //       .filter((c) => c.country.toLowerCase().startsWith(char));

  //     if (matches.length > 0) {
  //       const match = matches[charIndex % matches.length]; // cycle
  //       setHighlightedIndex(match.index);

  //       // auto scroll into view
  //       document.getElementById(`country-item-${match.index}`)?.scrollIntoView({
  //         block: "nearest",
  //       });
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);
  //   return () => window.removeEventListener("keydown", handleKeyPress);
  // }, [parentCountryShow, searchChar, charIndex, countryList]);

  const [showCountryCodeList, setShowCountryCodeList] = useState(false);
  const [showLocalCountryCodeList, setShowLocalCountryCodeList] = useState(false);


  useEffect(() => {
    const defaultCountry = bookingPayload.user.country; // or however you set it
    const countryObj = countryList.find(
      (c) => c.country.toLowerCase() === defaultCountry.toLowerCase()
    );

    if (countryObj) {
      setCountryCode(countryObj.code)

    }
  }, [countryList, countryCode, bookingPayload]);





  const handleHirerDetailsAdd = (e) => {
    const { name, value } = e.target;

    setBookingPayload((prev) => {
      let newValue = value;

      // 📧 Email validation
      if (name === "email") {
        const trimmed = value.trim();
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };

          if (trimmed === "") {
            newErrors[name] = "Required";
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmed)) {
              newErrors[name] = "Invalid email format";
            } else {
              delete newErrors[name];
            }
          }

          return newErrors;
        });

        return {
          ...prev,
          user: {
            ...prev.user,
            [name]: value,
          },
        };
      }

      // 📱 Phone validation
      if (name === "phone") {
        const selectedCountry = prev.user.country;
        const countryObj = countryList.find(
          (item) => item.country.toLowerCase() === selectedCountry?.toLowerCase()
        );

        if (countryObj) {
          // Keep only digits
          newValue = value.replace(/\D/g, "");

          // Simple phone length validation (e.g. at least 8 digits)
          if (newValue.length < 8) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              phone: "Invalid phone number",
            }));
          } else {
            setErrors((prevErrors) => {
              const newErrors = { ...prevErrors };
              delete newErrors.phone;
              return newErrors;
            });
          }
        }



        return {
          ...prev,
          user: {
            ...prev.user,
            // [name]: `${countryCode}${newValue}`,
            [name]: newValue,
          },
        };
      }

      // 📞 Local phone (always prepend +64)
      if (name === "local_phone") {
        // Keep only digits
        newValue = value.replace(/\D/g, "");

        // Validate length
        if (newValue.length < 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            local_phone: "Invalid local phone number",
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.local_phone;
            return newErrors;
          });
        }

        return {
          ...prev,
          user: {
            ...prev.user,
            [name]: newValue,
          },
        };
      }

      // Default required check for other fields
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (value.trim() !== "") {
          delete newErrors[name];
        } else {
          newErrors[name] = "Required";
        }
        return newErrors;
      });

      return {
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      };
    });
  };


  const handleSelectLivingCountry = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        country: item.country,
        // phone: item.code
      }
    }));

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.country.trim() !== "") {
        delete newErrors.country;  // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setParentCountryShow(false);
  };

  const driverAgeList = ['21', '22', '23', '24', '25+']

  const handleSellectDriverAge = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        driver_age: item
      }
    }));

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.country;  // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setDriverAgeShow(false);
  };

  const handleFoundTell = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        how_find_us: item
      }
    }))

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.how_find_us;  // remove error
      } else {
        newErrors.how_find_us = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setFindUs(false)
  }


  const livingCountryRef = useRef();
  const driverAgeRef = useRef();
  const foundUsRef = useRef();

  useOutsideClick(livingCountryRef, () => setParentCountryShow(false))
  useOutsideClick(driverAgeRef, () => setDriverAgeShow(false))
  useOutsideClick(foundUsRef, () => setFindUs(false))

  const countryIndex = useDropdownNavigationWithSearch(livingCountryRef, parentCountryShow, 'living-country-item')
  const ageIndex = useDropdownNavigation(driverAgeRef, driverAgeShow, 'hirer-age-list-item')
  const foundUsIndex = useDropdownNavigation(foundUsRef, findUs, 'living-country-item')




  return (
    <div className='hirer-details-main-container'>
      <p>The Hirer's name must match the name of the person collecting the vehicle as shown on their driver licence and credit/debit card</p>

      <div className='hirer-first-and-last-name' >
        <label style={{ border: errors.firstname ? '1px solid red' : '1px solid transparent' }}>
          First name
          <input
            type='text'
            name='firstname'
            value={bookingPayload.user.firstname}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, firstname: e.target.value } }))}
          />
        </label>
        <label style={{ border: errors.lastname ? '1px solid red' : '1px solid transparent' }}>
          Last name
          <input
            type='text'
            name='lastname'
            value={bookingPayload.user.lastname}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, lastname: e.target.value } }))}
          />
        </label>
      </div>

      <div className='hirer-living-country-and-age-container'>

        <div className='hirer-parent-country' ref={livingCountryRef} style={{ border: errors.country ? '1px solid red' : '1px solid transparent' }}>
          <p>Which country do you live in?</p>
          <span onClick={() => setParentCountryShow((prevState) => prevState === true ? false : true)}>
            <h3>{bookingPayload.user.country ? bookingPayload.user.country : 'Please Select'}</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`parent-country-list ${parentCountryShow ? 'show-parent-country-list' : ''}`}>
            {countryList.map((item, index) => (
              <p className={`living-country-item ${countryIndex === index ? 'active-country-item' : ''}`} key={index} id={`country-item-${index}`} onClick={() => handleSelectLivingCountry(item)}>{item.country}</p>
            ))}
          </div>
        </div>

        <div className='hirer-age' ref={driverAgeRef} style={{ border: errors.driver_age ? '1px solid red' : '1px solid transparent' }}>
          <p>Driver Age</p>
          <span onClick={() => setDriverAgeShow((prevState) => prevState === true ? false : true)}>
            <h3>{bookingPayload.user.driver_age ? bookingPayload.user.driver_age : 'Please Select'}</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`hirer-age-list ${driverAgeShow ? 'show-hirer-age-list' : ''}`}>
            {driverAgeList.map((item, index) => (
              <p className={`hirer-age-list-item ${ageIndex === index ? 'active-hirer-age' : ''} `} key={index} onClick={() => handleSellectDriverAge(item)}>{item}</p>
            ))}
          </div>
        </div>

      </div>



      <div className='hirer-first-and-last-name'>
        <label style={{ border: errors.email ? '1px solid red' : '1px solid transparent' }}>
          Email Address
          <input
            type='text'
            name='email'
            value={bookingPayload.user.email}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, email: e.target.value } }))}
          />
        </label>

        <label style={{ border: errors.phone ? '1px solid red' : '1px solid transparent' }}>
          Phone Number

          <div className='hirer-phone-with-country-code'>
            <div className='country-code-dropdown'>
              <p onClick={() => setShowCountryCodeList(!showCountryCodeList)}>{countryCode} <MdOutlineArrowDropDown size={10} color='#535353' /></p>
              <div className={`country-code-list ${showCountryCodeList ? 'show-country-code-list' : ''}`}>
                {countryList.map((item, index) => (
                  <p key={index} className='country-code-list-item' onClick={() => { setCountryCode(item.code); setShowCountryCodeList(false) }}>{item.code}</p>
                ))}
              </div>
            </div>
            <input
              type='text'
              name='phone'
              value={bookingPayload.user.phone}
              onChange={handleHirerDetailsAdd}

            // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, phone: e.target.value } }))}
            />

          </div>
        </label>
      </div>

      <div className='find-us-and-local-phone-number'>



        <label className='local-phone-number' style={{ width: '60%', border: errors.phone ? '1px solid red' : '1px solid transparent' }}>
          Local Phone Number

          <div className='hirer-local-phone-with-country-code'>
            <div className='local-phone-country-code-dropdown'>
              <p>+64</p>
            </div>
            <input
              type='text'
              name='local_phone'
              value={bookingPayload.user.local_phone}
              onChange={handleHirerDetailsAdd}

            />

          </div>
        </label>

        <div className='hirer-parent-country' ref={foundUsRef} style={{ width: '40%', border: errors.how_find_us ? '1px solid red' : '1px solid transparent' }}>
          <p>how did you find us?</p>
          <span onClick={() => setFindUs((prevState) => prevState === true ? false : true)}>
            <h3>{bookingPayload.user.how_find_us.length > 0 ? bookingPayload.user.how_find_us : 'Please Select'}</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`parent-country-list ${findUs ? 'show-parent-country-list' : ''}`}>
            {whereFindUs.map((item, index) => (
              <p className={`living-country-item ${foundUsIndex === index ? 'active-country-item' : ''}`} key={index} onClick={() => handleFoundTell(item)}>{item}</p>
            ))}
          </div>
        </div>



      </div>



      <div className='travel-reason-container'>
        <p>Travel Reason</p>
        <div className='travel-reason-radio-container'>
          <label>
            Leisure
            <input
              type='radio'
              name='Leisure'
              value={'Leisure'}
              checked={bookingPayload.user.travel_reason === 'Leisure'}
              onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, travel_reason: e.target.value } }))}
            />
          </label>

          <label>
            Business
            <input
              type='radio'
              name='Business'
              value={'Business'}
              checked={bookingPayload.user.travel_reason === 'Business'}
              onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, travel_reason: e.target.value } }))}
            />
          </label>
          <label>
            Other
            <input
              type='radio'
              name='Other'
              value={'Other'}
              checked={bookingPayload.user.travel_reason === 'Other'}
              onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, travel_reason: e.target.value } }))}
            />
          </label>

        </div>
      </div>
    </div>
  )
}

export default HirerDetails
