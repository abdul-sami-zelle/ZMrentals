'use client'
import React from 'react'
import './LocationsPage.css'
import BookingForm from '@/global-components/booking-form/BookingForm'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner'
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import { TfiLocationPin } from "react-icons/tfi";
import PackageDetails from '@/components/package-details/PackageDetails'
import QuickFackts from '../../components/quick-facts/QuickFacts';
import WhyWithUs from '../../components/why-with-us/WhyWithUs';
import RoadCare from '../../components/road-care/RoadCare'
import ExclusiveDiscount from '../../components/exclusive-discount/ExclusiveDiscount'
import InsuranceCoverage from '../../components/insurance-coverage/InsuranceCoverage'
import PopularCars from '../../components/popular-cars/PopularCars'
import CustomerThoughts from '../../components/customer-thoughts/CustomerThoughts'
import LocationDetails from '../../components/location-details/LocationDetails'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Locations = () => {

  const pickAndDropDetails = [
    `
      Say goodbye to paperwork! We have introduced the fastest check-in possible. Fill in online or download the app and you'll be through pick up and on the road faster.
    `,
  ]

  const navigateEasy = [
    `Enter your itinerary details for a quote`,
    `Select an available modern vehicle`,
    `GO with our free basic insurance or upgrade to reduce your excess`,
    `Book your reservation! You can pay now or at arrival.`,
    `The confirmation email will ask for your check-in details including licence. Fill in online or on our app.`,
    `Head to our branch on your pick-up date and you may be on the road quicker than your can say "Kia Ora"`,
  ]
  
  return (
    <div className='locations-main-outer-contaienr'>

      <div className='page-main-heading-container'>
        <h3 className='vehicles-main-heading'>Car Rental New Zealand</h3>
        <p>ZM the distance with an affordable car rental</p>
        <BookingForm bgColor={'#f7f7f7'} boxShadow={`none`} textColor={'var(--primary-color)'} primaryButtonText={'Find my car'} />
      </div>

      <DiscountBanner
        discountImage={discountBannerImage}
        marginBottom={'57px'}
      />

      <div className='location-max-width-control-container'>

        
        
        {/* <div className='location-page-locations-detail-container'>

          <div className='location-addresses-and-map-container'>
            <div className='loation-map-container'></div>

            <div className='location-desc-and-map-container'>
              <h3>New Zeelan car hire Locations</h3>

              <p>
                Every road in New Zealand leads to "WOW!" With many winding, scenic drives leading to rural snow-capped mountains or pristine lakes,
                you will want to be in the driver's seat for your adventure!
              </p>

              <p>
                Waste no time in exploring every inch of New Zealand. With 9 locations across the North and South Islands, you are never too far away from an easy car rental experience.
              </p>

              <span className='location-pin-point-container'>
                <TfiLocationPin color='var(--color-white)' size={20} />
                Auckland
              </span>
            </div>
          </div>

          <h3>New Zeelan car hire Locations</h3>

          <p>
            Every road in New Zealand leads to "WOW!" With many winding, scenic drives leading to rural snow-capped mountains or pristine lakes,
            you will want to be in the driver's seat for your adventure!
          </p>

          <p>
            Waste no time in exploring every inch of New Zealand. With 9 locations across the North and South Islands, you are never too far away from an easy car rental experience.
          </p>

          <span className='location-pin-point-container'>
            <TfiLocationPin color='var(--color-white)' size={20} />
            Auckland
          </span>

          <p className='location-city-heading'>Auckland city</p>

          <p className='location-details'>
            <strong>Address:</strong>
            165 Beach Road, Auckland City, Auckland, 1010
          </p>
          <p className='location-details'>
            <strong>Office open hours:</strong>
            08:00 - 17:00, 7 days a week.
          </p>
          <p className='location-details'>
            <strong>Pick up & Drop off:</strong>
            08:00 - 17:00, 7 days a week.
          </p>

          <p className='loation-detail-description'>
            Our off-airport location in Auckland CBD is conveniently located to give you flexibility between a city break and a world of adventure. Pick up a small rental
            car to zip through the streets of Auckland or swap to a 4WD to explore the rugged country.
          </p>

        </div> */}

        <LocationDetails />


        {/* Navigate Easy Section */}
        <div className='navigate-easy-main-container'>
            <div className='navigate-easy-inner-container'>
              <h3>Navigate  the easy ZM Booking proccess</h3>

              <p>
                We're on a mission to make the car rental journey in New Zealand as simple as possible! With no shortcuts, just very high standards. From hand-selecting 
                a modern fleet to reducing our emissions and customer paperwork, we want you to cruise with confidence when you GO with us. Hiring a car could not be simpler:
              </p>

              <div className='navigate-easy-options-container'>
                {navigateEasy.map((item, index) => (
                  <div key={index} className='navigate-easy-single-container'>
                    <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>

        


        <PackageDetails
          packageHeading={'GO Rentals App for a ridiculously simple pick-up and drop-off'}
          data={pickAndDropDetails}
          flexDirection={'row'}
          buttonText={'Dawnload App'}
        />

        <QuickFackts />

        <WhyWithUs />

        <RoadCare />

        <PackageDetails
          packageHeading={'GO Rentals App for a ridiculously simple pick-up and drop-off'}
          data={pickAndDropDetails}
          flexDirection={'row-reverse'}
          buttonText={'Dawnload App'}
        />

        <ExclusiveDiscount />

        <InsuranceCoverage />

        <PopularCars />

        <CustomerThoughts />

      </div>
    </div>
  )
}

export default Locations