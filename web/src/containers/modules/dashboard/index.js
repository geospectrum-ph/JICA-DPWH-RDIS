import React from 'react';

import './index.css'
import RoadsLists from './roadSections';
import ClosureTotal from '../emergency/charts/closureTotal';
import DashboardClassPieChart from './byRoadClassification';
import { MainContext } from '../../../contexts/MainContext';
import ClassPieChart from '../emergency/charts/byRoadClassification';
import HighRiskTotal from '../hazard/charts/totalLength';
import HazardRegionListChart from '../hazard/charts/byRegion';
import SlopeProjectTotal from '../slope/charts/totalAmount';
import SlopeFundingTotal from '../slope/charts/totalForBudgeting';

export default function MainDashboard() {
  const {moduleSummarySelect} = React.useContext(MainContext)
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
      
      {moduleSummarySelect === 'dashboard' ? 
        <div className='md-modules'>
          {/* <ClosureTotal/> */}
          <div className='md-general-charts'>
            <DashboardClassPieChart/>
          </div>
        </div>
      : moduleSummarySelect === 'slope' ? 
        <div className='md-modules-slope'>
          <SlopeProjectTotal/>
          <SlopeFundingTotal/>
          {/* <div className='md-general-charts'>
            {/* <SlopeProjectTotal/>
          </div> */} 
        </div>

      : moduleSummarySelect === 'emergency' ? 
        <div className='md-modules'>
          <ClosureTotal/>
          <div className='md-general-charts'>
            <ClassPieChart/>
          </div>
          

        </div>
      : moduleSummarySelect === 'hazard' ? 
      <div className='md-modules'>
        <HighRiskTotal/>
        <div className='md-general-charts'>
          <HazardRegionListChart/>
        </div>
      </div>
    : null}
        

      
    </div>
  )
}