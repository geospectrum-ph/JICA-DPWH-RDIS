import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MainContext } from '../../../../../contexts/MainContext';

import './index.css';

export default function DashboardClassPieChart() {

  const {roadSection, roadSegments} = React.useContext(MainContext)

  const [pieData, setPieData] = React.useState([
    {name: 'Primary', value: 0},
    {name: 'Secondary', value: 0},
    {name: 'Tertiary', value: 0},
  ])

  React.useEffect(() => {
    var prim = 0;
    var sec = 0;
    var ter = 0;

    for (var i = 0; i < roadSection.length; i++){
      if(roadSection[i].properties.ROAD_SEC_C === "Primary"){
        prim += roadSection[i].properties.SEC_LENGTH
      } else if(roadSection[i].properties.ROAD_SEC_C === "Secondary") {
        sec += roadSection[i].properties.SEC_LENGTH
      } else if(roadSection[i].properties.ROAD_SEC_C === "Tertiary") {
        ter += roadSection[i].properties.SEC_LENGTH
      }
    }

    setPieData([
      {name: 'Primary', value: prim},
      {name: 'Secondary', value: sec},
      {name: 'Tertiary', value: ter},
    ])
  }, [roadSegments])

  const COLORS = ['#c43920', '#4ab615', '#1555b6'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='md-classpie-container'>
      <div className='md-classpie-header'>
        <b>LENGTH OF NATIONAL ROADS BY CLASSIFICATION</b>
      </div>
      <div className='md-classpie-chart'>
        <PieChart width={250} height={280}>
          <Tooltip/>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className='md-classpie-legend'>
          <div style={{color: COLORS[0]}}><b>Primary</b></div>
          <div>{pieData[0].value} m</div>
          <div style={{color: COLORS[1]}}><b>Secondary</b></div>
          <div>{pieData[1].value} m</div>
          <div style={{color: COLORS[2]}}><b>Tertiary</b></div>
          <div>{pieData[2].value} m</div>
        </div>
      </div>
    </div>
  )
}