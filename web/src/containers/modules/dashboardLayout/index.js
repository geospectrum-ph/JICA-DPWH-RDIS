import React from 'react';
import HeaderBar from '../../components/appBar';
import HeaderTitle from '../../components/header';

import './index.css';
import MapComponent from '../tempMap';
import MainDashboard from '../dashboard';

import { MainContext } from '../../../contexts/MainContext';
import SlopeDashboard from '../slope';
import EmergencyDashboard from '../emergency';

export default function Dashboard() {
  const {moduleTitle} = React.useContext(MainContext)

  return (
    <div>
      <div>
        <HeaderBar/>
        <HeaderTitle/>
        <div className='dashboard-body'>
          <div className='left'>
            { moduleTitle === 'Dashboard' ? 
              <MainDashboard/> : moduleTitle === 'Slope Inventory and Countermeasure' ?
              <SlopeDashboard/> : moduleTitle === 'Emergency Response' ?
              <EmergencyDashboard/> :
              <>Hazard</> 

            }
          </div>
          <div className='right'>
            <MapComponent/>
          </div>
        </div>
      </div>
    </div>
  )
}