import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css';

export default function SlopePotentialDetails() {

  const {selectedPotential} = React.useContext(MainContext)
  return (
    <div className='slope-details-container'>
      <div className='slope-details-list'>
        <div><b>Project Status</b></div>
        <div>{selectedPotential.project_status}</div>
        <div><b>Start Station Limit</b></div>
        <div>{selectedPotential.start_lrp}</div>
        <div><b>End Station Limit</b></div>
        <div>{selectedPotential.end_lrp}</div>
        <div><b>Length</b></div>
        <div>{selectedPotential.target_length}</div>
        <div><b>Height</b></div>
        <div>{selectedPotential.height}</div>
        <div><b>Gradient</b></div>
        <div>{selectedPotential.gradient}</div>
        <div><b>Target Area</b></div>
        <div>{selectedPotential.target_area}</div>
        <div><b>Disaster Type</b></div>
        <div>{selectedPotential.type_of_disaster}</div>
        <div><b>With Slope Protection</b></div>
        <div>{selectedPotential.with_slope_protection}</div>
        <div><b>Without Slope Protection</b></div>
        <div>{selectedPotential.without_slope_protection}</div>
        <div><b>Failed in the past?</b></div>
        <div>{selectedPotential.past_failure === 'Y' ? <>YES</> : <>NO</>}</div>
        <div><b>Suggested Countermeasure</b></div>
        <div>{selectedPotential.countermeasure_type}</div>
        
        <div><b>Estimated Cost</b></div>
        <div>{selectedPotential.estimated_cost * 1000000}</div>
        <div><b>Remarks</b></div>
        <div>Priority: {selectedPotential.priority_ranking}</div>
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