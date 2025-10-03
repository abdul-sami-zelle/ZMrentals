'use client'
import React, { useEffect, useRef, useState } from 'react'
import './HirerDetails.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import { useOutsideClick } from '../../../utils/DetectClickOutside'
import useDropdownNavigation from '@/utils/keyPress';
import useDropdownNavigationWithSearch from '@/utils/keyPress';
import { IoCheckmark } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Select from 'react-select';

// import { MdOutlineArrowDropDown } from "react-icons/md";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "24px",
    height: "24px",
    borderRadius: 0,
    padding: '0 16px',
    border: "none",          // 🚀 removed border from the input
    boxShadow: "none",
    background: 'Transparent',          // no border radius
    borderColor: state.isFocused ? "#961502" : "#ccc", // red on focus/open
    boxShadow: "none",
    "&:hover": {
      borderColor: "#961502",
    },

  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "24px",
    padding: "0",
    border: 'none',
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    fontSize: "13px",        // 🚀 font size set to 13px
    lineHeight: 1.5,         // 🚀 line height set to 1.5
    fontWeight: 400,         // 🚀 font weight set to 400
    color: "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "13px",        // 🚀 same font rules applied to selected value
    lineHeight: 1.5,
    fontWeight: 400,
    color: "#000",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "24px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#961502"
      : state.isFocused
        ? "#961502"
        : "white",    // active/hover red
    color: state.isSelected || state.isFocused ? "white" : "black",
    borderRadius: 0,
    cursor: "pointer",
    minHeight: "24px",
    fontSize: "13px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
    marginTop: 12,
    marginBottom: 0,
    width: "100%",
    border: "1px solid #961502",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: "200px",               // 🚀 cap height to avoid huge dropdown
    overflowY: "auto",                // allow scrolling
    "::-webkit-scrollbar": {
      display: "none",                // 🚀 hide scrollbar (still scrollable)
    },
  }),
};

