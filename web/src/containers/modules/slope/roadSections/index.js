import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'
import { ArcGISMapContext } from '../../../components/map';

export default function SlopeRoadsList() {
  const {roadSection, setSelectedSection, setRoadProjects, origDataProjects, setMapCenter} = React.useContext(MainContext)
  const {recenter_map} = React.useContext(ArcGISMapContext);
  
  const filterSlopeSegments = (section) => {
    setRoadProjects(origDataProjects.filter((project) => {
      return project.properties.section_id === section.properties.SECTION_ID
    }).sort((a, b) => { return a.properties.start_lrp - b.properties.start_lrp}))

    setSelectedSection(section)

    const point_pair_array = section.geometry.coordinates[0];

    const lat_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[0])); }, 0);
    const lng_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[1])); }, 0);

    const mean = [lat_sum/point_pair_array.length, lng_sum/point_pair_array.length];
    const zoom = 12;

    recenter_map(mean, zoom);
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
        {roadSection.length > 0 ? roadSection.map((section, index) => {
          return <div className='hazard-list-item' key = {index} onClick={()=>filterSlopeSegments(section)}>
            <div className='hazard-list-id'>{section.properties.SECTION_ID}</div> <div>{section.properties.ROAD_NAME}</div>
          </div>
        }) : null}
      </div>
    </div>
  )
}