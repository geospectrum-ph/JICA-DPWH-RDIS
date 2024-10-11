import SignInPage from "./modules/login";

import DashboardLayout from "./layout/mainDashboard";

import {Routes, Route} from "react-router-dom";

import "./index.css"


function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<SignInPage/>}/>
        <Route path="/home/*" element={<DashboardLayout/>}/>
        <Route path="/user">

        </Route>
      </Routes>
    </div>
  );
}

export default App;
