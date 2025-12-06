import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useOutsideClick } from "@/utils/DetectClickOutside";

const CountryCodeDropdown = ({ countryList, selectedCountryDetails, setSelectedCountryDetails, errors, bookingPayload, handleHirerDetailsAdd }) => {
    const [showCountryCodeList, setShowCountryCodeList] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredCountries, setFilteredCountries] = useState(countryList);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [focusCameFromTab, setFocusCameFromTab] = useState(false);

    useEffect(() => {
        const handleTabPress = (e) => {
            if (e.key === "Tab") setFocusCameFromTab(true);
        };

        document.addEventListener("keydown", handleTabPress);
        return () => document.removeEventListener("keydown", handleTabPress);
    }, []);

    const countryCodeRef = useRef(null);
    const searchRef = useRef(null);
    const phoneInputRef = useRef(null);

    // 🔍 Filter countries
    useEffect(() => {
        const lower = query.toLowerCase();
        const filtered = countryList.filter(
            (c) =>
                c.country.toLowerCase().includes(lower) ||
                c.code.toLowerCase().includes(lower)
        );
        setFilteredCountries(filtered);
        setActiveIndex(filtered.length ? 0 : -1);
    }, [query, countryList]);

    // ✅ Select country + close + focus phone input
    const handleSelectCountry = (item) => {
        setSelectedCountryDetails(item);
        setShowCountryCodeList(false);
        setQuery("");
        phoneInputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        // Handle Tab navigation manually
        if (e.key === "Tab") {
            e.preventDefault();

            // Only close dropdown if it's open
            if (showCountryCodeList) {
                setShowCountryCodeList(false);
            }

            // Delay focus change to ensure dropdown unmount completes
            setTimeout(() => {
                phoneInputRef.current?.focus();
            }, 100); // <-- 100ms gives React time to re-render safely
            return;
        }

        // Normal keyboard navigation
        if (!showCountryCodeList) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < filteredCountries.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : filteredCountries.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) handleSelectCountry(filteredCountries[activeIndex]);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setShowCountryCodeList(false);
        }
    };

    // 🧭 Auto-focus search when dropdown opens
    useEffect(() => {
        if (showCountryCodeList) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [showCountryCodeList]);


    useEffect(() => {
        if (showCountryCodeList) {
            const index = filteredCountries.findIndex(
                (c) =>
                    c.country === selectedCountryDetails?.country &&
                    c.code === selectedCountryDetails?.code
            );
            setActiveIndex(index !== -1 ? index : 0);

            // Instantly adjust only the inner dropdown scroll, no page shake
            setTimeout(() => {
                const container = document.querySelector(".country-code-inner-list-contianer");
                const activeEl = document.querySelector(".country-code-inner-item.active-code");
                if (container && activeEl) {
                    container.scrollTop =
                        activeEl.offsetTop - container.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;
                }
            }, 0);
        }
    }, [showCountryCodeList, filteredCountries, selectedCountryDetails]);

    // ⚡ TAB from search → go to next field (not reopen dropdown)
    const handleSearchKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            setShowCountryCodeList(false);
            // 👇 Move to next tabbable element after this component
            const focusable = document.querySelectorAll(
                'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const currentIndex = Array.from(focusable).indexOf(phoneInputRef.current);
            if (focusable[currentIndex + 1]) focusable[currentIndex + 1].focus();
        }
    };

    // ⚙️ FIX → Prevent reopening dropdown when tabbing out
    const handleLabelFocus = (e) => {
        // Only open dropdown when clicked or focused by keyboard directly (not tabbing from phone input)
        const fromPhone = phoneInputRef.current && phoneInputRef.current === e.relatedTarget;
        if (!fromPhone && !showCountryCodeList) {
            setShowCountryCodeList(true);
        }
    };

    useOutsideClick(countryCodeRef, () => setShowCountryCodeList(false))


    return (
        <label
            className="width-full-on-phone"
            ref={countryCodeRef}
            style={{
                color: errors.phone ? '#961502' : '#000',
                border: errors?.phone ? "1px solid red" : "1px solid transparent",
            }}
        >
            Phone Number *
            <div  className="hirer-phone-with-country-code" > 
                <div
                    
                    tabIndex={0}
                    className="country-code-dropdown"
                    onMouseDown={(e) => {
                        e.preventDefault(); // prevent losing focus
                        setShowCountryCodeList((prev) => !prev);
                    }}
                    // onFocus={handleLabelFocus}
                    onFocus={(e) => {
                        // ✅ Only open on focus if it's not from a click
                        if (e.detail === 0 && !showCountryCodeList) {
                        // e.detail === 0 means focus not from mouse click (keyboard tab)
                        setShowCountryCodeList(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                >
                    <p>
                        {selectedCountryDetails?.code}{" "}
                        <IoIosArrowDown size={17} color="rgba(204,204,204,1)" strokeWidth={5} />
                    </p>
                </div>

                <input
                    ref={phoneInputRef}
                    type="text"
                    name="phone"
                    value={bookingPayload?.user?.phone}
                    onChange={handleHirerDetailsAdd}
                    placeholder="Enter phone"
                    tabIndex={0}
                    style={{ flex: 1 }}
                onFocus={() => {
                    if(focusCameFromTab) {
                        setShowCountryCodeList(true)
                    }else {
                        setShowCountryCodeList(false)
                    }
                }}
                />
            </div>

            {showCountryCodeList && (
                <div className="country-code-list show-country-code-list">
                    <div className="country-code-drop-down-head">
                        <h3>Selected</h3>
                        <div className="country-code-selected-and-search">
                            <span>
                                <h3>{selectedCountryDetails?.country || "New Zealand"}</h3>
                                <p>{selectedCountryDetails?.code || "+64"}</p>
                            </span>
                            <IoIosArrowDown size={17} color="rgba(204,204,204,1)" strokeWidth={5} />
                        </div>
                        <div className="country-code-search">
                            <button type="button">
                                <CiSearch size={25} color="#000" />
                            </button>
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search Country"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>
                    </div>

                    <div className="country-code-inner-list-contianer">
                        {filteredCountries.map((item, index) => (
                            <span
                                key={index}
                                tabIndex={-1}
                                className={`country-code-inner-item ${index === activeIndex ? "active-code" : ""
                                    }`}
                                onClick={() => handleSelectCountry(item)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <p>{item.country}</p>
                                <p className="country-code-list-item">
                                    {item.code ? `(${item.code})` : ""}
                                </p>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </label>
    );
};

export default CountryCodeDropdown;

