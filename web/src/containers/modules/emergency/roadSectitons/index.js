import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function HazardRoadsList() {
  const {roadSection, setSelectedSection, setHazardList, origDataHazard, setMapCenter} = React.useContext(MainContext)
  
  const filterClosureSegments = (section) => {
    setHazardList(origDataHazard.filter((hazard) => {
      return hazard.properties.SECTION_ID === section.properties.SECTION_ID
    }).sort((a, b) => { return a.properties.LRP_DISP1 - b.properties.LRP_DISP1}))

    setSelectedSection(section)
    console.log(section.coordinates)
    setMapCenter(section.geometry.coordinates[0][parseInt(section.geometry.coordinates[0].length/2) - 1])
  }

  return(
    <div className='hazard-roadsections-container'>
      <div className='hazard-roadsections-header'>
        <b>LIST OF ROADS</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Search.."/>
        <span className="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {roadSection.length > 0 ? roadSection.map((section, index) => {
          return <div className='hazard-list-item'key = {index} onClick={()=>filterHazardSegments(section)}>
            <div className='hazard-list-id'>{section.properties.SECTION_ID}</div> <div>{section.properties.ROAD_NAME}</div>
          </div>
        }) : null}
      </div>
    </div>
  )
}