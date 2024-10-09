import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css'
import { MainContext } from '../../../../contexts/MainContext';

export default function EmergencyInventory(props) {
  const {roadSegments2, hazardList, setMapCenter, setScale, setSelectedInventory, setSelectedHazard} = React.useContext(MainContext)

  const {roadName, properties, geometry} = props

  const [segmentList, setSegmentList] = React.useState([])

  const [checked, setChecked] = React.useState(false)

  const navigate = useNavigate();

  React.useEffect(() => {
    setSegmentList(roadSegments2.filter((segment)=> {
      return segment.properties.section_id === properties.SECTION_ID
    }))
  }, [])

  const computeMapCenter = (item) => {
    var index = parseInt(geometry.coordinates.length/2) - 1
    setMapCenter(geometry.coordinates[index])
    console.log(geometry.coordinates[index])

    setChecked(!checked)
  }

  const computeMapCenterSegment = (item) => {
    var index = parseInt(item.coordinates.length/2) - 1
    setMapCenter(item.coordinates[index])
    console.log(item.coordinates)

    setScale(30000)
  }

  const assignHazardSelect = (hazard) => {
    var index = parseInt(geometry.coordinates.length/2) - 1

    navigate(`/home/emergency/${properties.SECTION_ID}`)
    setMapCenter(geometry.coordinates[index])
    setScale(10000)

    setSelectedHazard(hazard)
    // setSelectedSegments(hazardList.filter((segment)=> {
    //   return segment.properties.section_id === properties.SECTION_ID
    // }))
  }

  const checkHazard = (situation) => {
    if (situation === 'passable') {
      return '#329632'
    } else if (situation === 'limitedaccess') {
      return '#E27728'
    } else if (situation === 'notpassable') {
      return '#passable'
    } else return '#808080'
  }
  
  return (
    <div className='inv-container' key={`inv-${properties.section_id}`}>
      <div className='inv-item-container'>
        <div className='inv-item' onClick={computeMapCenter} key={`inv-item-${properties.section_id}`}
          style={{color: checkHazard(properties.situation)}}
          >
          <div className="inv-item-title"> {properties.section_id} {roadName} </div>
        </div>
        <div className={checked ? 'inv-segments-select' : 'inv-segments'}>
        </div>
      </div>
      
      <div className='inv-buttons' onClick={computeMapCenter}>
        <span class="material-symbols-outlined">
          settings
        </span>
      </div>
      <div className='inv-buttons'>
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>
  )
}

function RoadSection() {
  return(
    <>
    </>
  )
}