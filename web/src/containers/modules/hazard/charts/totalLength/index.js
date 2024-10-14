import React from 'react';

import { MainContext } from '../../../../../contexts/MainContext';

import './index.css'

export default function HighRiskTotal() {
  const {hazardSegments} = React.useContext(MainContext)

  const [length, setLength] = React.useState(0)
  
  React.useEffect(() => {
    var totalLength = 0;

    for (var i = 0; i < hazardSegments.length; i++){
      if (hazardSegments[i].properties.HAZARD === "High") {
        totalLength += hazardSegments[i].properties.SEC_LENGTH
      }
    }

    setLength(totalLength)
  }, [hazardSegments])

  return(
    <div className='closure-total-container'>
      <div className='closure-total-header'>
        <b>LENGTH OF ROADS WITH HIGH RISK (m)</b>
      </div>
      <div className='closure-total-body'>
        {length}
      </div>
      <br/>
      {/* <div className='closure-total-header'>
        <b>TOTAL ROADS W/ LIMITED ACCESS</b>
      </div>
      <div className='closure-total-body'>
        {hazardSegments.filter((segment) => {
          return segment.properties.situation === 'limitedaccess'
        }).length}
      </div> */}
    </div>
  )
}