import React from 'react'
import './WhatsappButton.css';
import { TbBrandWhatsappFilled } from "react-icons/tb";


const WhatsappButton = () => {
  return (
    <button className='whatsapp-button-sticky'>
        <TbBrandWhatsappFilled size={40} color='#FFF' />
    </button>
  )
}

export default WhatsappButton