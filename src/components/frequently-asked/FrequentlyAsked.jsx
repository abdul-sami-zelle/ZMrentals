import React, { useState } from 'react'
import './FrequentlyAsked.css';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';
import { FiPlus } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FrequentlyAsked = ({faqData}) => {
    

    const [currentIndex, setCurrentIndex] = useState(null);
    const [desktopIndex, setDesktopIndex] = useState(null)
    

  return (
    <div className='frequently-asked-outer-container'>
        <div className='frequently-asked-inner'>
              <h3 className='section-main-heading'>Frequently asked questions</h3>
              <div className='frequently-asked-ques-anw'>
                {faqData.map((item, index) => (
                    <div key={index} className='frequently-asked-single-que-ans'>
                        <div className={`faq-desktop-head`} onClick={() => setDesktopIndex((prevIndex) => prevIndex === index ? null : index)}>
                            <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' />
                            <h3>{item.question}</h3>
                        </div>
                        <div className={`faq-desktop-body ${desktopIndex === index ? 'show-desktop-body' : ''}`}>
                            <p>{item.answer}</p>
                        </div>
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