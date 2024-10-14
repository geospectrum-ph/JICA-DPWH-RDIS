import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'
import { ArcGISMapContext } from '../../../components/map';

export default function SlopeSegmentList() {
  const {selectedSection, setSelectedInventory, roadProjects} = React.useContext(MainContext);
  const {add_layer, recenter_map} = React.useContext(ArcGISMapContext);

  const convertTime = (date) => {
    var d = new Date(date).toLocaleDateString("en-US")

    return d
    
  }

  const checkHazard = (situation) => {
    if (situation === 'Low') {
      return '#329632'
    } else if (situation === 'Medium') {
      return '#E27728'
    } else if (situation === 'High') {
      return '#ff0000'
    } else return '#808080'
  }

  function inventorySelected(section) {
    const point_pair_array = section.geometry.coordinates;

    const lat_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[0])); }, 0);
    const lng_sum = point_pair_array.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[1])); }, 0);

    const mean = [lat_sum/point_pair_array.length, lng_sum/point_pair_array.length];
    const zoom = 18;

    recenter_map(mean, zoom);

    add_layer(section);
  }

  return(
    <div className='hazard-roadsections-container'>
      <div className='hazard-roadsections-header'>
        <b>LIST OF ROAD PROJECTS</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Search.."/>
        <span class="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {selectedSection && roadProjects.length > 0 ? roadProjects.map((section, index) => {
          return <div className='hazard-list-item' key = {index}
            // style={{color: checkHazard(section.properties.HAZARD)}}
            onClick={function () {setSelectedInventory(section); inventorySelected(section)}}>
            <div className='hazard-list-id'>{section.properties.program}</div> <div>{section.properties.start_lrp} to {section.properties.end_lrp}</div>
          </div>
        }) : <div className='hazard-list-select'>Select a road section</div>}
      </div>
    </div>
  )
}