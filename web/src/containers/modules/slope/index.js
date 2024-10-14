import React from 'react';

import './index.css'
import SlopeRoadsList from './roadSections';
import SlopeSegmentList from './roadProjects';
import SlopeProjectDetails from './roadProjectDetails';
import { MainContext } from '../../../contexts/MainContext';
import SlopeRoadsPotentialList from './potentialProjects';

export default function SlopeModule() {

  const {selectedInventory, slopePageSelect} = React.useContext(MainContext)

  return (
    <>
      {slopePageSelect === 'projects' ?
      <div className='slope-container'>
        <div className='slope-lists'>
          <SlopeRoadsList/>
          <br/>
          <SlopeSegmentList/>
        </div>
        <div className='slope-details'>
          {selectedInventory ? <SlopeProjectDetails/> :
          <div> Please select project </div>}
        </div>
      </div> :
      <div className='slope-container'>
        <div className='slope-lists'>
          <SlopeRoadsPotentialList/>
          {/* <br/>
          <SlopeSegmentList/> */}
        </div>
        {/* <div className='slope-details'>
          {selectedInventory ? <SlopeProjectDetails/> :
          <div> Please select project </div>}
        </div> */}
      </div>
        
      }
      
    </>
  )
}