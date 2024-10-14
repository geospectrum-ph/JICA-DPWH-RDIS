import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'
import { ArcGISMapContext } from '../../../components/map';

import * as turf from "@turf/turf";

export default function HazardRoadsList() {
  const {roadSection, setSelectedSection, setHazardList, origDataHazard, setMapCenter} = React.useContext(MainContext)
  const {recenter_map} = React.useContext(ArcGISMapContext)
  
  const filterHazardSegments = (section) => {
    setHazardList(origDataHazard.filter((hazard) => {
      return hazard.properties.SECTION_ID === section.properties.SECTION_ID
    }).sort((a, b) => { return a.properties.LRP_DISP1 - b.properties.LRP_DISP1}))

    setSelectedSection(section)

    const point_pair_array = section.geometry.coordinates[0];

    const lat_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[0])); }, 0);
    const lng_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[1])); }, 0);

    const mean = [lat_sum/point_pair_array.length, lng_sum/point_pair_array.length];
    const zoom = 12;

    recenter_map(mean, zoom);

    // setMapCenter(section.geometry.coordinates[0][parseInt(section.geometry.coordinates[0].length/2) - 1])
  }

  return(
    <div className='hazard-roadsections-container'>
      <div className='hazard-roadsections-header'>
        <b>LIST OF ROADS</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Type to search.."/>
        <span className="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {roadSection.length > 0 ? roadSection.map((section, index) => {
          return <div className='hazard-list-item' key = {index} onClick={()=>filterHazardSegments(section)}>
            <div className='hazard-list-id'>{section.properties.SECTION_ID}</div> <div>{section.properties.ROAD_NAME}</div>
          </div>
        }) : null}
      </div>
    </div>
  )
}