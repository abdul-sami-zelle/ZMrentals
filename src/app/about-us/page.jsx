'use client';
import React from "react";
import './AboutPage.css';
import ServicesHero from "@/components/services-hero/ServicesHero";
import WhyChooseZM from '../../components/why-choose-zm/WhyChooseZM'
import ServiceDetail from "@/components/service-details/ServiceDetail";

export default function AboutUs() {
  return (
    <div className="about-us-page-main-container">
      <ServicesHero
        heading={'Why ZM with us'}
        paraOne={`We're a different kind of car rental company.`}
        paraTwo={'Find out what makes us tick.'}
        buttonText={'What we are about'}
      />

      <div className="about-us-inner-section">
        <div className="about-us-max-width-container">
          <WhyChooseZM />

          <ServiceDetail
            serviceImage={`/assets/images/mix/speedy-rentasl-4.jpg`}
            serviceHeading={'Economy car rental'}
            flexDirection={'row-reverse'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

          <ServiceDetail
            serviceImage={`/assets/images/mix/speedy-rentasl-4.jpg`}
            serviceHeading={'Economy car rental'}
            flexDirection={'row'}
            serviceDescription={'Looking for an affordable and fuel-efficient option for your trip to Auckland? Our Economy Car Rentals are the perfect choice! Enjoy the convenience of a compact car that doesn’t compromise on comfort and reliability. Whether you’re traveling solo or with a small group, our economy cars are designed to provide a smooth and enjoyable driving experience. With competitive pricing and excellent mileage, you can explore Auckland without breaking the bank. Book your economy car rental now and embark on an unforgettable journey.'}
          />

        </div>
      </div>
    </div>
  );
}
