'use client'

import React from 'react'
import './PrimaryButton.css'

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
    >
      {primaryText} {primaryIcon}
    </button>
  )
}

export default PrimaryButton