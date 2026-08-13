import ReactDOM from "react-dom/client";

import { BrowserRouter, } from "react-router-dom";

import MainContextProvider from "./contexts/MainContext";

import App from "./containers";

import "./index.css";

// Polyfill for Object.groupBy (ES2024) to support older browsers/devices
if (!Object.groupBy) {
  Object.groupBy = function (iterable, callback) {
    const obj = Object.create(null);
    let i = 0;
    for (const item of iterable) {
      const key = callback(item, i++);
      if (obj[key]) {
        obj[key].push(item);
      } else {
        obj[key] = [item];
      }
    }
    return obj;
  };
}


ReactDOM
  .createRoot(
    document.getElementById("root")
  )
  .render(
    <BrowserRouter>
      <MainContextProvider>
        <App/>
      </MainContextProvider>
    </BrowserRouter>
  );
