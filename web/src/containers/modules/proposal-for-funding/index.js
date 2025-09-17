import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import { view_layer } from "../../home/map-component";

import "./index.css";

export default function ProposalForFunding () {
  const {
    yearDefault,
    regionDefault,
    engineeringDistrictDefault,

    dataArray,
    dataLoading
  } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("proposal-for-funding", yearDefault, regionDefault, engineeringDistrictDefault);
  }, []);

  return (
    <div id = "proposal-for-funding-container">
      <div>
        <div>
          <span>{ "Proposal for Funding" }</span>
        </div>
      </div>
      <div>
        {
          dataArray ?
            <div/>
            :
            dataLoading ?
              <div className = "data-array-placeholder">
                <span>{ "Loading data..." }</span>
              </div>
              :
              <div className = "data-array-placeholder">
                <span>{ "No available data." }</span>
              </div>
        }
      </div>
    </div>
  );
}
