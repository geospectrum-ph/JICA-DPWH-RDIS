import React from 'react';

import './index.css'
import RoadsLists from './roadSections';

export default function MainDashboard() {
  return (
    <div className='md-container'>
      <div className='md-description'>
        <div className='md-description-title'>
          <b>ABOUT THE SYSTEM</b>
        </div>
        <div className='md-description-desc'>
          The Road Disaster Information System (RDIS) developed for the Department of Public Works 
          and Highways (DPWH) through the partnership of the Japan International 
          Cooperation Agency (JICA) and Geospectrum Analytics Services, Inc. The 
          RDIS aims to improve the operational capability of the department in 
          managing road and road disaster information by enhancing and extending 
          the methods utilized in road and road disaster data collection, sharing, 
          and analysis. 
        </div>
      </div>
      <div className='md-roadsections'>
        <RoadsLists/>
      </div>
    </div>
  )
}