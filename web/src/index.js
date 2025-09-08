import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import MainContextProvider from "./contexts/MainContext";

import App from "./containers";

import "./index.css";

ReactDOM
  .createRoot(
    document
      .getElementById("root")
    )
  .render(
    <BrowserRouter>
      <MainContextProvider>
        <App/>
      </MainContextProvider>
    </BrowserRouter>
  );
