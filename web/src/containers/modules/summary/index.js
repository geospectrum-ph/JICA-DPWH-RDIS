import * as React from "react";

import { Pie, PieChart, Cell } from "recharts";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Summary () {
  const {
    filteredRoadInventory, totalRoadInventory,
    filteredRoadSlopeInventory, totalRoadSlopeInventory,

    filteredNERoadSlopeStructures, totalNERoadSlopeStructures,
    filteredERoadSlopeStructures, totalERoadSlopeStructures,

    arrayHM01,

    arrayRSS01, arrayRSS02, arrayRSS03,
    arrayRS01, arrayRS02
  } = React.useContext(MainContext);

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
    <div id = "summary-container">
      <div>
        <span>{ "Summary" }</span>
      </div>
      <div>
        <div className = "summary-section">
          <div className = "summary-header-row">
            <div></div>
            <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
            <div className = "summary-column-header"><span>{ "Total" }</span></div>
          </div>
          <div className = "summary-row">
            <div className = "summary-row-header"><span>{ "Road Inventory" }</span></div>
            <div><span>{ filteredRoadInventory }</span></div>
            <div><span>{ totalRoadInventory }</span></div>
          </div>
          <div className = "summary-row">
            <div className = "summary-row-header"><span>{ "Road Slope Inventory" }</span></div>
            <div><span>{ filteredRoadSlopeInventory }</span></div>
            <div><span>{ totalRoadSlopeInventory }</span></div>
          </div>
        </div>
        <div className = "summary-section">
          <div className = "summary-header-row">
            <div></div>
            <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
            <div className = "summary-column-header"><span>{ "Total" }</span></div>
          </div>
          <div className = "summary-row">
            <div className = "summary-row-header"><span>{ "Non-Existing Road Slope Structures" }</span></div>
            <div><span>{ filteredNERoadSlopeStructures }</span></div>
            <div><span>{ totalNERoadSlopeStructures }</span></div>
          </div>
          <div className = "summary-row">
            <div className = "summary-row-header"><span>{ "Existing Road Slope Structures" }</span></div>
            <div><span>{ filteredERoadSlopeStructures }</span></div>
            <div><span>{ totalERoadSlopeStructures }</span></div>
          </div>
        </div>
        <div className = "summary-section">
          <div className = "summary-section-header"><span>{ "Hazard Map Module" }</span></div>
          <div className = "summary-section-subheader"><span>{ "Road Slope Hazard Risk Levels" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayHM01?.length > 0 ?
                  arrayHM01.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph">
              <PieChart width = { 100 } height = { 100 }>
                <Pie
                  data = { sampleData }
                  dataKey = "value"
                  nameKey = "name" 
                  cx = "50%" cy = "50%" 
                  labelLine = { false }
                  label = { renderCustomizedLabel }
                  outerRadius = { 35 }
                  fill = "#8884d8"
                >
                  {
                    sampleData.map(function (entry, index) {
                      return (
                        <Cell key = { `cell-${ index }`} fill = { COLORS[index % COLORS.length] }/>
                      );
                    })
                  }  
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
        <div className = "summary-section">
          <div className = "summary-section-header"><span>{ "Road Slope Inventory Module" }</span></div>
          <div className = "summary-section-header"><span>{ "Road Slope Structures" }</span></div>
          <div className = "summary-section-subheader"><span>{ "Condition of Road Slope Structures" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayRSS01?.length > 0 ?
                  arrayRSS01.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph"></div>
          </div>
          <div className = "summary-section-subheader"><span>{ "Type of Disasters affecting Road Slope Structures" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayRSS02?.length > 0 ?
                  arrayRSS02.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph"></div>
          </div>
          <div className = "summary-section-subheader"><span>{ "Type of Existing Road Slope Structures" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayRSS03?.length > 0 ?
                  arrayRSS03.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph"></div>
          </div>
          <div className = "summary-section-header"><span>{ "Road Slopes" }</span></div>
          <div className = "summary-section-subheader"><span>{ "Type of Disasters affecting Road Slopes" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayRS01?.length > 0 ?
                  arrayRS01.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph"></div>
          </div>
          <div className = "summary-section-subheader"><span>{ "Type of Non-Existing Road Slope Structures" }</span></div>
          <div>
            <div className = "summary-details">
              <div className = "summary-header-row">
                <div></div>
                <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                <div className = "summary-column-header"><span>{ "Total" }</span></div>
              </div>
              {
                arrayRS02?.length > 0 ?
                  arrayRS02.map(function (item) {
                    return (
                      <div className = "summary-row">
                        <div className = "summary-row-header"><span>{ item.category }</span></div>
                        <div><span>{ item.filtered }</span></div>
                        <div><span>{ item.total }</span></div>
                      </div>
                    );
                  })
                  : null
              }
            </div>
            <div className = "summary-graph"></div>
          </div>
        </div>
      </div>
    </div>
  );
}