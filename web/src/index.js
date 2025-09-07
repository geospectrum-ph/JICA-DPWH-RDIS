import * as React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import MainContextProvider from "./contexts/MainContext";

import App from "./containers";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <MainContextProvider>
        <App/>
      </MainContextProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
