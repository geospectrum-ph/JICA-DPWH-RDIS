import React from 'react';

import './index.css'
import ClosureRoadsList from './roadClosureList';
import ClassPieChart from './charts/byRoadClassification';
import ClosureTotal from './charts/closureTotal';
import RegionListChart from './charts/byRegion';
import { MainContext } from '../../../contexts/MainContext';
import DEOListChart from './charts/byDEO';
import ClosureSettings from './settings';
import ClosureDetails from './roadClosureDetails';

export default function EmergencyModule() {

  const {regionSelect} = React.useContext(MainContext)

  return(
    <div className='emergency-container'>
      <div className='emergency-charts'>
        <div className='emergency-charts-row1'>
          <ClosureTotal/>
          <ClassPieChart/>
          <ClosureSettings/>
          {regionSelect !== '' ? <DEOListChart/> : <RegionListChart/>}
          
        </div>
      </div>
      <div className='emergency-list'>
        <ClosureRoadsList/>
        <br/>
        <ClosureDetails/>
      </div>
    </div>
  )
}