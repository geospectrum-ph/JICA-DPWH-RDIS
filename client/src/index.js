import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import ArcGISMapContextProvider from "./components/ArcGIS.js";
import App from "./application/App.js";




import axios from 'axios';

const data = {
    name: 'John Doe',
    job: 'Content Writer'
};

axios.post('https://localhost:3000/', data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ArcGISMapContextProvider>
        {/* <App/> */}

        <div>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        </div>

      </ArcGISMapContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);