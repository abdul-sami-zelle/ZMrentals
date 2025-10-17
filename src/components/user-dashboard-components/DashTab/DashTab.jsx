import React, { useEffect, useState } from 'react'
import './DashTab.css'
import { url } from '@/utils/services';
import axios from 'axios';
import DashCard from '../DashCard/DashCard'

const DashTab = () => {

  const [dashData, setDashData] = useState({});

  const handleGetDashboardData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/dashboard`;
    try {
      const response = await axios.get(api, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      if(response.status === 200) {
        setDashData(response.data.data)
      }
      console.log("dash response", response);
    } catch (error) {
      console.log("UnExpected Server Error", error);
    }
  }

  useEffect(() => {handleGetDashboardData()}, [])
  return (
    <div className='user-dash-main-container'>
      <div className='user-dash-head-contianer'>
        <DashCard style_name={'white'} />
        <DashCard style_name={'dashboard_tab'}/>
        <DashCard style_name={'white'}/>
        <DashCard style_name={'dashboard_tab'}/>
        <DashCard style_name={'white'}/>
        <DashCard style_name={'dashboard_tab'}/>
      </div>
      <div className='user-dash-car-and-total-booking-contianer'>
        <div className='user-dash-car-contianer'></div>
        <div className='user-dash-total-bookings-chart'></div>
      </div>
    </div>
  )
}

export default DashTab