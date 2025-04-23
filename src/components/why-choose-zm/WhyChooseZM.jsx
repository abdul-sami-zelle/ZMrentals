import React from 'react'
import './WhyChooseZM.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const WhyChooseZM = () => {
    const whyWe = [
        {que: 'Outstanding on-road support', ans: `We've got your back - so you can make the most of your time`},
        {que: `Ridiculously simple pick-up and drop-off`, ans: `With our online check-in and app, you'll be through pick up and on the road faster. With our excellent customer service, we personalise the drop off service so you can be on your way to your next location.`}
    ]
  return (
    <div className='why-choose-us-main-contianer'>
        <div className='why-choose-us-inner-container'>
            <span className='why-choose-top-heading'>
                <p>Our promise to you</p>
                <h3>To be there with you every step of the way</h3>
            </span>
            <p>Let's be honest, most companies put a whole lot of stuff on their 'mission page' to talk about how great they are. We prefer action over talk so you can make up your own mind.</p>
            <p>We like to believe that GO is radically changing the way rental car companies work.</p>

            <p>We know other car rental companies can make booking a car difficult, so we've gone above and beyond to simplify the process. We'll take care of the important stuff leaving you the freedom to relax and enjoy the ride in your car hire. This is all so you can get on the road faster, without all the hassles, and GO love every moment of your holiday.</p>

            <div className='why-we-defrent-main-container'>
                <h3>Why we're diffrent</h3>
                <div className='why-we-faq-container'>
                    {whyWe.map((item, index) => (
                        <div key={index} className='why-we-single-faq'>
                            <MdKeyboardDoubleArrowRight />
                            <span>
                                <h3>{item.que}</h3>
                                <p>{item.ans}</p>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhyChooseZM