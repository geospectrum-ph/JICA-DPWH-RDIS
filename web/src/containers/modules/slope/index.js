import React from 'react';

import './index.css';

export default function SlopeDashboard() {

  const [slopeList, setSlopeList] = React.useState('inventory')

  return (
    <div className='main-dashboard-body'>
      <div className='mdb-left'>
        <div className='mdb-left-title'>
          <b>Filters</b>
        </div>
        <select name="region" className='sdb-dropdown'>
          <option disabled selected hidden>Region</option>
          <option></option>
          
        </select>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>DEO</option>
          <option></option>
          
        </select>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>Hazard level</option>
          <option></option>
          
        </select>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>Disaster</option>
          <option></option>
          
        </select>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>Priority</option>
          <option></option>
          
        </select>
        
        <select className='sdb-dropdown'>
          <option disabled selected hidden>Project Status</option>
          <option></option>
          
        </select>
        <br/>
        <div className='mdb-left-title'>
          <b>Sort</b>
        </div>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>Date</option>
          <option></option>
          
        </select>

        <select className='sdb-dropdown'>
          <option disabled selected hidden>Frequency</option>
          <option></option>
          
        </select>
      </div>
      <div className='mdb-right'>
        <div className='sdb-right-header'>
          <div className={slopeList === 'inventory' ? 'sdb-right-title-selected' : 'sdb-right-title'} onClick={() => setSlopeList('inventory')}>
            <b>Inventory</b>
          </div>
          <div className={slopeList === 'funding' ? 'sdb-right-title-selected' : 'sdb-right-title'} onClick={() => setSlopeList('funding')}>
            <b>For Funding</b>
          </div>
        </div>
      </div>
    </div>
  )
}