import React from "react";

import "./index.css";

export default function LoadingModal () {
  return (
    <div id = "loading-modal-container">
      <div>
        <div/>
        <div>{ "Loading data. Please wait for a few moments. " }</div>
      </div>
    </div>
  );
}