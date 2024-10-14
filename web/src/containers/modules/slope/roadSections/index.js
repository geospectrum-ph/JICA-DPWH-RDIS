import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function SlopeRoadsList() {
  const {roadSection, setSelectedSection, setRoadProjects, origDataProjects, setMapCenter} = React.useContext(MainContext)
  
  const filterSlopeSegments = (section) => {
    setRoadProjects(origDataProjects.filter((project) => {
      return project.properties.section_id === section.properties.SECTION_ID
    }).sort((a, b) => { return a.properties.start_lrp - b.properties.start_lrp}))

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
        <span class="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {roadSection.length > 0 ? roadSection.map((section) => {
          return <div className='hazard-list-item' onClick={()=>filterSlopeSegments(section)}>
            <div className='hazard-list-id'>{section.properties.SECTION_ID}</div> <div>{section.properties.ROAD_NAME}</div>
          </div>
        }) : null}
      </div>
    </div>
  )
}