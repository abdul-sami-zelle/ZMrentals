'use client'

import React, { useState } from 'react'
import './Vehicles.css'
import BookingForm from '@/global-components/booking-form/BookingForm'
import CarDetails from '../../components/car-details/CarDetails'
import smallCar from '../../assets/images/cars/small_cars_menu_Tablet.jpg'
import { HiUserGroup } from "react-icons/hi";

const Vehicles = () => {


  const carsDetails = [
    {
      heading: 'Small Cars',
      description: `Our fleet of small cars is perfect for city driving, solo or couples road trips and business trips. With pick-up locations in all the major city airports, 
      Queenstown, Wellington, Auckland and Christchurch, and more, you can quickly pick up the keys, jump straight into a small rental car and zip your way through city culture, 
      coastal towns and lake districts. Our small cars for hire are modern, all automatic transmission and run on petrol. ,`,
      carsData: [
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
      ],
      viewAll: 'small cars'
    },
    {
      heading: 'Van or people carriers',
      description: `Packing the whole family, band, sports team or crew for an adventure? Or even planning to tick off all the sporting activities New Zealand has to offer? 
      Vans or people carrier rentals may be the way to go for you! From 12-seater people carriers to convenient luggage trailers, GO Rentals is here to make your group 
      travel easy and fun.`,
      carsData: [
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
      ],
      viewAll: 'van or people carriers'
    },
    {
      heading: '4Wheel Drives',
      description: `Our fleet of small cars is perfect for city driving, solo or couples road trips and business trips. With pick-up locations in all the major city airports, 
      Queenstown, Wellington, Auckland and Christchurch, and more, you can quickly pick up the keys, jump straight into a small rental car and zip your way through city culture, 
      coastal towns and lake districts. Our small cars for hire are modern, all automatic transmission and run on petrol. ,`,
      carsData: [
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
      ],
      viewAll: '4wheel drives'
    },
    {
      heading: 'Electric Vehicles',
      description: `Our fleet of small cars is perfect for city driving, solo or couples road trips and business trips. With pick-up locations in all the major city airports, 
      Queenstown, Wellington, Auckland and Christchurch, and more, you can quickly pick up the keys, jump straight into a small rental car and zip your way through city culture, 
      coastal towns and lake districts. Our small cars for hire are modern, all automatic transmission and run on petrol. ,`,
      carsData: [
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
      ],
      viewAll: 'electric vahicles'
    },
    {
      heading: 'Large Cars . SUVs',
      description: `Our fleet of small cars is perfect for city driving, solo or couples road trips and business trips. With pick-up locations in all the major city airports, 
      Queenstown, Wellington, Auckland and Christchurch, and more, you can quickly pick up the keys, jump straight into a small rental car and zip your way through city culture, 
      coastal towns and lake districts. Our small cars for hire are modern, all automatic transmission and run on petrol. ,`,
      carsData: [
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
        { image: '/assets/images/cars/small_cars_menu_Tablet.jpg', name: 'Toyota Yaris', age: '6 Years old', seePrice: 'See Price', transmition: 'Auto', fuelType: 'Petrol' },
      ],
      viewAll: 'large cars . suvs'
    },
  ]

  
  return (
    <div className='page-main-container '>
      {/* Max wiwdth Container Start */}
      <div className='page-max-width-container'>
        <div className='page-main-heading-container'>
          <h3 className='vehicles-main-heading'>Vehicles for rent in New Zealand</h3>
          <BookingForm bgColor={'#f7f7f7'} boxShadow={`none`} textColor={'var(--primary-color)'} primaryButtonText={'Find my car'} />
        </div>
        {carsDetails.map((item, index) => (
          <CarDetails
            key={index}
            data={item}
          />
        ))}

        <div className='group-car-rental-main-container'>
          <h3>Check out group car hires</h3>
          <div className='group-items'>
            <span>
              <HiUserGroup size={30} className='group-people-icons' />
              6-Seater car rental
            </span>
            <span>
              <HiUserGroup size={30} className='group-people-icons' />
              7-Seater car rental
            </span>
            <span>
              <HiUserGroup size={30} className='group-people-icons' />
              10-Seater car rental
            </span>
          </div>
        </div>

      </div>
      {/* Max width Container End */}

      
    </div>
  )
}

export default Vehicles