import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Summary () {
  return (
    <div id = 'summary-container'>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Existing Inventory"}</div>
        <div>
          <span class="material-symbols-outlined" id = 'summary-icons'>
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
          <span class="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span>
          <div>
            <div>{"High"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Middle"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Low"}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{"0000"}</div>
            <div>{"Non-evaluated"}&emsp;&emsp;{"0000"}</div>
          </div>
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Total Number of Sections by Road Terrain"}</div>
        <div>
          <span class="material-symbols-outlined" id = 'summary-icons'>
            warning
          </span>
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
          <span class="material-symbols-outlined" id = 'summary-icons'>
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
          test
        </div>
      </div>
      <div id = 'summary-blocks'>
        <div>{"Road Slope Status"}</div>
        <div>
          test
        </div>
      </div>
    </div>
  )
}