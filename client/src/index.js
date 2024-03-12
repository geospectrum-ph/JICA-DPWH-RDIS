import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import ArcGISMapContextProvider from "./ArcGIS.js";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ArcGISMapContextProvider>
        <App/>
      </ArcGISMapContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);