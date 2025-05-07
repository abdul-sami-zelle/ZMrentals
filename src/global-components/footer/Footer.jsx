import React from 'react'
import './Footer.css'
import Link from 'next/link'
// import logo from '../../assets/logo.png'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import Image from 'next/image';

const Footer = () => {

  const footerData = [
    {
      name: 'Vehicles', link: '#', footerItems: [
        { itemName: 'Small Cars', itemLink: '#' },
        { itemName: 'Large Cars / SUVs', itemLink: '#' },
        { itemName: 'Electric Vehicles', link: '#' },
        { itemName: 'Hybrid Cars', itemLink: '#' },
        { itemName: '4 Wheel Drives', itemLink: '#' },
        { itemName: 'Van or people carriers', itemLink: '#' },
        { itemName: 'Car rental accessories', itemLink: '#' },
        { itemName: 'Car rental accessories', itemLink: '#' },
      ]
    },
    {
      name: 'Helpful Links', link: '#', footerItems: [
        { itemName: 'About Us', itemLink: '#' },
        { itemName: 'Why Go With Us', itemLink: '#' },
        { itemName: 'Before You Book', itemLink: '#' },
        { itemName: 'After your journey', itemLink: '#' },
        { itemName: 'Contact Us', itemLink: '#' },
        { itemName: 'News & Events', itemLink: '#' },
      ]
    },
    {
      name: 'Services', link: '#', footerItems: [
        { itemName: 'Car rental insurance', itemLink: '#' },
        { itemName: 'Long-term car rental', itemLink: '#' },
        { itemName: 'Weekend car rental', itemLink: '#' },
      ]
    },
    // {
    //   name: 'Deals', link: '#', footerItems: [
    //     { itemName: 'Hot Deals', itemLink: '#' },
    //   ]
    // },
    // {
    //   name: 'Locations', link: '#', footerItems: [
    //     { itemName: 'Auckland', itemLink: '#' },
    //   ]
    // },
  ]

  const socialLinks = [
    { icon: <FaFacebookF size={25} color='var(--secondary-color)' />, link: '#' },
    { icon: <FaTiktok size={25} color='var(--secondary-color)' />, link: '#' },
    { icon: <FaInstagram size={25} color='var(--secondary-color)' />, link: '#' },
  ]

  return ( 
    <div className='footer-main-container'>
      <div className='footer-bg-container'>
        <div className='footer-width-controller-container'>

          <div className='footer-menu-items-main-container'>

            <div className='footer-column footer-logo-container'>
              <Image src={'/assets/white-logo.png'} width={150} height={50} alt='foote-logo' className='footer-logo-image' />
              <p>Providing seamless, sustainable travel experiences with Auckland car rentals. Find out what makes us tick.</p>
            </div>

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
            <div className='footer-column'>
                <div className='footer-deal-of-month-column'>
                    <h3 className='footer-menu-heading'>Deals Of The Month</h3>
                    <Link href={'#'} className='footer-menu-link'>Hot Deals</Link>
                </div>
                <div className='footer-locations-column'>
                    <h3 className='footer-menu-heading'>Our Locations</h3>
                    <Link href={'#'} className='footer-menu-link'>Auckland</Link>
                </div>
            </div>
          </div>


        </div>
      </div>
      <div className='footer-social-links-main-container'>
        <div className='footer-social-links-width-controller'>

            <div className='footer-social-and-terms-inner-section'>
              <div className='footer-terms-and-privacy-container'>
                <Link className='footer-terms-item' href={'/privacy-policy'}>Privacy & Cookie Policy</Link>
                <Link className='footer-terms-item' href={'terms-and-condition'}>Terms & Conditions</Link>
                {/* <Link className='footer-terms-item' href={'#'}>Careers</Link> */}
              </div>

              

              <div className='footer-social-links-container'>
                {socialLinks.map((item, index) => (
                  <Link key={index} href={item.link}>
                    {item.icon}
                  </Link>
                ))}
              </div>

              <div className='footer-design-by-container'>
                <p>Designed & Managed By</p>
                <Link href={'https://zellesolutions.com/'} target='_blank'>Zelle Solutions</Link>
              </div>

            </div>

        </div>
      </div>


    </div>
  )
}

export default Footer