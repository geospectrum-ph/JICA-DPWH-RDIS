import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'
import { ArcGISMapContext } from '../../../components/map';

export default function HazardSegmentList() {
  const {selectedSection, setSelectedHazard, hazardList} = React.useContext(MainContext)

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

  function surveyClicked(section) {
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
        <b>LIST OF SURVEYS</b>
      </div>
      <div className='hazard-roadsections-search'>
        <input type="text" placeholder="Type to search.."/>
        <span className="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='hazard-roadsections-list'>
        {selectedSection && hazardList.length > 0 ? hazardList.map((section, index) => {
          return <div className='hazard-list-item' key = {index} style={{color: checkHazard(section.properties.HAZARD)}}
            onClick={()=>{setSelectedHazard(section); surveyClicked(section);}}>
            <div className='hazard-list-id'>{convertTime(section.properties.created_da)}</div> <div>{section.properties.LRP_DISP1} to {section.properties.LRP_DISP2}</div>
          </div>
        }) : <div className='hazard-list-select'>Select a road section</div>}
      </div>
    </div>
  )
}