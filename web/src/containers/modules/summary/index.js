import * as React from "react";

import { Pie, PieChart, Cell, BarChart, CartesianGrid, Bar } from "recharts";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Summary () {
  const {
    filteredRoadInventory,
    totalRoadInventory,

    filteredRoadSlopeInventory,
    totalRoadSlopeInventory,

    filteredERoadSlopeStructures,
    totalERoadSlopeStructures,

    filteredNERoadSlopeStructures,
    totalNERoadSlopeStructures,

    arrayHM01,

    arrayRSS01,
    arrayRSS02,
    arrayRSS03,

    arrayRS01,
    arrayRS02
  } = React.useContext(MainContext);

    const {
      view_layer
    } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("summary");
  }, []);

  const RADIAN = Math.PI / 180;

  function renderCustomizedLabel ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    
    const x = percent === 1 ? radius + 20 : (cx + radius * Math.cos(-midAngle * RADIAN)) - (midAngle < 180 ? 5 : 0);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x = { x } y = { y } dominantBaseline = "central">
        { `${ (percent * 100).toFixed(0) }%` }
      </text>
    );
  }

  return (
    <div id = "summary-container">
      <div>
        <span>{ "Summary" }</span>
      </div>
      <div>
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
                    arrayHM01.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayHM01 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayHM01 ? arrayHM01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayHM01 ?
                            arrayHM01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayHM01 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayHM01 ? arrayHM01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayHM01.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayHM01 ?
                            arrayHM01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
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
                    arrayRSS01.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRSS01 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRSS01 ? arrayRSS01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRSS01 ?
                            arrayRSS01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayRSS01 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRSS01 ? arrayRSS01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRSS01.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRSS01 ?
                            arrayRSS01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
              </div>
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
                    arrayRSS02.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRSS02 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRSS02 ? arrayRSS02.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRSS02 ?
                            arrayRSS02.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayRSS02 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRSS02 ? arrayRSS02.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRSS02.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRSS02 ?
                            arrayRSS02.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
              </div>
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
                    arrayRSS03.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRSS03 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRSS03 ? arrayRSS03.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRSS03 ?
                            arrayRSS03.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayRSS03 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRSS03 ? arrayRSS03.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRSS03.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRSS03 ?
                            arrayRSS03.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
              </div>
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
                    arrayRS01.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRS01 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRS01 ? arrayRS01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRS01 ?
                            arrayRS01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayRS01 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRS01 ? arrayRS01.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRS01.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRS01 ?
                            arrayRS01.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
              </div>
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
                    arrayRS02.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row">
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    : null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRS02 ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRS02 ? arrayRS02.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRS02 ?
                            arrayRS02.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    : null
                }
                {
                  arrayRS02 ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRS02 ? arrayRS02.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRS02.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRS02 ?
                            arrayRS02.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        }  
                      </Pie>
                    </PieChart>
                    : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}