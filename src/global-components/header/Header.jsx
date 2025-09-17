"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
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
    { name: "+6421467261", tel: "tel:+6421467261", icon: MdOutlinePhoneIphone },
    { name: "Email Us", tel: "mailto:info@zmrentals.co.nz", icon: IoMailOutline },
    { name: "Sing In", tel: "/sign-up", icon: FaRegUser },
  ];

  const [promotionBanner, setPromotionBanner] = useState(false);
  useEffect(() => {

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 90) {
        setPromotionBanner(true); // hide
      } else if (scrollPosition < 60) {
        setPromotionBanner(false); // show again when back up
      }
    };



    document.addEventListener('scroll', handleScroll);

    return () => { document.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <div className="header-main-container">
      {/* <PromotionalHeader /> */}

      <Navbar />
      <div className={`header-section-container ${promotionBanner ? 'hide-promotion-banner' : ''}`}>
        <div className="header-inner-section-container">
          <div className="rotating-message">

            <span>
              Need help?{" "}
              <a className="toll-free-ancor" href="tel:+6421467261">
                Call +6421467261
              </a>
            </span>

          </div>

          <Link
            className='promotion-login-item'
            href={'/sign-up'}
          >
            <FaRegUser />
            Login
          </Link>



          {/* <ul className="header-list">
            {headerData.map((item, index) => (
              <li key={index} className="header-list-item">
                {item.icon && <item.icon size={20} />}
                {item.tel.startsWith('/sign-up') ? (
                  <Link href={item.tel} className="header-list-item-name">{item.name}</Link>
                ) : (
                  <a href={item.tel} className="header-list-item-name">{item.name}</a>
                )}
                
              </li>
            ))}
          </ul> */}
        </div>
      </div>

    </div>
  );
};

export default Header;
