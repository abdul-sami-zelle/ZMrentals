'use client'
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
        heading={'Drive Auckland Your Way'}
        paraOne={`Discover reliable car rental services & explore Auckland with ease`}
        // paraTwo={'Find out what makes us tick.'}
        buttonText={'What we are about'}
      /> 
      <div className='rental-services-content-container'>
        <div className='rental-services-max-width-container'>
          <RentalServiceHeader 
            heading={'Car Rental Services in Auckland'}
            description={`Our car rental services in Auckland offer a wide range of vehicles to suit every need, whether you're here for business or leisure. Enjoy the flexibility and comfort of traveling at your own pace, with reliable options that ensure a smooth journey.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Budget Car Hire'}
            flexDirection={'row'}
            serviceDescription={'Discover Auckland affordably with ZM Car Rentals’ economy car hire services. We offer fuel-efficient, budget-friendly car rentals perfect for solo travelers, couples, or small groups. Our reliable, low-cost vehicles are regularly serviced for smooth rides and excellent mileage. At ZM, we combine comfort, quality, and some of the most competitive rates in Auckland. Whether exploring the city or taking scenic day trips, our affordable car hire gives you the freedom to travel at your own pace. Book your budget car rental with ZM in advance and enjoy a stress-free, economical Auckland adventure. '}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Business Car Rental'}
            flexDirection={'row-reverse'}
            serviceDescription={'ZM Car Rentals in Auckland offers the ideal solution for business travelers seeking stress-free commutes. Avoid public transport delays and unreliable rideshares with our corporate car hire services. Our well-maintained, professional vehicles enhance your image while ensuring smooth, punctual rides to meetings, events, and hotels across Auckland City and nearby suburbs. With a self-drive rental, enjoy the freedom to attend dinner meetings outside the CBD or relax with a scenic drive after work. Book the best business car rental in Auckland with ZM and make your trip seamless, efficient, and hassle-free.'}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Family/Group Car Hire'}
            flexDirection={'row'}
            serviceDescription={`Planning a trip to Auckland with family, friends, or a tourist group? Renting a car is essential for a smooth, stress-free journey. Skip crowded buses and complicated rideshare plans with our family and group car rental options. Ideal for traveling with kids, our spacious minivans, MPVs, and 7-seater rentals offer generous legroom, ample storage, and superior comfort. Whether it's a short outing or a long adventure, our family-friendly car rentals keep everyone together and relaxed. Choose ZM Car Rentals in Auckland for the perfect vehicle and make your group travel more memorable and enjoyable.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Short-Term Car Rental'}
            flexDirection={'row-reverse'}
            serviceDescription={`Need a car in Auckland for a few days or a weekend? ZM Rentals makes short-term car rental simple, flexible, and affordable. Whether you're running errands, attending events, or planning spontaneous day trips, our short-term car hire fits your schedule without long-term commitments. Choose from spacious vehicles for family road trips, compact cars for easy commutes, or sleek options for business travel. Enjoy the freedom to extend your rental if plans change. With ZM Rentals, experience Auckland with a reliable, ready-to-go vehicle perfect for coastal drives, weekend escapes, and everything in between.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Long-Term Car Rental'}
            flexDirection={'row'}
            serviceDescription={`Planning an extended stay in Auckland? ZM Rentals offers flexible long-term car rental options, perfect for locals, travelers, expats, and temporary residents. Skip the stress of public transport and expensive daily taxis with our cost-effective solution. Enjoy the freedom to explore Auckland’s natural beauty, landmarks, and Māori culture at your own pace. Our well-maintained vehicles are ideal for daily commutes, weekend trips, or long drives without the burden of leasing or ownership. With ZM Rentals, experience the convenience, reliability, and affordability of long-term car hire in Auckland — your dependable ride for as long as you need it.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'Self-Drive Car Rental Services in Auckland'}
            flexDirection={'row-reverse'}
            serviceDescription={`Experience the freedom of exploring Auckland on your own terms with our self-drive car rental services. Forget public transport schedules, rigid itineraries, or crowded metros and travel at your own pace in total comfort. Whether you're planning a scenic day trip or visiting top attractions, our self-drive car hire offers ultimate flexibility and convenience. Grab your keys and discover Auckland’s vibrant city center or its serene suburbs. Book your comfortable self-drive rental with ZM today and experience Auckland the way it was meant to be – your way.`}
          />

          <ServiceDetail
            serviceImage={serviceImage}
            serviceHeading={'(optional) Car Rental Insurance'}
            flexDirection={'row'}
            serviceDescription={`At ZM Rentals, your safety and peace of mind matter as much as your comfort. While car rental insurance isn’t mandatory, we highly recommend it for added security on Auckland’s roads. We offer flexible, budget-friendly insurance options to suit your needs. Our Basic Insurance covers essentials like collision damage, theft, and third-party liability. For reduced financial risk, our Excess Reduction Package includes Collision Damage Waiver (CDW) and Loss Damage Waiver (LDW). For full protection, choose our Full Protection Coverage, which covers accidents, theft, windscreen, tires, and more. Drive confidently with ZM Rentals — we've got you covered.`}
          />

        </div>
        <DiscountBanner
          discountImage={discountBannerImage}
          marginBottom={'50px'}
        />
      </div>
    </div>
  )
}

export default CarRentalServices