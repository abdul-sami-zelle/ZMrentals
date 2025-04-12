import React, { useState } from 'react'
import './DropdownInput.css'
import { MdOutlineArrowDropDown } from "react-icons/md";

const DropdownInput = ({ width, defaultValue, placeholder, data, bgColor }) => {

    const [showList, setShowList] = useState(false);
    const [selectedValue, setSelectedValue] = useState('')
    const handleShowList = () => {
        setShowList((prevState) => prevState === true ? false : true)
    }

    const handleSelectValue = (value) => {
        setSelectedValue(value);
        setShowList(false);
    }




  return (
    <div className={`dropdown-input-main-container ${showList ? 'remove-border-radios-bottom' : ''}`} style={{width: width, backgroundColor: bgColor}}>
        <div className='dropdown-input-selected-value-container' onClick={handleShowList}>
            <div className={`dropdown-placeholder ${selectedValue !== '' ? 'show-place-holder' : ''}`}>
                  <p>{placeholder}</p>
            </div>
            <div className='dropdown-option-select-head'>
                <p>{selectedValue !== '' ? selectedValue : defaultValue}</p>
                <MdOutlineArrowDropDown size={15} color='var(--primary-color)' className='dropdown-arrow-icon' />
            </div>
        </div>
        <div className={`dropdown-list-container ${showList ? 'show-drop-down-list' : ''}`}>
            {data.map((item, index) => (
                <p key={index} onClick={() => handleSelectValue(item)}>{item}</p>
            ))}
        </div>
    </div>
  )
}

export default DropdownInput