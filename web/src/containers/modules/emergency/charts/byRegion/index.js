import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MainContext } from '../../../../../contexts/MainContext';

import './index.css';

export default function RegionListChart() {

  const {origDataSections, roadSegments} = React.useContext(MainContext)

  const [regionList, setRegionList] = React.useState()
  const listData = {}

  React.useEffect(() => {


    for (var i = 0; i < roadSegments.length; i++){
      var section = origDataSections.filter((section) => {
        return section.properties.SECTION_ID === roadSegments[i].properties.section_id
      })
      if(section[0].properties.REGION in listData){
        listData[section[0].properties.REGION] = listData[section[0].properties.REGION] + 1
      } else {
      listData[section[0].properties.REGION] = 1
      }
    }

    let sortable = []

    for (var item in listData) {
      sortable.push([item, listData[item]])
    }

    let objSorted = {}

    sortable.sort((a,b) => { return b[1] - a[1]}).forEach((item) => objSorted[item[0]] = item[1])

    setRegionList(objSorted)
  }, [roadSegments])


  return (
    <div className='closure-classpie-container'>
      <div className='closure-classpie-header'>
        <b>ROAD CLOSURE BY REGION</b>
      </div>
      <div className='closure-region-container'>
        {regionList ? Object.keys(regionList).map((key) => {
          return <div className='closure-region-list'>
            <div>{key}</div><div>{regionList[key]}</div>
          </div>
        }) : null}
      </div>
      
    </div>
  )
}