import React from "react";

import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import MainContextProvider from "./contexts/MainContext";
import MapContextProvider from "./contexts/MapContext";

import App from "./containers";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainContextProvider>
        <MapContextProvider>
          <App/>
        </MapContextProvider>
      </MainContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();