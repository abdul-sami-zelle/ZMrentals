import React, { useEffect, useRef, useState } from 'react'
import './DropdownInput.css'
import { MdOutlineArrowDropDown } from "react-icons/md";

const DropdownInput = ({ width, setSelectedCity, height, defaultValue, placeholder, data, bgColor }) => {

    const [showList, setShowList] = useState(false);
    const [selectedValue, setSelectedValue] = useState('')
    const dropdownRef = useRef(null)
    const handleShowList = () => {
        setShowList((prevState) => prevState === true ? false : true)
    }

    const handleSelectValue = (value) => {
        setSelectedValue(value);
        setShowList(false);
        if (setSelectedCity) setSelectedCity(value);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowList(false); // Close only if clicked *outside*
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




  return (
    <div  ref={dropdownRef} className={`dropdown-input-main-container ${showList ? 'remove-border-radios-bottom' : ''}`} style={{width: width, backgroundColor: bgColor}}>
        <div className='dropdown-input-selected-value-container' onClick={handleShowList}>
            <div className={`dropdown-placeholder ${selectedValue !== '' ? 'show-place-holder' : ''}`}>
                  <p>{placeholder}</p>
            </div>
            <div className='dropdown-option-select-head'>
                <p>{selectedValue !== '' ? selectedValue : defaultValue}</p>
                <MdOutlineArrowDropDown size={15} color='var(--primary-color)' className='dropdown-arrow-icon' />
            </div>
        </div>
        <div className={`dropdown-list-container ${showList ? 'show-drop-down-list' : ''}`} style={{height: showList ? height : 0}}>
            {data.map((item, index) => (
                <p key={index} onClick={() => handleSelectValue(item)}>{item}</p>
            ))}
        </div>
    </div>
  )
}

export default DropdownInput