import React from "react";

import { Pie, PieChart, Cell } from "recharts";

import "./index.css";

export default function Status () {
//   function StatusChart () {
//     const COLORS = ['#00FF00', '#FF0000'];

//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

//     return (
//       <PieChart width = { 100 } height = { 100 }>
//         <Pie
//           data = { sampleData } 
//           dataKey = "value"
//           nameKey = "name" 
//           cx = "50%" cy = "50%" 
//           labelLine = { false }
//           label = { renderCustomizedLabel }
//           outerRadius = { 35 } 
//           fill = "#8884d8" >
//           {
//             sampleData.map(function (entry, index) {
//               return (
//                 <Cell key = { `cell-${index}` } fill = { COLORS[index % COLORS.length] }/>
//               );
//             })
//           }  
//         </Pie>
//       </PieChart>
//     );
//   }

  return (
    <div id = "status-container">
      <div>{ "Status" }</div>
      {/* <div><StatusChart/></div> */}
    </div>
  );
}