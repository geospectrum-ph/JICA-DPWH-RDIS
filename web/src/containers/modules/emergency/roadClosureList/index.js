import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function ClosureRoadsList() {
  const {roadSegments, setMapCenter, origDataSections, setSelectedSection, setSelectedClosure} = React.useContext(MainContext)
  
  const checkSituation = (situation) => {
    if (situation === 'passable') {
      return '#329632'
    } else if (situation === 'limitedaccess') {
      return '#E27728'
    } else if (situation === 'notpassable') {
      return '#ff0000'
    } else return '#808080'
  }

  const selectRoadClosure = (id, section) => {
    setSelectedSection(origDataSections.filter((section) => {
      return section.properties.SECTION_ID === id
    })[0])

    setSelectedClosure(section)
  }

  return(
    <div className='closure-roadsections-container'>
      <div className='closure-roadsections-header'>
        <b>LIST OF ROAD CLOSURE</b>
      </div>
      <div className='closure-roadsections-search'>
        <input type="text" placeholder="Search.."/>
        <span className="material-symbols-outlined">
          search 
        </span>
      </div>
      <div className='closure-roadsections-list'>
        {roadSegments.length > 0 ? roadSegments.filter((section)=> {
          return section.properties.situation !== 'passable'
        }).map((section) => {
          return <div className='closure-list-item' style={{color: checkSituation(section.properties.situation)}}
            onClick={() => selectRoadClosure(section.properties.section_id, section)}>
            <div className='closure-list-id'>{section.properties.section_id}</div> <div>{section.properties.infrastructure_name}</div>
          </div>
        }) : null}
      </div>
    </div>
  )
}