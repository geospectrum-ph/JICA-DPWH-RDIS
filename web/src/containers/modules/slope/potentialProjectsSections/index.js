import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function PotentialSegmentList() {
  const {terrainList, setSelectedPotential, origDataHazard} = React.useContext(MainContext)

  // console.log(terrainList)
  const identifyHazard = (id) => {
    var hazardData = origDataHazard.filter((data) => {
      return data.properties.SECTION_ID === id
    })


    if(hazardData.length > 0){
      if (hazardData[0].properties.HAZARD === "High") {
        return '#329632'
      } else if (hazardData[0].properties.HAZARD === 'Medium') {
        return '#E27728'
      } else if (hazardData[0].properties.HAZARD === 'High') {
        return '#ff0000'
      } else return '#808080'
    } else return '#808080'
    
  }

  const identifyStatus = (status) => {
    if (status === "Repair/Restoration") {
      return '#0000ff'
    } else if (status === 'Continuation of On-going') {
      return '#00ff00'
    } else if (status === 'New Proposal') {
      return '#ff0000'
    } else return '#808080'
  }

  return(
    <div className='hazard-roadsections-container'>
      <div className='hazard-roadsections-header'>
        <b>PROPOSED FOR FUNDING</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Type to Type to search.."/>
        <span className="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='potential-roadsections-list'>
        {terrainList.length > 0 ? terrainList.map((section, index) => {
          return <div className='hazard-list-item' key = {index}
            onClick={()=>setSelectedPotential(section)}
            >
            <div className='hazard-list-id'>{section.section_id}</div>
            {/* <span className="material-symbols-outlined" 
              // style={{color: identifyHazard(section.section_id)}}
              >
              horizontal_rule
            </span> */}
            <div 
              style={{color: identifyStatus(section.project_status)}}
              >{section.start_lrp} to {section.end_lrp}</div>
          </div>
        }) : <div style={{fontSize: '1.5vh'}}>Please Select Road Section from list above</div>}
        <br/>
        {/* <div>
          <div>Legend</div>
          <div>

          </div>
          <div>

          </div>
        </div> */}
      </div>
    </div>
  )
}