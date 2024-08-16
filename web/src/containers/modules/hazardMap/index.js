import React from 'react';
import HeaderBar from '../../components/appBar';
import HeaderTitle from '../../components/header';

import './index.css';
import MapComponent from '../tempMap';

export default function Dashboard() {
  return (
    <div>
      <div>
        <HeaderBar/>
        <HeaderTitle/>
        <div className='dashboard-body'>
          <div className='left'>
            
          </div>
          <div className='right'>
            <MapComponent/>
          </div>
        </div>
      </div>
    </div>
  )
}