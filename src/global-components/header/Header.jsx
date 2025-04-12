'use client'
import React from 'react'
import './Header.css'
import PromotionalHeader from '../promotional-header/PromotionalHeader'

import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Navbar from '../navbar/Navbar';

const Header = () => {

  const headerData = [
    {name: 'NZ 099741598', icon: MdOutlinePhoneIphone , down: MdOutlineArrowDropDown},
    { name: 'Email us', icon: IoMailOutline},
    { name: 'Manage Booking', icon: FaRegCheckCircle},
    { name: 'Check-in', icon: FaRegCheckCircle},
    { name: 'Sign in', icon: HiOutlineUserCircle},
  ]

  return (
    <div className='header-main-container'>
      {/* <PromotionalHeader /> */}
      <div className='header-section-container'>
        <div className='header-inner-section-container'>
          <ul className='header-list'>
            {headerData.map((item, index) => (
              <li key={index} className='header-list-item'>
                {/* {item.icon} */}
                {item.icon && <item.icon size={20} />}
                <span className='header-list-item-name'>{item.name}</span>
                {item.down && <item.down size={20} className='header-icon' />}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Header