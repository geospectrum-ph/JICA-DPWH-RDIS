import React from 'react';

import './index.css';
import { MainContext } from '../../../contexts/MainContext';
import ItemInventory from './inventory';
import Filter from './filters';
import { Route, Routes } from 'react-router-dom';

export default function SlopeDashboard() {
  const {sampleData, setSampleData, origData} = React.useContext(MainContext);

  const [slopeList, setSlopeList] = React.useState('inventory')

  const filterSlopeList = (selection) => {
    setSlopeList(selection)
    setSampleData({...sampleData, features: origData.features.filter((feat) => {
      if (selection === 'inventory') {
        return feat.properties.inventory === 0
      } return feat.properties.inventory === 1
    })})
  }

  return (
    <div className='main-dashboard-body'>
      <div className='mdb-left'>
        <Filter/>
      </div>
      <div className='mdb-right'>
        <div className='sdb-right-header'>
          <div className={slopeList === 'inventory' ? 'sdb-right-title-selected' : 'sdb-right-title'} 
            onClick={() => filterSlopeList('inventory')}
            >
            <b>Inventory</b>
          </div>
          <div className={slopeList === 'funding' ? 'sdb-right-title-selected' : 'sdb-right-title'} 
            onClick={() => filterSlopeList('funding')}
            >
            <b>For Funding</b>
          </div>
        </div>
        <div className='sdb-right-body'>
          {sampleData.features.map((feat) => {
            
             return <ItemInventory roadName={feat.properties.road_name} properties={feat.properties} geometry={feat.geometry}/>
            
            // console.log(feat.properties.road_name)
          })}
        </div>
      </div>
    </div>
  )
}