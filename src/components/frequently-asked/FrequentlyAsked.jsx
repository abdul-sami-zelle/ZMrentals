import React, { useState } from 'react'
import './FrequentlyAsked.css';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';
import { FiPlus } from "react-icons/fi";

const FrequentlyAsked = () => {
    const faqData = [
        { 
            question: 'What do your rental car rates include?', 
            answer: 'We’ve packed your daily rate full of the good stuff. Our rental rates include GST, unlimited kilometres and ZM Basic Insurance cover. Our insurance is subject to an excess.'
        },
        {
            question: 'Where can I find special deals on my car rental?', 
            answer: 'Have you had a look at our deals page? It’s home to our latest discounts and offers and can help you save on your next car hire. Downloading our app is another great way of having everything you need at your fingertips.'
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className='frequently-asked-outer-container'>
        <div className='frequently-asked-inner'>
              <h3>Frequently asked questions</h3>
              <div className='frequently-asked-ques-anw'>
                {faqData.map((item, index) => (
                    <div key={index} className='frequently-asked-single-que-ans'>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                    </div>
                ))}

              </div>
                <div className='mobile-view-frequently-asked-que-ans'>
                    {faqData.map((item, index) => (
                        <div className='mobile-single-faq-main-container' key={index}>
                            <div className='mobile-faq-que' onClick={() => setCurrentIndex((prevIndex) => prevIndex === index ? null : index)}>
                                <FiPlus size={25} color='var(--primary-color)' />
                                <h3>{item.question}</h3>
                            </div>
                            <div className={`mobile-faq-ans ${currentIndex === index ? 'show-ans-drawer' : ''}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
              <SecondaryButton
                  secondaryButtonClass={'secondary-prop-class'}
                  width={'157px'}
                  height={'44px'}
                  secondaryBgColor={'#fff'}
                  secondaryBorder={'2px solid var(--primary-color)'}
                  textColor={'var(--primary-color)'}
                  fontSize={'var(--font-body-lg)'}
                  lineHeight={'var(--line-height-body)'}
                  fontWeight={'var(--font-weight-body)'}
                  secondaryText={'Read more FAQs'}
                  display={'flex'}
              />
        </div>
    </div>
  )
}

export default FrequentlyAsked