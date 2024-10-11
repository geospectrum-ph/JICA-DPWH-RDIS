import React from 'react';

import './index.css'
import ClosureRoadsList from './roadClosureList';
import ClassPieChart from './charts/byRoadClassification';
import ClosureTotal from './charts/closureTotal';

export default function EmergencyModule() {
  return(
    <div className='emergency-container'>
      <div className='emergency-charts'>
        <div className='emergency-charts-row1'>
          <ClosureTotal/>
          <ClassPieChart/>
        </div>
      </div>
      <div className='emergency-list'>
        <ClosureRoadsList/>
      </div>
    </div>
  )
}