import React from 'react'
import './CarRentalServices.css'
import ServicesHero from '../../components/services-hero/ServicesHero'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner'
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import RentalServiceHeader from '../../components/rental-services-head/RentalServiceHeader'
import ServiceDetail from '../../components/service-details/ServiceDetail'
import serviceImage from '../../assets/images/mix/speedy-rentasl-4.jpg';

const CarRentalServices = () => {
  return (
    <div className='rental-services-details-main-container'>
      <ServicesHero 
        heading={'Why ZM with us'}
        paraOne={`We're a different kind of car rental company.`}
        paraTwo={'Find out what makes us tick.'}
        buttonText={'What we are about'}
      />
      <div className='rental-services-content-container'>
        <div className='rental-services-max-width-container'>
          <RentalServiceHeader 
            heading={'Car Rental Services in Auckland'}
            description={`Are you planning a trip to Auckland and looking for a hassle-free way to explore the city? Our Car Rental Services in Auckland offer you the perfect solution. 
            Say goodbye to crowded public transport and enjoy the freedom of driving around the beautiful city at your own pace.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Economy car rental'}
            flexDirection={'row'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Economy car rental'}
            flexDirection={'row-reverse'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Economy car rental'}
            flexDirection={'row'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Economy car rental'}
            flexDirection={'row-reverse'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

        </div>
        <DiscountBanner
          discountImage={discountBannerImage}
        />
      </div>
    </div>
  )
}

export default CarRentalServices