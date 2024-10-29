import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function ClosureDetails() {
  const {selectedClosure} = React.useContext(MainContext)
  

  return(
    <div className='closure-details-container'>
      <div className='closure-details-header'>
        <b>ROAD CLOSURE DETAILS</b>
      </div>
      <br/>
      {selectedClosure ? 
      <div className='closure-details-body'>
        <div><b>Infrastructure Name</b></div>
        <div>{selectedClosure.properties.infrastructure_name}</div>
        <div><b>Type</b></div>
        <div>{selectedClosure.properties.infra_type}</div>
        <div><b>Status</b></div>
        <div>{selectedClosure.properties.situation === 'notpassable'? <>Not Passable</> : <>Limited Access</>}</div>
        <div><b>Road Closure Date</b></div>
        <div>{selectedClosure.properties.ROAD_NAME}</div>
        {/* <div><b></b></div>
        <div>{selectedClosure.properties.SECTION_ID}</div>
        <div><b>Road Classification</b></div>
        <div>{selectedClosure.properties.ROAD_SEC_C}</div> */}
      </div>
      : <div>Please select road closure from list above</div>}
    </div>
  )
}