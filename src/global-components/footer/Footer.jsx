import React from 'react'
import './Footer.css'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const Footer = () => {

  const footerData = [
    { name: 'Home', link: '#' },
    { name: 'GO Zero', link: '#' },
    { name: 'GO Tesla', link: '#' },
    { name: 'GO App', link: '#' },
    {
      name: 'Vehicles', link: '#', footerItems: [
        { itemName: 'Small Cars', itemLink: '#' },
        { itemName: 'Large Cars / SUVs', itemLink: '#' },
        { itemName: 'Electric Vehicles', link: '#' },
        { itemName: 'Hybrid Cars', itemLink: '#' },
        { itemName: '4 Wheel Drives', itemLink: '#' },
        { itemName: 'Van or people carriers', itemLink: '#' },
        { itemName: 'Car rental accessories', itemLink: '#' },
      ]
    },
    {
      name: 'Deals', link: '#', footerItems: [
        { itemName: 'Hot Deals', itemLink: '#' },
        { itemName: 'Relocation Deals', itemLink: '#' },
        { itemName: 'Partner Deals', itemLink: '#' },
      ]
    },
    {
      name: 'Locations', link: '#', footerItems: [
        { itemName: 'Auckland', itemLink: '#' },
        { itemName: 'Auckland city', itemLink: '#' },
        { itemName: 'Auckland airport', itemLink: '#' },
        { itemName: 'Waiheke', itemLink: '#' },
        { itemName: 'Wellington airport', itemLink: '#' },
        { itemName: 'Nelson airport', itemLink: '#' },
        { itemName: 'Christchurch airport', itemLink: '#' },
        { itemName: 'Queenstown airport', itemLink: '#' },
        { itemName: 'Dunedin airport', itemLink: '#' },
        { itemName: 'Invercargill airport', itemLink: '#' },
      ]
    },
    {
      name: 'Services', link: '#', footerItems: [
        { itemName: 'Car rental insurance', itemLink: '#' },
        { itemName: 'Long-term car rental', itemLink: '#' },
        { itemName: 'One-way car rental', itemLink: '#' },
        { itemName: 'Weekend car rental', itemLink: '#' },
        { itemName: 'Ski car rental', itemLink: '#' },
        { itemName: 'Ski car rental Christchurch', itemLink: '#' },
        { itemName: 'Ski car rental Queenstown', itemLink: '#' },
      ]
    },
    {
      name: 'Explore NZ', link: '#', footerItems: [
        { itemName: 'Trip planner', itemLink: '#' },
        { itemName: 'Travel Guide', itemLink: '#' },
        { itemName: 'GO Play', itemLink: '#' },
        { itemName: 'Travel blog', itemLink: '#' },
        { itemName: 'Snap happy', itemLink: '#' },
        { itemName: 'Drive safe', itemLink: '#' },
        { itemName: 'Tiaki promise', itemLink: '#' },
      ]
    },
    {
      name: 'About Us', link: '#', footerItems: [
        { itemName: 'Why go with us', itemLink: '#' },
        { itemName: 'Awards & Endorsement', itemLink: '#' },
        { itemName: 'Customer reviews', itemLink: '#' },
        { itemName: 'Our team', itemLink: '#' },
        { itemName: 'Work for us', itemLink: '#' },
        { itemName: 'News', itemLink: '#' },
      ]
    },
    {
      name: 'Help', link: '#', footerItems: [
        { itemName: 'Before you book', itemLink: '#' },
        { itemName: 'Ahead of your trip', itemLink: '#' },
        { itemName: 'Help on the road', itemLink: '#' },
        { itemName: 'After your journey', itemLink: '#' },
        { itemName: 'Accounts & App', itemLink: '#' },
      ]
    },
    {
      name: 'Accounts', link: '#', footerItems: [
        { itemName: 'Manage booking', itemLink: '#' },
        { itemName: 'Check-in', itemLink: '#' },
      ]
    },
  ]

  const socialLinks = [
    { icon: <FaFacebookF size={25} color='var(--secondary-color)' />, link: '#'},
    {icon: <FaTiktok size={25} color='var(--secondary-color)' />, link: '#'},
    {icon: <FaInstagram size={25} color='var(--secondary-color)' />, link: '#'},
    {icon: <FaYoutube size={25} color='var(--secondary-color)' />, link: '#'},
  ]

  return (
    <div className='footer-main-container'>

      <div className='footer-menu-items-main-container'>
        {footerData.map((item, index) => (
          <div key={index} className='footer-column'>
            <Link className='footer-menu-heading' href={item.link}>{item.name}</Link>
            <div className='footer-menu-items'>
              {item.footerItems && item.footerItems.length > 0 ? (
                item.footerItems.map((menuItem, itemIndex) => (
                  typeof menuItem.itemLink === 'string' && menuItem.itemLink ? (
                    <Link className='footer-menu-link' href={menuItem.itemLink} key={itemIndex}>
                      {menuItem.itemName}
                    </Link>
                  ) : null
              ))
              ) : (<></>) 
              
              }
            </div>
          </div>
        ))}
      </div>
      <div className='footer-social-and-terms-links-section'>
          <div className='footer-terms-and-privacy-container'>
            <Link className='footer-terms-item' href={'#'}>Privacy & Cookie Policy</Link>
            <Link className='footer-terms-item' href={'#'}>Terms & Conditions</Link>
            <Link className='footer-terms-item' href={'#'}>Careers</Link>
          </div>
          <div className='footer-social-links-container'>
            {socialLinks.map((item, index) => (
              <Link key={index} href={item.link}>
                {item.icon}
              </Link>
            ) )}
          </div>
      </div>
    </div>
  )
}

export default Footer