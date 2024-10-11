import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css';

export default function HazardDetails() {

  const {selectedHazard} = React.useContext(MainContext)
  return (
    <div className='h-details-container'>
      <div className='h-details-header'>
        <div><b>Start LRP</b></div>
        <div>{selectedHazard.properties.LRP_DISP1}</div>
        <div><b>End LRP</b></div>
        <div>{selectedHazard.properties.LRP_DISP2}</div>
        <div><b>Latitude</b></div>
        <div> </div>
        <div><b>Longitude</b></div>
        <div> </div>
        <div><b>Date</b></div>
        <div>January 10, 2023</div>
        <div><b>Weather</b></div>
        <div> </div>
        <div><b>Hazard Level</b></div>
        <div>{selectedHazard.properties.HAZARD}</div>
      </div>
      <div className='h-details-body'>
        <div>
          test
        </div>
        <div>
          test
        </div>
      </div>
    </div>
  )
}