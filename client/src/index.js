import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import ArcGISMapContextProvider from "./components/ArcGIS.js";
import App from "./application/App.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ArcGISMapContextProvider>
        <App/>
      </ArcGISMapContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);