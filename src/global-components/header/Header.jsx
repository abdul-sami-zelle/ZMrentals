"use client";
import React, { useEffect, useState } from "react";
import "./Header.css";
import PromotionalHeader from "../promotional-header/PromotionalHeader";

import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Navbar from "../navbar/Navbar";
import Link from "next/link";

const Header = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicHeading = [0, 1, 2]
  useEffect(() => {
    const intervelId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicHeading.length)
    }, 5000)
    return () => clearInterval(intervelId);
  }, [])

  const headerData = [
    { name: "+6421467261",  tel: "tel:+6421467261", icon: MdOutlinePhoneIphone },
    { name: "Email Us", tel: "mailto:info@zmrentals.co.nz", icon: IoMailOutline },
    // { name: 'Manage Booking', icon: FaRegCheckCircle},
    // { name: 'Check-in', icon: FaRegCheckCircle},
    // { name: 'Sign in', icon: HiOutlineUserCircle},
  ];

  return (
    <div className="header-main-container">
      {/* <PromotionalHeader /> */}
      <div className="header-section-container">
        <div className="header-inner-section-container">
          <div className="rotating-message">

          <span>
                Need help?{" "}
                <a className="toll-free-ancor" href="tel:+6421467261">
                  Call +6421467261
                </a>
              </span>

            {/* {currentIndex === 1 ? (
              <span>
                Need help ordering?{" "}
                <a className="toll-free-ancor" href="tel:2153521600">
                  Call 215 352 1600
                </a>
              </span>
            ) : currentIndex === 2 ? (
              <span>
                Learn about my{" "}
                <Link href="/financing" className="toll-free-ancor">
                  Financing Options
                </Link>
              </span>
            ) : (
              <span>Shop everyday low prices!</span>
            )} */}
          </div>

          <ul className="header-list">
            {headerData.map((item, index) => (
              <li key={index} className="header-list-item">
                {item.icon && <item.icon size={20} />}
                <a href={item.tel} className="header-list-item-name">{item.name}</a>
                {/* {item.down && <item.down size={20} className='header-icon' />} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
