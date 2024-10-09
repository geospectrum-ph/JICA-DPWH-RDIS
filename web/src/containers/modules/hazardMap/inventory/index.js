import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css'
import { MainContext } from '../../../../contexts/MainContext';

export default function ItemInventory(props) {
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
    var index = parseInt(geometry.coordinates[0].length/2) - 1
    setMapCenter(geometry.coordinates[0][index])
    // console.log(geometry.coordinates[0][index])

    setChecked(!checked)
  }

  const computeMapCenterSegment = (item) => {
    var index = parseInt(item.coordinates.length/2) - 1
    setMapCenter(item.coordinates[index])
    // console.log(geometry.coordinates[0][index])

    setScale(30000)
  }

  const assignHazardSelect = (hazard) => {
    var index = parseInt(geometry.coordinates[0].length/2) - 1

    navigate(`/home/hazard/${properties.SECTION_ID}`)
    setMapCenter(geometry.coordinates[0][index])
    setScale(10000)

    setSelectedHazard(hazard)
    // setSelectedSegments(hazardList.filter((segment)=> {
    //   return segment.properties.section_id === properties.SECTION_ID
    // }))
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
  
  return (
    <div className='inv-container' key={`inv-${properties.OBJECTID_1}`}>
      <div className='inv-item-container'>
        <div className='inv-item' onClick={computeMapCenter} key={`inv-item-${properties.OBJECTID_1}`}
          // style={{color: checkHazard()}}
          >
          <div className="inv-item-title"> {properties.SECTION_ID} {roadName} </div>
        </div>
        <div className={checked ? 'inv-segments-select' : 'inv-segments'}>
          <div className= 'inv-segments-item'>
            {hazardList.filter((segment)=> {
              return segment.properties.SECTION_ID === properties.SECTION_ID
            }).map((item) => {
              return <div className='inv-segments-items' style={{color: checkHazard(item.properties.HAZARD)}}
                onClick={() => assignHazardSelect(item.properties)}>{item.properties.LRP_DISP1} {item.properties.LRP_DISP2}</div>
            })}
          </div>
        </div>
      </div>
      
      {/* <div className='inv-buttons' onClick={assignInventorySelect}>
        <span class="material-symbols-outlined">
          settings
        </span>
      </div>
      <div className='inv-buttons'>
        <span class="material-symbols-outlined">
          delete
        </span>
      </div> */}
    </div>
  )
}

function RoadSection() {
  return(
    <>
    </>
  )
}