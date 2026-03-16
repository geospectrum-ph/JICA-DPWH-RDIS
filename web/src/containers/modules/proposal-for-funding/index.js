import * as React from "react";

import { MainContext, } from "../../../contexts/MainContext";

import "./index.css";

export default function ProposalForFunding () {
  const {
    dataSource03,

    dataLoading,
  } = React.useContext(MainContext);

  return (
    <div id = "proposal-for-funding-container">
      <div>
        <div>
          <span>{ "Proposal for Funding" }</span>
        </div>
      </div>
      <div>
        {
          dataSource03 ?
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
