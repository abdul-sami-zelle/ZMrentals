import React from 'react'
import './RollingContent.css';
import { BsSun } from "react-icons/bs";
import { GiMountainCave } from "react-icons/gi";


const RollingContent = () => {
    const rollingContentData = [
        {
            icon: BsSun, 
            heading: 'We’re all about YOUR experience',
            content: [
                `
                    Let’s be honest, in the greater scheme of holiday planning, you’re not really that excited about booking your hire car.
                `,
                `
                    This year, we are super-excited to be welcoming back visitors from Australia and the rest of the world to New
                     Zealand and we look forward to helping you to create amazing memories from your time here in New Zealand.
                `,
                `
                    What is fun is planning the holiday and being free to really enjoy the journey.
                `,
                `
                    Visitor experience is extremely important to us at ZM. From booking online via our website, to pick-up and drop-off,
                     we’ve worked hard to make every part of your booking journey reflect that easy holiday feeling.
                `,
                `
                    We’ve backed that up by winning cool stuff too - In 2018, we were thrilled to be announced winner of the Visitor 
                    Experience Award at the New Zealand Tourism Awards - for a car rental company, that’s a pretty big deal!
                `,
                `
                    We have received a perfect 5/5 stars across all categories and won the 2023 Canstar Blue Most Satisfied Customers 
                    Award in the Hire Cars category. We were also winners in this category in 2018, 2020, 2022 & 2023. Couple this 
                    with our amazing customer service and you’ve got a winning combination when it comes to renting a car in New Zealand.
                `,
                `
                    But don’t just take our word for it - check out the reviews of those who have come before you and then come and 
                    experience ZM Rentals for yourself.
                `,
            ]
        },
        {
            icon: GiMountainCave,
            heading: 'Competitive New Zealand Rental Car Rates',
            content: [
                `
                    Everyone says they have the best prices and with the internet offering comparisons of all the rental car options
                    and prices we understand that you’ve done your research.
                `,
                `
                    So you know you can trust us when we tell you that here at ZM, we’re proud to offer some of New Zealand’s most 
                    competitive hire car rates. Whether you’re after one of our super spacious 4x4s or maybe something a bit more 
                    economical, we’ve got some great deals.
                `,
                `
                    When you hire a car with ZM, you’re guaranteed our excellent customer service from the first contact right through 
                    to dropping off your keys, regardless of whether you want to do that by chatting with our excellent team in person 
                    or prefer to go digital on the app. Car rental in NZ doesn’t need to be complicated, so we’ve made things as simple 
                    as we can so you can spend more time planning your trip of a lifetime.
                `,
                `
                    Oh and don’t forget that with GO you’ll get unlimited kilometres and free basic car rental insurance to ensure a 
                    stress-free journey. It really does pay to rent with ZM.
                `,
            ]
        }
    ]
  return (
    <div className='rolling-outer-container'>
          <div className='rolling-content-main-container'>
              {rollingContentData.map((item, index) => (
                  <div key={index} className='rolling-single-details-container'>
                      <item.icon size={90} color='var(--primary-color)' />
                      <h3>{item.heading}</h3>
                      {item.content.map((contentItem, contentIndex) => (
                          <p key={contentIndex}>{contentItem}</p>
                      ))}
                  </div>
              ))}
              <div className='rolling-empty-container'></div>
          </div>
    </div>
  )
}

export default RollingContent