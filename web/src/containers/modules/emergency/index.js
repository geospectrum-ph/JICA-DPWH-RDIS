import React from 'react';

import './index.css'
import ClosureRoadsList from './roadClosureList';

export default function EmergencyModule() {
  return(
    <div className='emergency-container'>
      <div>
        charts: road closure by road classification
        filter by situation and road classification
      </div>
      <div>
        <ClosureRoadsList/>
      </div>
    </div>
  )
}