import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './index.css';
import { MainContext } from '../../../../contexts/MainContext';

export default function SlopeDetails () {
  const {selectedInventory, selectedSegments, setMapCenter, setScale} = React.useContext(MainContext)

  const navigate = useNavigate();

  const {id} = useParams()
  
  const [details, setDetails] = React.useState({})
  const [point, setPoint] = React.useState([])

  const computeMapCenterSegment = (item, props) => {
    var index = parseInt(item.coordinates.length/2) - 1
    setMapCenter(item.coordinates[index])
    // console.log(geometry.coordinates[0][index])

    setDetails(props)
    setPoint(item.coordinates[index])
    setScale(30000)
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

  const checkDamage = (hazard, terrain) => {
    if (hazard === "Medium") {
      if (terrain === "Mountainous" || terrain === "Rolling") {
        return "Potential for Damage"
      } else return ""
    } else if (hazard === "High") {
      return "Damaged road"
    } else return ""
  }

  const generateRandomDate = () => {
    const to = new Date()
    const from = new Date(2020, 1, 1)
    return new Date(
      from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
  }

  const generateRandomRoadSide = () => {
    const choices = ["Left", "Right", "Both"]
    return choices[Math.floor(Math.random() * 3)]
  }

  return (
    <div className='sld-container'>
      <div className='sld-header'>
        <div className='sld-header-back' onClick={()=>navigate('/home/slope')}>
          <b><span class="material-symbols-outlined">
            arrow_back
          </span></b>
        </div>
        <div className='sld-header-title'>
          <b>{selectedInventory.SECTION_ID} {selectedInventory.ROAD_NAME}</b>
        </div>
        <div className='sld-header-buttons'>
          <div className='sld-header-button'>
            <b><span class="material-symbols-outlined">
              edit
            </span></b>
          </div>
          <div className='sld-header-button'>
            <b><span class="material-symbols-outlined">
              print
            </span></b>
          </div>
        </div>
      </div>
      <div className='sld-body'>
        <div className='sld-body-prop'><b>Region</b></div>
        <div className='sld-body-prop'>{selectedInventory.REGION}</div>
        <div className='sld-body-prop'><b>DEO</b></div>
        <div className='sld-body-prop'>{selectedInventory.DEO}</div>
        <div className='sld-body-prop'><b>Congressional District</b></div>
        <div className='sld-body-prop'>{selectedInventory.CONG_DIST}</div>
        <div className='sld-body-prop'><b>Section ID</b></div>
        <div className='sld-body-prop'>{selectedInventory.SECTION_ID}</div>
        <div className='sld-body-prop'><b>Road Name</b></div>
        <div className='sld-body-prop'>{selectedInventory.ROAD_NAME}</div>
        <div className='sld-body-prop'><b>Road Classification</b></div>
        <div className='sld-body-prop'>{selectedInventory.ROAD_SEC_C}</div>
        {/* <div className='sld-body-prop'><b>Category</b></div>
        <div className='sld-body-prop'>{selectedInventory.category}</div> */}
        <div className='sld-body-prop'></div>        
        <div className='sld-body-prop'></div>
        {/* <div className='sld-body-prop'><b>Remarks</b></div>
        <div className='sld-body-prop'>{selectedInventory.remarks_1}</div>
        <div className='sld-body-prop'></div>
        <div className='sld-body-prop'></div> */}
        <div className='sld-body-prop'><b>Road Sections</b></div>
        <div className='sld-body-prop'><b>Details</b></div>
        <div className='sld-body-list-container'>
          {selectedSegments.map((segments) => {
            return <>
              <div className='sld-body-list' style={{color: checkHazard(segments.properties.hazard_risk)}}
                onClick={()=>computeMapCenterSegment(segments.geometry, segments.properties)}>{segments.properties.start_lrp} to {segments.properties.end_lrp}</div>
            </>
              
          })}
        </div>
        {Object.keys(details).length > 0 ? <div className='sld-body-list-details'>
          <div className='sld-segments'><b>Start Station Limit</b></div>
          <div className='sld-segments'>{details.start_lrp}</div>
          <div className='sld-segments'><b>End Station Limit</b></div>
          <div className='sld-segments'>{details.end_lrp}</div>
          <div className='sld-segments'><b>Start Chainage</b></div>
          <div className='sld-segments'>{details.start_chainage}</div>
          <div className='sld-segments'><b>End Chainage</b></div>
          <div className='sld-segments'>{details.end_chainage}</div>
          <div className='sld-segments'><b>Length (m)</b></div>
          <div className='sld-segments'>{details.physical_target}</div>
          <div className='sld-segments'><b>Type of Disaster</b></div>
          <div className='sld-segments'>Soil Slope Collapse</div>
          <div className='sld-segments'><b>Scope of Work</b></div>
          <div className='sld-segments'>{details.detailed_scope_of_work}</div>
          <div className='sld-segments'><b>Side of the road</b></div>
          <div className='sld-segments'>{generateRandomRoadSide()}</div>
          <div className='sld-segments'><b>Road Terrain</b></div>
          <div className='sld-segments'>{details.terrain_ty}</div>
          <div className='sld-segments'><b>Hazard Risk</b></div>
          <div className='sld-segments'>{details.hazard_risk}</div>
          <div className='sld-segments'><b>Road Closure Date(s)</b></div>
          <div className='sld-segments'></div>
          <div className='sld-segments'><b>Source of Funds</b></div>
          <div className='sld-segments'>None</div>
          <div className='sld-segments'><b>Latitude</b></div>
          <div className='sld-segments'>{point[1]}</div>
          <div className='sld-segments'><b>Longitude</b></div>
          <div className='sld-segments'>{point[0]}</div>
          <div className='sld-segments'><b>Remarks</b></div>
          <div className='sld-segments'>{checkDamage(details.hazard_risk, details.terrain_ty)}</div>
        </div> : null}
        
      </div>
    </div>
  )
}