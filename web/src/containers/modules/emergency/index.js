import React from 'react';

import './index.css';
import { MainContext } from '../../../contexts/MainContext';
import EmergencyInventory from './inventory';

export default function EmergencyDashboard() {

  const {roadSegments} = React.useContext(MainContext)
  return (
    <div className='main-dashboard-body'>
      <div className='mdb-left'>
        left
      </div>
      <div className='mdb-right'>
      <div className='sdb-right-header'>
        </div>
        <div className='sdb-right-body'>
          {roadSegments.length? roadSegments.map((feat) => {
            
            return <EmergencyInventory roadName={feat.properties.infrastructure_name} properties={feat.properties} geometry={feat.geometry}/>
        
          }) : <div>None</div> }
        </div>
      </div>
    </div>
  )
}