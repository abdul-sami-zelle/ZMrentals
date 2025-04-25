'use client'

import React from 'react'
import './PrimaryButton.css'
import { useRouter } from 'next/navigation';

const PrimaryButton = (
  { 
    width, 
    height, 
    gap, 
    arrowDirection, 
    primaryMainClass, 
    padding, 
    primaryText,
    primaryIcon, 
    fontSize, 
    lineHeight, 
    fontWeight 
  }) => {

    const router = useRouter();
    

    
  return (
    <button 
      className={`primary-button-main-container ${primaryMainClass}`}
      style={{
        width: width,
        height: height,
        gap: gap,
        flexDirection: arrowDirection,
        padding: padding,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fontWeight: fontWeight
      }}
      onClick={() => router.push('/book-now')}
    >
      {primaryText} {primaryIcon}
    </button>
  )
}

export default PrimaryButton