import React from 'react'
import './QuickFacts.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const QuickFacts = () => {

    const quickFacts = [
        {
            heading: 'Minimum Age:', 
            para: (
                <p>
                    <strong>Minimum Age:</strong> You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!`
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Maximum Age:</strong> You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!`
                </p>
            )
        },
        
        {
            para: (
                <p>
                    <strong>New Zealand Licence Rule:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Foreign Licence Rule:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Credit Card Requirement:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Additional Drivers:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Family needs:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },
        {
            para: (
                <p>
                    <strong>Documents for collection:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
                </p>
            )
        },

    ]

    

    return (
        <div className='quick-facts-main-container'>
            <div className='quick-facts-inner-container'>
                {/* <h3>ZM Rentals Customer Quick Facts</h3> */}
                <div className='quick-facts-list-and-space-container'>
                    {/* <div className='empty-space-for-location'></div> */}
                    <ul className='quick-facts-list'>
                    <h3 className='quick-facts-heading'>ZM Rentals Customer Quick Facts</h3>
                    {quickFacts.map((fact, index) => (
                        <li key={index} className='quick-fact-item'>
                            <MdKeyboardDoubleArrowRight className='quick-facts-icon' />
                            {fact.para}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    )
}

export default QuickFacts