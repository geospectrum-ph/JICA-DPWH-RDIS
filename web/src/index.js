import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";

import MainContextProvider from "./contexts/MainContext";
import ArcGISMapContextProvider from "./containers/components/map";

import App from "./containers";

import "./index.css";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <React.StrictMode>
      <MainContextProvider>
        <ArcGISMapContextProvider>
          <App />
        </ArcGISMapContextProvider>
      </MainContextProvider>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
