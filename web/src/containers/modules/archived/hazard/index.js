import React from 'react';

import './index.css';
import HazardRoadsList from './roadSections';
import HazardSegmentList from './hazardSegments';
import HazardDetails from './details';
import { MainContext } from '../../../contexts/MainContext';

export default function HazardModule() {
  const {selectedHazard} = React.useContext(MainContext)

  return (
    <div className='hazard-container'>
      <div className='hazard-roads'>
        <HazardRoadsList/>
        <br/>
        <HazardSegmentList/>
      </div>
      <div className='hazard-details'>
        {selectedHazard ? <HazardDetails/> : <div>Please select a survey</div>}
        
      </div>
    </div>
  )
}