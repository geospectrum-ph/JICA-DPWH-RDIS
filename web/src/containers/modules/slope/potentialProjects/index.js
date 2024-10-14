import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function SlopeRoadsPotentialList() {
  const {roadSection, origDataHazard, terrain, setMapCenter, setTerrainList, annex2} = React.useContext(MainContext)
  
  const filterTerrainSegments = (id) => {
    setTerrainList(annex2.filter((t) => {
      return t.section_id === id
    }))
  }

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

  const identifyTerrain = (id) => {
    var terrainData = terrain.filter((data) => {
      return data.section_id === id
    })

    if(terrainData.length > 0){
      if (terrainData[0].terrain_ty === "High") {
        return '#329632'
      } else if (terrainData[0].terrain_ty === 'Medium') {
        return '#E27728'
      } else if (terrainData[0].terrain_ty === 'High') {
        return '#ff0000'
      } else return '#808080'
    } else return '#808080'
  }

  return(
    <div className='hazard-roadsections-container'>
      <div className='hazard-roadsections-header'>
        <b>LIST OF ROAD SECTIONS</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Search.."/>
        <span class="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {roadSection.length > 0 ? roadSection.map((section) => {
          return <div className='hazard-list-item' onClick={()=>filterTerrainSegments(section.properties.SECTION_ID)}>
            <div className='hazard-list-id'>{section.properties.SECTION_ID}</div> <div>{section.properties.ROAD_NAME}</div>
          </div>
        }) : null}
      </div>
      <br/>
      <div className='slope-potential-legend'>
        
      </div>
    </div>
  )
}