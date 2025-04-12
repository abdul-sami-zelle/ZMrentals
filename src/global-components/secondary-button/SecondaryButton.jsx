'use client'
import React from 'react'
import './SecondaryButton.css'

const SecondaryButton = ({display, secondaryButtonClass, width, height, secondaryBorder, fontSize, lineHeight, fontWeight, textColor, secondaryBgColor, secondaryText}) => {
  return (
    <button
      className={`secondary-button-main ${secondaryButtonClass}`}
      style={{
        display: display,
        width: width,
        height: height,
        border: secondaryBorder,
        backgroundColor: secondaryBgColor,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fontWeight: fontWeight,
        color: textColor,

      }}
    >
      {secondaryText}
    </button>
  )
}

export default SecondaryButton
