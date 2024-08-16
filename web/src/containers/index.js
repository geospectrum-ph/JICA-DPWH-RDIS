import SignInPage from "./modules/login";
import Dashboard from "./modules/dashboardLayout"
import {Routes, Route} from "react-router-dom";

import "./index.css"


function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<SignInPage/>}/>
        <Route path="/home">
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="countermeasure"/>
          <Route path="emergency"/>
          <Route path="hazard"/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
