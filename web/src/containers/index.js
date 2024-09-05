import SignInPage from "./modules/login";
import Dashboard from "./modules/dashboardLayout"
import {Routes, Route} from "react-router-dom";

import "./index.css"


function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<SignInPage/>}/>
        <Route path="/home/*" element={<Dashboard/>}/>
        <Route path="/user">

        </Route>
      </Routes>
    </div>
  );
}

export default App;