const HirerDetails = () => {

  const whereFindUs = [
    'Google',
    'Facebook',
    'Instagram',
    'Tiktok',
    'Friends referral',
    'Other',
  ]

  const { bookingPayload, setBookingPayload, errors, setErrors, validateForm, countryCode, setCountryCode, selectedCountryDetails, setSelectedCountryDetails } = useBookingContext()

  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [driverAgeShow, setDriverAgeShow] = useState(false);
  const [findUs, setFindUs] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [filterLivingCountry, setFilterLivingCountry] = useState([])




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
        country: item.value,
        // phone: item.code
      }
    }));
    // setLivingCountryQuery(item.value)

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.value?.trim() !== "") {
        delete newErrors.country;  // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setParentCountryShow(false);
    setMenuOpen(false)
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

  // const [selectedCountryDetails, setSelectedCountryDetails] = useState()
  const [filteredCountries, setFilteredCountries] = useState(countryList)
  const [query, setQuery] = useState('');

  useEffect(() => {
    const defaultCountry = bookingPayload.user.country; // or however you set it
    const countryObj = countryList?.find(
      (c) => c.country.toLowerCase() === defaultCountry?.toLowerCase()
    );

    if (countryObj) {
      setSelectedCountryDetails(countryObj)

    }
    setFilteredCountries(countryList);
    setFilterLivingCountry(countryList)
  }, [countryList, countryCode, bookingPayload]);


  const handleSearchCountryQuery = (query) => {
    setQuery(query);

    if (!query) {
      // if input is empty -> reset to full list
      setFilteredCountries(countryList);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const result = countryList.filter(
      (item) =>
        item.country.toLowerCase().startsWith(lowerCaseQuery) ||
        item.code.toLowerCase().startsWith(lowerCaseQuery)
    );

    setFilteredCountries(result);
  };

  const handleSelectCountryWithCode = (item) => {
    setSelectedCountryDetails(item);
    setShowCountryCodeList(false)
  }
  // const spacificCountries = handleSearchCountryQuery(query)


  // const [livingCountryQuery, setLivingCountryQuery] = useState('')
  // useEffect(() => {
  //   setLivingCountryQuery(bookingPayload?.user?.country)
  // }, [])

  // const handleSearchAndSelectCountry = (query) => {
  //   setLivingCountryQuery(query)
  //   if (!query) {
  //     setFilterLivingCountry(countryList);
  //     return
  //   }

  //   const lowerQuery = query.toLowerCase();
  //   const result = countryList.filter(
  //     (item) =>
  //       item.country.toLowerCase().startsWith(lowerQuery)
  //   )
  //   setFilterLivingCountry(result)
  // }


  const options = filterLivingCountry.map((item) => ({
    value: item.country,
    label: item.country,
  }));

  const [menuOpen, setMenuOpen] = useState(false)

  const livingCountryRef = useRef();
  const driverAgeRef = useRef();
  const foundUsRef = useRef();
  const countryCodeRef = useRef();

  useOutsideClick(livingCountryRef, () => setParentCountryShow(false))
  useOutsideClick(driverAgeRef, () => setDriverAgeShow(false))
  useOutsideClick(foundUsRef, () => setFindUs(false))
  useOutsideClick(countryCodeRef, () => setShowCountryCodeList(false))

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

        <div className='hirer-details-select-contianer'>
          <p>Which country do you live in?</p>
          <Select

            options={options}
            value={options.find((opt) => opt.value === bookingPayload.user.country) || null}
            onChange={(selected) => handleSelectLivingCountry(selected)}
            styles={customStyles}
            isClearable={false}
            isSearchable
            className="my-country-input"
            placeholder="Which country do you live in?"
            menuIsOpen={menuOpen}               // force open/close
            onFocus={() => setMenuOpen(true)}   // open on focus (Tab)
            onBlur={() => setMenuOpen(false)}
            filterOption={(option, inputValue) =>
              option.label.toLowerCase().startsWith(inputValue.toLowerCase())
            }
          />
        </div>

        {/* <div
          className='hirer-parent-country'
          ref={livingCountryRef}
          tabIndex={0}
          role='button'
          aria-expanded={parentCountryShow}
          

          onFocus={(e) => {
            if (e.target === e.currentTarget) {
              setParentCountryShow(true); // open dropdown
              setTimeout(() => {
                const input = document.getElementById("living-country-input");
                if (input) {
                  input.focus();
                  input.setSelectionRange(input.value.length, input.value.length); // move caret to end
                }
              }, 0);
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ')
              && e.target === e.currentTarget   // only run if parent is focus target
              && !parentCountryShow                        // only toggle if dropdown closed
            ) {
              e.preventDefault();
              setParentCountryShow(true);
              setTimeout(() => {
                document.getElementById("living-country-input")?.focus();
              }, 0);
            }
            if (e.key === "ArrowDown" && e.target === e.currentTarget) {
              e.preventDefault();
              setParentCountryShow(true);
              document.getElementById("country-item-0")?.focus();
            }
          }}
          style={{ border: errors.country ? '1px solid red' : '1px solid transparent' }}
        >
          <p>Which country do you live in?</p>
          <span
            // onClick={() => setParentCountryShow((prevState) => prevState === true ? false : true)}
            onClick={() => setParentCountryShow(true)}

          >
            <input
              type='text'
              value={livingCountryQuery}
              onChange={(e) => handleSearchAndSelectCountry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setParentCountryShow(true);
                  document.getElementById("country-item-0")?.focus();
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setParentCountryShow(true);
                  const lastIndex = filterLivingCountry.length - 1;
                  document.getElementById(`country-item-${lastIndex}`)?.focus();
                }
              }}
            />
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div className={`parent-country-list ${parentCountryShow ? 'show-parent-country-list' : ''}`}>
            {filterLivingCountry?.map((item, index) => (
              <p
                tabIndex={0}
                role="option"
                aria-selected={countryIndex === index}
                className={`living-country-item ${countryIndex === index ? 'active-country-item' : ''}`}
                key={index}
                id={`country-item-${index}`}
                onClick={() => handleSelectLivingCountry(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {item.country}
              </p>
            ))}
          </div>
        </div> */}

        <div
          className='hirer-age'
          ref={driverAgeRef}
          tabIndex={0}
          role='button'
          aria-expanded={driverAgeShow}
          onFocus={(e) => {
            if (e.target === e.currentTarget) {
              setDriverAgeShow(true); // open dropdown
            } else {
              setDriverAgeShow(false)
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ')
              && e.target === e.currentTarget   // only run if parent is focus target
              && !driverAgeShow                        // only toggle if dropdown closed
            ) {
              e.preventDefault();
              setDriverAgeShow(true);
            }
            if (e.key === "ArrowDown" && e.target === e.currentTarget) {
              e.preventDefault();
              document.getElementById("driver-item-0")?.focus();
            }
          }}
          style={{ border: errors.driver_age ? '1px solid red' : '1px solid transparent' }}
        >
          <p>Driver Age</p>
          <span
            onClick={() => setDriverAgeShow((prevState) => prevState === true ? false : true)}




          >
            <h3>{bookingPayload.user.driver_age ? bookingPayload.user.driver_age : 'Please Select'}</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div
            className={`hirer-age-list ${driverAgeShow ? 'show-hirer-age-list' : ''}`}

          >
            {driverAgeList.map((item, index) => (
              <p
                className={`hirer-age-list-item ${ageIndex === index ? 'active-hirer-age' : ''} `}
                key={index}
                onClick={() => handleSellectDriverAge(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSellectDriverAge(item);
                  }
                }}
              >
                {item}</p>
            ))}
          </div>
        </div>

      </div>

      <div className='hirer-first-and-last-name flex-colum-on-mobile'>
        <label className='width-full-on-phone' style={{ border: errors.email ? '1px solid red' : '1px solid transparent' }}>
          Email Address
          <input
            type='text'
            name='email'
            value={bookingPayload.user.email}
            onChange={handleHirerDetailsAdd}
          // onChange={(e) => setBookingPayload((prev) => ({ ...prev, user: { ...prev.user, email: e.target.value } }))}
          />
        </label>

        <label ref={countryCodeRef} className='width-full-on-phone' style={{ border: errors.phone ? '1px solid red' : '1px solid transparent' }}>
          Phone Number
          <div className='hirer-phone-with-country-code'>
            <div className='country-code-dropdown'>
              <p onClick={() => setShowCountryCodeList(!showCountryCodeList)}>{selectedCountryDetails?.code} <MdOutlineArrowDropDown size={10} color='#535353' /></p>
            </div>
            <input
              type='text'
              name='phone'
              value={bookingPayload.user.phone}
              onChange={handleHirerDetailsAdd}
            />
          </div>
          <div className={`country-code-list ${showCountryCodeList ? 'show-country-code-list' : ''}`}>
            <div className='country-code-drop-down-head'>
              <h3>Selected</h3>
              <div className='country-code-selected-and-search'>
                <span>
                  <h3>{selectedCountryDetails?.country || 'New Zealand'}</h3>
                  <p>{selectedCountryDetails?.code || '+64'}</p>
                </span>
                <IoCheckmark size={20} color='#000' />
              </div>
              <div className='country-code-search'>
                <button>
                  <CiSearch size={25} color='#000' />
                </button>
                <input type='text' placeholder='search country' value={query} onChange={(e) => handleSearchCountryQuery(e.target.value)} />
              </div>
            </div>

            <div className='country-code-inner-list-contianer'>
              {filteredCountries?.map((item, index) => (
                <span key={index} className='country-code-inner-item' onClick={() => handleSelectCountryWithCode(item)}>
                  <p>{item.country}</p>
                  <p className='country-code-list-item' >{item.code ? `(${item.code})` : ''}</p>
                </span>
              ))}
            </div>
          </div>
        </label>
      </div>

      <div className='find-us-and-local-phone-number'>

        <label className='local-phone-number' style={{ width: '60%' }}>
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

        <div
          className='hirer-parent-country'
          ref={foundUsRef}
          tabIndex={0}
          role='button'
          aria-expanded={findUs}
          onFocus={(e) => {
            if (e.target === e.currentTarget) {
              setFindUs(true); // open dropdown
            } else {
              setFindUs(false)
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ')
              && e.target === e.currentTarget   // only run if parent is focus target
              && !findUs                        // only toggle if dropdown closed
            ) {
              e.preventDefault();
              setFindUs(true);
            }
            if (e.key === "ArrowDown" && e.target === e.currentTarget) {
              e.preventDefault();
              document.getElementById("find-item-0")?.focus();
            }
          }}
          style={{ width: '40%', border: errors.how_find_us ? '1px solid red' : '1px solid transparent' }}

        >
          <p>how did you find us?</p>
          <span onClick={() => setFindUs((prevState) => prevState === true ? false : true)}>
            <h3>{bookingPayload.user.how_find_us.length > 0 ? bookingPayload.user.how_find_us : 'Please Select'}</h3>
            <MdOutlineArrowDropDown size={15} color='var(--primary-details)' />
          </span>
          <div
            className={`parent-country-list ${findUs ? 'show-parent-country-list' : ''}`}
          >
            {whereFindUs.map((item, index) => (
              <p
                className={`living-country-item ${foundUsIndex === index ? 'active-country-item' : ''}`}
                key={index}
                onClick={() => handleFoundTell(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFoundTell(item);
                  }
                }}
              >
                {item}
              </p>
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
