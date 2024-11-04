import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css'
import { MainContext } from '../../../../contexts/MainContext';

export default function ItemInventory(props) {
  const {setMapCenter, setSelectedInventory} = React.useContext(MainContext)

  const {roadName, properties, geometry} = props

  const navigate = useNavigate();

  const computeMapCenter = (id) => {
    var index = parseInt(geometry.coordinates.length/2) - 1
    setMapCenter(geometry.coordinates[index])
    // console.log(geometry.coordinates[index])
  }

  const assignInventorySelect = () => {
    var index = parseInt(geometry.coordinates.length/2) - 1

    navigate(`/home/slope/${properties.objectid}`)
    setMapCenter(geometry.coordinates[index])

    setSelectedInventory(properties)
  }
  
  return (
    <div className='inv-container'>
      <div className='inv-item' onClick={computeMapCenter}>
        <div> {properties.objectid} {roadName} </div>
      </div>
      <div className='inv-buttons' onClick={assignInventorySelect}>
        <span className="material-symbols-outlined">
          settings
        </span>
      </div>
      <div className='inv-buttons'>
        <span className="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>
  )
}