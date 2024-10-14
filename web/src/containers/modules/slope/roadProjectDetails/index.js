import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css';

export default function SlopeProjectDetails() {

  const {selectedInventory} = React.useContext(MainContext)
  return (
    <div className='slope-details-container'>
      <div className='slope-details-list'>
        <div><b>Start Station Limit</b></div>
        <div>{selectedInventory.properties.start_lrp}</div>
        <div><b>End Station Limit</b></div>
        <div>{selectedInventory.properties.end_lrp}</div>
        <div><b>Start Chainage</b></div>
        <div>{selectedInventory.properties.start_chainage}</div>
        <div><b>End Chainage</b></div>
        <div>{selectedInventory.properties.end_chainage}</div>
        <div><b>Length</b></div>
        <div>{selectedInventory.properties.physical_target}</div>
        <div><b>Type of Disaster</b></div>
        <div>Soil Slope Collapse</div>
        <div><b>Scope of work</b></div>
        <div>{selectedInventory.properties.type_of_work}</div>
        <div><b>Side of the Road</b></div>
        <div>Left Side</div>
        <div><b>Road Terrain</b></div>
        <div>{selectedInventory.properties.terrain_ty}</div>
        <div><b>Hazard Risk</b></div>
        <div>{selectedInventory.properties.hazard_risk}</div>
        <div><b>Road Closure Date/s</b></div>
        <div>10/12/2022</div>
        <div><b>Source of Funds</b></div>
        <div>{selectedInventory.properties.source_of_fund}</div>
        <div><b>Latitude</b></div>
        <div></div>
        <div><b>Longitude</b></div>
        <div></div>
        <div><b>Remarks</b></div>
        <div>Damaged Road</div>
      </div>
      {/* <div className='h-details-body'>
        <div>
          test
        </div>
        <div>
          test
        </div>
      </div> */}
    </div>
  )
}