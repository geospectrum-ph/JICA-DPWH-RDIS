import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function ClosureSettings() {

  const [time, setTime] = React.useState('')
  return(
    <div className='closure-settings-container'>
      <div className='closure-settings-header'>
        <b>FETCH TIME SETTINGS</b>
      </div>
      <div className='closure-settings-body'>
      <div className='closure-settings-time'>
          <input type='time' defaultValue='05:45'/>
        </div>
        <div className='closure-settings-time'>
          <input type='time' defaultValue='11:45'/>
        </div>
        <div className='closure-settings-time'>
          <input type='time' defaultValue='17:45'/>
        </div>
        <div className='closure-settings-time'>
          <input type='time' defaultValue='23:45'/>
        </div>
      </div>
    </div>
  )
}