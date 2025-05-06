import React from 'react'
import './RollingContent.css';
import { BsSun } from "react-icons/bs";
import { GiMountainCave } from "react-icons/gi";


const RollingContent = () => {
    const rollingContentData = [
        {
            icon: BsSun, 
            heading: 'Driving in Auckland',
            content: [
                `
                    Driving in Auckland is straightforward, with its well-maintained roads, clear signage, and easy navigation through the city center. The suburban areas, popular with tourists, offer wider, quieter roads and plenty of free parking. Whether you're alone or with others, a car rental is a perfect way to drive across Auckland without the hassle of buses or taxis.
                `,
                `
                    While roads are generally in great condition, be aware that the city center can get busy during peak hours (7-9 AM and 4-6 PM). Public transport options like buses and taxis can become crowded, leading to long waits, something many tourists prefer to avoid. A self-drive car rental lets you plan your itinerary with flexibility, so you can adapt to traffic or change your plans on the go. Our Auckland car rental for tourists will make this independent journey more enjoyable.
                `,
            ]
        },
        {
            icon: GiMountainCave,
            heading: 'Exploring Auckland',
            content: [
                `
                    The best way to explore Auckland is by car, offering you freedom and flexibility to travel at your own pace. With a rental car, you can visit stunning spots, take scenic detours, or chase sunsets - experiences that public transport can’t match. A private car lets you discover hidden gems like Piha and Muriwai beaches or scenic drives around Waitakere Ranges, providing a more authentic and personalized journey.
                `,
                `
                    Renting a car in Auckland is one of the best and most cost-effective ways to explore it instead of relying on buses, taxis, or trains, especially for long trips or group travel. Daily fares for public transport can quickly add up, and coordinating multiple people on buses or taxis can be inconvenient. With a self-drive car hire, you and your companions can travel together comfortably, making your Auckland experience much easier and enjoyable.
                `,
            ]
        },
        {
            icon: GiMountainCave,
            heading: 'Exploring Auckland',
            content: [
                `
                    The best way to explore Auckland is by car, offering you freedom and flexibility to travel at your own pace. With a rental car, you can visit stunning spots, take scenic detours, or chase sunsets - experiences that public transport can’t match. A private car lets you discover hidden gems like Piha and Muriwai beaches or scenic drives around Waitakere Ranges, providing a more authentic and personalized journey.
                `,
                `
                    Renting a car in Auckland is one of the best and most cost-effective ways to explore it instead of relying on buses, taxis, or trains, especially for long trips or group travel. Daily fares for public transport can quickly add up, and coordinating multiple people on buses or taxis can be inconvenient. With a self-drive car hire, you and your companions can travel together comfortably, making your Auckland experience much easier and enjoyable.
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
              {/* <div className='rolling-empty-container'></div> */}
          </div>
    </div>
  )
}

export default RollingContent