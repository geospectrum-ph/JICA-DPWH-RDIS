import * as React from "react";

import { Pie, PieChart, Cell } from "recharts";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Summary () {

  const structureTypes = [
    'Grouted Riprap',
    'Grouted Riprap with Steel Sheet Pile Foundation',
    'Grouted Riprap with Concrete Sheet Pile Foundation',
    'Rubble Concrete Revetment (Spread Type I)',
    'Stone Masonry',
    'Concrete Slope Protection (Reinforced Concrete Type II)',
    'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)',
    'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)',
    'Gravity Wall (Type I)',
    'Gabion/Mattress Slope Protection',
    'Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)',
    'Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)',
    'Earthfill Dike (Type I)',
    'Boulder Spur Dike (Type II)',
    'Gabions Revetment (Pile-Up Type)'
  ]

  const COLORS = ['#00FF00', '#FF0000'];

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

  // to delete
  const sampleData = [
    {
      "name": "Existing",
      "value": 923
    },
    {
      "name": "Non-existing",
      "value": 146
    }
  ]

  return (
    <div id = 'summary-container'>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Existing Inventory"}</div>
        <div>
          <span className="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span>
          <div>
            <div>{"Good"}&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Fair"}&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Poor"}&nbsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Bad"}&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Total"}&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
          </div>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Road Slope Inventory by Hazard Level"}</div>
        <div>
          {/* <span class="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span> */}
          <div/>
          <div>
            <div>
              <span className="material-symbols-outlined" id='hazard-high'>
                horizontal_rule
              </span>
              {"High"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}
            </div>
            <div>
              <span className="material-symbols-outlined" id='hazard-middle'>
                horizontal_rule
              </span>
              {"Middle"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}
            </div>
            <div>
              <span className="material-symbols-outlined" id='hazard-low'>
                horizontal_rule
              </span>
              {"Low"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}
            </div>
            <div>
              <span className="material-symbols-outlined" id='hazard-none'>
                horizontal_rule
              </span>
              {"Non-evaluated"}&emsp;&emsp;{"0000"}
            </div>
          </div>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Sections by Road Terrain"}</div>
        <div>
          {/* <span class="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span> */}
          <div/>
          <div>
            <div>{"Flat"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Rolling"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Mountainous"}&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Non-evaluated"}&emsp;&emsp;{"0000"}</div>
            <div>{"Total"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
          </div>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Non-existing Road Slope Inventory"}</div>
        <div>
          <span className="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span>
          <div>
            <div>{"Construction"}&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Reconstruction"}&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Rehab/Repair"}&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Total"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Priority"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
          </div>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Type of Road Slope Structure by Condition"}</div>
        <div>
          <table>
            <tr>
              <th>Particular</th>
              <th>Good</th>
              <th>Fair</th>
              <th>Poor</th>
              <th>Bad</th>
            </tr>
            {structureTypes.map((type, index) => {
              return <tr key = {index}>
                <td>{type}</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            })}
          </table>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Road Slope Status"}</div>
        <div>
          <PieChart width={100} height={100}>
            <Pie data={sampleData} 
              dataKey="value"
              nameKey="name" 
              cx="50%" cy="50%" 
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={35} 
              fill="#8884d8" >
              {sampleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}  
              </Pie>
          </PieChart>
          <div>
            <div>{"No. of existing"}&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"No. of non-existing"}&emsp;{"0000"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}