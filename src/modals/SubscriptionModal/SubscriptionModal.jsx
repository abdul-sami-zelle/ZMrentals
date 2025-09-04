import React from 'react'
import './SubscriptionModal.css'
import { IoIosClose, IoMdArrowDropdown } from 'react-icons/io'

const SubscriptionModal = ({showSubscription, setShowSubscription, imgUrl}) => {
  return (
    <div className={`subscription-main-container ${showSubscription ? 'show-subscription' : ''}`} onClick={() => setShowSubscription(false)}>
        <div className={`subscription-inner-modal ${showSubscription ? 'show-subscription-inner' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='subscription-head-container'>
                <div className='subscription-close-and-heading-contianer'> 
                    <h3>Join our ZM Newsletter</h3>
                    <IoIosClose size={20} color='#595959' onClick={() => setShowSubscription(false)} />
                </div>
                <h3 className='subscription-main-heading'>Save 10% off your next adventure</h3>
            </div>

            <div className='subscribe-modal-banner'>
                <img src={imgUrl} alt='img' />
            </div>

            <div className='subscription-terms-and-inputs'>
                <p className=''>Receive exclusive deals, exciting updates, travel tips, and inspiration!</p>

                <div>
                    <div>
                        <label>
                            First Name 
                            <input type='text' />
                        </label>
                        <label>
                            Last Name 
                            <input type='text' />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email 
                            <input type='text' />
                        </label>

                        <div>
                            <p>Which country do you live?</p>
                            <div>
                                <h3>Select Your Country</h3>
                                <IoMdArrowDropdown size={15} color='#595959' />
                            </div>
                        </div>
                    </div>
                </div>

                <p>Read Terms & Conditions</p>
            </div>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default SubscriptionModal