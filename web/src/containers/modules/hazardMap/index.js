import React from 'react';

import './index.css';
import { MainContext } from '../../../contexts/MainContext';
import ItemInventory from './inventory';
import Filter from './filters';
import { Route, Routes } from 'react-router-dom';

export default function HazardMap() {
  const {roadSection, setRoadSection, origData} = React.useContext(MainContext);

  const [slopeList, setSlopeList] = React.useState('inventory')

  return (
    <div className='main-dashboard-body'>
      <div className='mdb-left'>
        <Filter/>
        <br/>
        {/* <div className="sdb-left-report">Generate report</div> */}
      </div>
      <div className='mdb-right'>
        <div className='sdb-right-header'>
        </div>
        <div className='sdb-right-body'>
          {roadSection.length? roadSection.map((feat) => {
            
             return <ItemInventory roadName={feat.properties.ROAD_NAME} properties={feat.properties} geometry={feat.geometry}/>
        
          }) : <div>None</div> }
        </div>
      </div>
    </div>
  )
}