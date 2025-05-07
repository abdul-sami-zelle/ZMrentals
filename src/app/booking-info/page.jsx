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
import CancelationPolicyDetails from '../../components/cancelaton-policy-details/CancelationPolicyDetails'

const BookingInfo = () => {

    const insurancePoints = [
      {title: (<> <strong className='global-heading-style'>Basic Insurance:</strong> Our most affordable option, covering collision damage, theft, and third-party liability, though some out-of-pocket costs may apply.  </>)},
      {title: (<> <strong className='global-heading-style'>Excess Reduction Package:</strong>  Our most popular choice, offering Collision Damage Waiver (CDW) and Loss Damage Waiver (LDW) to reduce financial strain.  </>)},
      {title: (<> <strong className='global-heading-style'>Full Protection Coverage:</strong> Comprehensive protection, covering accidents, theft, windscreen damage, tires, and more for total peace of mind.  </>)},
    ]

    const payTypes = [
      {title: (<> <strong className='global-heading-style'>Credit/Debit Cards:</strong>  All major cards accepted for secure, PCI-compliant transactions. </>)},
      {title: (<> <strong className='global-heading-style'>Online Payment Platforms:</strong> Verified for added convenience and security.  </>)},
      {title: (<> <strong className='global-heading-style'>Flexible Payment Options:</strong> Pre-pay online or pay on-site with ease. </>)},
    ]

  const cancelationPoints = [
    {title:  `Notify us 48 hours in advance for cancellations to avoid charges.`},
    {title: `Prepaid bookings may incur cancellation fees depending on the timing.`},
    {title:  `Late cancellations or no-shows may result in no refund.`},
    {title: `Post pick-up cancellations may lead to a fee or deposit loss based on rental duration.`},
    {title: `Booking changes (like time or date adjustments) can affect rental rates.`},
    {title: `Refunds (if eligible) are processed within 3 to 10 business days using the original payment method.`},
  ]

  return (
    <div className='booking-info-main-container'>
      <ServicesHero
        heading={'Cruise Auckland in Style'}
        paraOne={`Book your best car rental today and craft a journey to remember `}
        // paraTwo={'Find out what makes us tick.'}
        buttonText={'Book Now'}
      />
      <div className='bookinng-info-content-container'> 
        <div className='booking-info-max-width-container'>
          <RentalServiceHeader
            heading={'Booking Car Rental in Auckland'}
            description={`Booking a car hire in Auckland doesn’t need to be complicated, especially when you choose ZM Rentals. We’ve designed the car rental booking process to be simple and hassle-free, both on the website and in person. `}
          />

          <BookingInstruction />

          <RentalPolicy />

          <CancelationPolicyDetails
            flexDirection={'row-reverse'}
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Insurance Plans to Choose From'}
            desc={`At ZM Rentals, your safety during your Auckland adventure is our priority. While insurance isn’t mandatory with our car rentals, we highly recommend it for extra peace of mind. The right coverage protects you from unexpected costs, ensuring a worry-free experience.
              We offer flexible insurance options to suit different needs and budgets:`}
            points={insurancePoints}
          />

          <CancelationPolicyDetails
            flexDirection={'row'}
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Secure & Feasible Payment Methods'}
            desc={`At ZM Rentals, we believe in offering more than just high-quality vehicles. We prioritize customer satisfaction by providing flexible and secure payment options for booking a car rental in Auckland. We accept all major credit and debit cards, ensuring secure, PCI-compliant transactions. Additionally, we support online payment platforms to make your booking even easier and safer.`}
            points={payTypes}
          />

          <CancelationPolicyDetails
            flexDirection={'row-reverse'}
            serviceImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Booking Cancellation and Refund'}
            desc={`At ZM Rentals, we know travel plans can change, and we aim to make cancellations or modifications as easy and flexible as possible:`}
            points={cancelationPoints}
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