'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51RzPJtLHKTsmFWu4XxfnAlD04ueOK2W2bpoHLLCc6NhbXrPi9iUzjIFg3fXaUcXoC7haxX4gRVPTX8B1VsVm5LrQ00R6FytuMs")

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}