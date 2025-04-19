'use client'
import React from 'react'
import './BookingInfo.css';
import ServicesHero from '@/components/services-hero/ServicesHero';
import RentalServiceHeader from '@/components/rental-services-head/RentalServiceHeader';
import BookingInstruction from '../../components/booking-instruction/BookingInstruction'
import RentalPolicy from '../../components/rental-policy/RentalPolicy'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner';
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import ServiceDetail from '@/components/service-details/ServiceDetail';
import insuranceImage from '../../assets/images/mix/Insurance-Coverage12-600x436.jpg'

const BookingInfo = () => {
  return (
    <div className='booking-info-main-container'>
      <ServicesHero
        heading={'Book your Journey'}
        paraOne={`We're a different kind of car rental company.`}
        paraTwo={'Find out what makes us tick.'}
        buttonText={'Book now'}
      />
      <div className='bookinng-info-content-container'>
        <div className='booking-info-max-width-container'>
          <RentalServiceHeader
            heading={'Car Rental Services in Auckland'}
            description={`Are you planning a trip to Auckland and looking for a hassle-free way to explore the city? Our Car Rental Services in Auckland offer you the perfect solution. 
            Say goodbye to crowded public transport and enjoy the freedom of driving around the beautiful city at your own pace.`}
          />

          <BookingInstruction />

          <RentalPolicy />

          <ServiceDetail
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Insurance Coverage'}
            flexDirection={'row-reverse'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Payment Options'}
            flexDirection={'row'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Cancellation and Refund Policy'}
            flexDirection={'row-reverse'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />
          
        </div>
        <DiscountBanner
          discountImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
          marginBottom={'57px'}
        />
      </div>
    </div>
  )
}

export default BookingInfo