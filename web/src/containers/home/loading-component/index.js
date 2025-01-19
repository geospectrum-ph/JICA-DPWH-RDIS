import * as React from "react";

import "./index.css";

export default function LoadingComponent () {
  return (
    <div id = "loading-component">
      <div>
        <div/>
        <div>{ "Loading data. Please wait for a few moments. " }</div>
      </div>
    </div>
  );
}