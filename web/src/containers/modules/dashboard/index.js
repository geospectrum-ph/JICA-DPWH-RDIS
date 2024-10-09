import React from 'react';
import { LineChart, Line, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import './index.css';
import { MainContext } from '../../../contexts/MainContext';

export default function MainDashboard () {
  const {roadSection} = React.useContext(MainContext)

  const sampleData1 =[
    {x: 'Jan', y: 24},
    {x: 'Feb', y: 12},
    {x: 'Mar', y: 28},
    {x: 'Apr', y: 40},
    {x: 'Jun', y: 4},
    {x: 'Jul', y: 26},
    {x: 'Aug', y: 26},
  ]

  const sampleData2 = [
    {name: 'Total roads', value: roadSection.length},
    {name: 'For Funding', value: 931},
    {name: 'Phase 2 project', value: 630}
  ]

  return (
    <div className='main-dashboard-body'>
      <div className='mdb-left'>
        <div className='mdb-left-title'>
          <b>About the system</b>
        </div>
        <div className='mdb-left-desc'>
        The Road Disaster Information System (RDIS) is a road and road disaster 
        information management system developed for the Department of Public Works 
        and Highways (DPWH) through the partnership of the Japan International 
        Cooperation Agency (JICA) and Geospectrum Analytics Services, Inc. The 
        RDIS aims to improve the operational capability of the department in 
        managing road and road disaster information by enhancing and extending 
        the methods utilized in road and road disaster data collection, sharing, 
        and analysis. 
        </div>
        <div>
          
        </div>
      </div>
      <div className='mdb-right'>
        <div className='mdb-right-title'>
          <b>Information Summary</b>
        </div>
        <div className='mdb-right-summ'>
          <PieChart width={500} height={280}>
            <Tooltip/>
            <Pie data={sampleData2} dataKey="value" nameKey="name" outerRadius={120} fill='#8884d8' label/>
          </PieChart>
          <br/>
          <div className='mdb-right-summ-graph'>
            <LineChart width={535} height={300} data={sampleData1}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey='x'/>
              <YAxis/>
              <Tooltip/>
              {/* <Legend/> */}
              <Line type='monotone' dataKey='y' stroke="#8884d8"/>
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}