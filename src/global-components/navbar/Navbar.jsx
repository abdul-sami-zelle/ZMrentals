'use client'
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Image from 'next/image'
import logoImage from '../../assets/logo.png'
import Link from 'next/link'
import NavCard from '../nav-card/NavCard'
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";

import beforeImage from '../../assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg'
import carImage from '../../assets/images/cars/small_cars_menu_Tablet.jpg'

const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const navData = [
    { id: 1, name: 'Fleet /Vehicles', dropdown: true, link: '/vehicles' },
    { id: 2, name: 'Car rental services', dropdown: false, link: '/car-rental-services' },
    { id: 3, name: 'Booking info', dropdown: false, link: '/booking-info' },
    { id: 4, name: 'Locations', dropdown: false, link: '/locations' },
    { id: 5, name: 'Contact us', dropdown: false, link: '/contact-us' },
    { id: 6, name: 'About us', dropdown: false, link: '/about-us' },
  ]

  const dropdownData = [
    {
      item: 'Fleet /Vehicles',
      data: [
        { name: 'Small Cars', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Electric Vehicles', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Hybrid Cars', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Large Cars / SUVs', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: '4 Wheel Drive', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Van or People Carrier', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Car Rental Accessories', image: beforeImage, link: '#', width: '144px', height: '72px' },
      ]
    },
    {
      item: 'Car rental services',
      data: [
        { name: 'Auckland City', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Auckland Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Waiheke', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Wellington Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Nelson Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Cristchurch Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Queenston Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'Dunedin  Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
        { name: 'InverCargill Airport', image: beforeImage, link: '#', width: '108px', height: '54px' },
      ]
    },
    {
      item: 'Booking info',
      data: [
        { name: 'Hot Deals', image: carImage, link: '#' },
        { name: 'Relocation Deals', image: beforeImage, link: '#', },
      ]
    },
    {
      item: 'Locations',
      data: [
        { name: 'Trip Planner', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Travel Guide', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Go Play', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Travel Blog', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Snap Happy', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Drive Safe', image: beforeImage, link: '#', width: '144px', height: '72px' },
        { name: 'Tiaki Promise', image: beforeImage, link: '#', width: '144px', height: '72px' },
      ]
    },
    {
      item: 'Help',
      data: [
        { name: 'Before You Book', image: beforeImage, link: '#', width: '209px', height: '104px' },
        { name: 'Ahead of Your Trip', image: beforeImage, link: '#', width: '209px', height: '104px' },
        { name: 'Help on the roads', image: beforeImage, link: '#', width: '209px', height: '104px' },
        { name: 'After Your Journey', image: beforeImage, link: '#', width: '209px', height: '104px' },
        { name: 'Account and App', image: beforeImage, link: '#', width: '209px', height: '104px' },
      ]
    },
    {
      item: 'About Us',
      data: [
        { name: 'Why Go With Us?', image: beforeImage, link: '#', width: '173px', height: '86px' },
        { name: 'Awards & Endorsements', image: beforeImage, link: '#', width: '173px', height: '86px' },
        { name: 'Costumer Reviews', image: beforeImage, link: '#', width: '173px', height: '86px' },
        { name: 'Our Team', image: beforeImage, link: '#', width: '173px', height: '86px' },
        { name: 'Work For Us', image: beforeImage, link: '#', width: '173px', height: '86px' },
        { name: 'News', image: beforeImage, link: '#', width: '173px', height: '86px' },
      ]
    },
  ]

  // Find the dropdown data based on the current hovered item
  const getDropdownData = () => {
    const currentItem = navData.find(item => item.id === currentIndex);
    return dropdownData.find(data => data.item === currentItem?.name);
  }

  // Mobile Menu Script
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuToggler = () => {
    setOpenMenu(true);
  }

  const handleCloseMenuToggler = () => {
    setOpenMenu(false);
  }

  useEffect(() => {
    const shouldDisableScroll = openMenu;
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [openMenu]);

  useEffect(() => {console.log("current index", currentIndex)}, [currentIndex])


  return (
    <>
      <div className='navbar-main-container'>
        <Image src={logoImage} alt="Logo" className="navbar-logo" />
        <nav className="navbar">
          <ul className="navbar-list">
            {navData.map((item) => (
              <li
                key={item.id}
                className={`navbar-item ${currentIndex === item.id ? 'active' : ''}`}
                onMouseOver={() => setCurrentIndex(item.id)}
              onMouseLeave={() => setCurrentIndex(null)}
              >
                <Link
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className='mobile-view-menu-main-container'>
        <Image src={logoImage} alt='logo image' className='mobile-view-logo' />
        <button className='mobile-menu-toggler' onClick={handleMenuToggler}>
          <IoMenuSharp size={25} />
        </button>
      </div>

      {/* Mobile Side bar */}
      <div className={`mobile-menu-side-bar-main-container ${openMenu ? 'show-mobile-menu' : ''}`}>

        <div className='mobile-menu-bar-nav-section'>
          <div className='mobile-menu-close-container'>
            <button onClick={handleCloseMenuToggler}>
              <IoCloseOutline size={30} color='var(--secondary-color)' />
            </button>
          </div>
          <div className='mobile-menu-nav-items-container'>
            <ul className='mobile-menu-list'>
              {navData.map((item) => (
                <li key={item.id} className='mobile-menu-list-item'>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
        </div>

        <div className='mobile-menu-footer'>

          <div className='mobile-menu-other-options-top'>
            <span>
              <HiOutlineUserCircle size={20} color='var(--secondary-color)' />
              Sign in
            </span>

            <span>
              <FaRegCheckCircle size={20} color='var(--secondary-color)' />
              Check-in
            </span>

            <span>
              <FaRegCheckCircle size={20} color='var(--secondary-color)' />
              Manage booking
            </span>
          </div>

          <div className='mobile-menu-other-options-bottom'>
            <span>
              <MdOutlinePhoneIphone size={20} color='var(--secondary-color)' />
              <strong>NZ</strong> 099741598
              <MdOutlineArrowDropDown size={15} color='var(--secondary-color)' />
            </span>

            <span>
              <IoMailOutline size={20} color='var(--secondary-color)' />
              Email us
            </span>
          </div>

        </div>
      </div>

      {/* Drop down  */}
      {
        currentIndex !== null && navData.find((item) => item.id === currentIndex)?.dropdown && (
          <div 
            className={`nav-drop-down-main-container ${currentIndex !== null ? 'show-drop-down' : ''} `}
            onMouseEnter={() => setCurrentIndex(currentIndex)}
            // Close the dropdown when the cursor leaves
            onMouseLeave={() => setCurrentIndex(null)}
          >
            {
              // Dynamically render dropdown content based on the current item
              getDropdownData()?.data.map((dataItem, index) => (
                <div key={index} style={{ width: dataItem.width }}>
                  <NavCard
                    name={dataItem.name}
                    image={dataItem.image}
                    navLink={dataItem.link}
                    width={dataItem.width}
                    selectedIndex={index}
                    height={dataItem.height}
                  />
                </div>
              ))
            }
          </div>
        )
      }

      

    </>
  )
}

export default Navbar