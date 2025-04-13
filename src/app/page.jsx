'use client';

import DiscountBanner from '../global-components/discount-banner/DiscountBanner'
import Hero from '../global-components/hero-section/Hero'
import GalleryDetails from '../components/gallery-details/GalleryDetails'
import PackageDetails from '../components/package-details/PackageDetails'
import Benefits from '../components/benefit/Benefits'
import FeedbackGallery from '../components/feedback-gallery/FeedbackGallery'
import HappySnapGallery from '../components/happy-snap-gallery/HappySnapGallery'
import Locations from '../components/locations/Locations'
import FrequentlyAsked from '../components/frequently-asked/FrequentlyAsked'
import RollingContent from '../components/rolling-content/RollingContent'

import discountBannerImage from '../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'

export default function Home() {

  const packageDescription = [
    `
      We’ve partnered with CarbonClick to help you effortlessly reduce the environmental impact of your travel here 
      in New Zealand, contributing to a more sustainable tourism sector in Aotearoa. Find out more about the projects 
      offsetting your carbon emissions when you rent a car with GO. We have also achieved a Toitū recertification 
      and are investing carbon credits in support of the highest quality carbon offsetting projects both in New 
      Zealand and internationally.
    `,
  ]

  const packageDescriptionTwo = [
    `
      We’re on a mission at GO Rentals to make travel more sustainable in New Zealand for Kiwis and international visitors.
      As well as our fleet of zero emission electric vehicles and eco-friendly hybrid vehicles, we are a Toitū certified business, 
      plus we’re also integrating Tiaki across our business.
    `,
    `
      iaki means to care for people and place. We hope you'll join us on our mission to look after Aotearoa New Zealand, 
      keeping it safe and beautiful for the next generation of travellers.
    `,
  ]

  const pickAndDropDetails = [
    `
      With our GO App, you'll be on the road (and on your holiday) faster.
    `,
    `
      Keep all your car rental info close at hand with no need to trawl through your emails. Our app icon is 
      bright pink so brighten up your home screen and make your car rental experience in New Zealand super-simple.
    `,
  ]

  const aboutGoRentals = [
    `
      Here at GO we’re all about helping our customers turn their daydream into reality.
    `,
    `
      Whether it’s a weekend away or the adventure of a lifetime, we’re excited to be part of your trip.
    `,
    `
      We'll take care of the important stuff and point out the fun things you can do while on the road - freeing you up to really enjoy the journey.
    `,
    `
      GO love every moment with the perfect rental car for your journey.
    `,
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column',  padding: '56px 0', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

      <Hero />

      <DiscountBanner
        discountImage={discountBannerImage}
      />

      <GalleryDetails 
        flexDirection={'row'} 
      />

      <PackageDetails
        packageHeading={'Sustainable car rental in New Zealand'}
        data={packageDescription}
        flexDirection={'row'}
        buttonText={'Find out more'}
      />

      <PackageDetails
        packageHeading={'Our commitment to the Tiaki Promise'}
        data={packageDescriptionTwo}
        flexDirection={'row-reverse'}
        buttonText={'Find out more'}
      />

      <Benefits />

      <Locations />

      <PackageDetails
        packageHeading={'Ridiculously simple pick-up & drop-off of our rental cars'}
        data={pickAndDropDetails}
        flexDirection={'row'}
        buttonText={'Find out more'}
      />

      <FeedbackGallery />

      <HappySnapGallery />

      <PackageDetails
        packageHeading={'About GO Rentals'}
        data={aboutGoRentals}
        flexDirection={'row-reverse'}
        // buttonText={'Download App'}
        display={'none'}
      />

      <FrequentlyAsked />

      <RollingContent />

    </div>
  );
}
