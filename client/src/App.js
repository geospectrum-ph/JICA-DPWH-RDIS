import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import logo from "./assets/logo.png";
import background from "./assets/background.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <header className = "App-header">
      <div style = {{ width: "100%", height: "100%" }}>
        <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center"}} alt = "background"/>
        <div style = {{ width: "100%", height: "10%", position: "absolute", bottom: "0", zIndex: "100", backgroundColor: "#0C343D", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <div style = {{ width: "75%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <img src = { logo } style = {{ width: "50px", height: "50px", margin: "0 20px 0 0" }} alt = "Logo"/>
            <div style = {{ width: "auto", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style = {{ fontSize: "36px" }}>Welcome to SEEDs!</span>
              <span style = {{ fontSize: "18px" }}>Geospectrum Analytics Services, Inc. © 2023</span>
            </div>
          </div> 
          <div style = {{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <div style = {{ height: "fit-content", outline: "solid 4px #49676E", backgroundColor: "#1C424A", borderRadius: "15px", padding: "10px 80px" }} onClick = { () => navigate("/login") }>
              <span style = {{ fontSize: "18px" }}>Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function LoginPage() {
  return(
    <header className = "App-header">
      <div style = {{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" }} alt = "background"/>
        <div style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "100", backgroundColor: "#1C424AF3", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div>
            <span>Sign In to SEEDs</span>
            <div style = {{ height: "fit-content", outline: "solid 4px #49676E", backgroundColor: "#1C424A", borderRadius: "15px", margin: "40px 0 0 0", padding: "10px 240px" }}>
              <span style = {{ fontSize: "18px" }}>Username</span>
            </div>
            <div style = {{ height: "fit-content", outline: "solid 4px #49676E", backgroundColor: "#1C424A", borderRadius: "15px", margin: "40px 0 0 0", padding: "10px 240px" }}>
              <span style = {{ fontSize: "18px" }}>Password</span>
            </div>
            <div style = {{ height: "fit-content", outline: "solid 4px #49676E", backgroundColor: "#1C424A", borderRadius: "15px", margin: "80px 0 0 0", padding: "10px 80px" }}>
              <span style = {{ fontSize: "18px" }}>Sign In</span>
            </div>
            <div style = {{ height: "fit-content", margin: "80px 0 0 0", padding: "10px 80px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>Terms</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>•</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>Privacy</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>•</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>Documentation</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>•</span>
              <span style = {{ fontSize: "18px", margin: "0 20px" }}>Support</span>
            </div>
            <div style = {{ height: "fit-content", margin: "10px 0 0 0", padding: "10px 80px" }}>
              <img src = { logo } style = {{ width: "24px", margin: "0 10px -5px 0" }} alt = "Logo"/>
              <span style = {{ fontSize: "18px" }}>SEEDs © 2023  by Geospectrum Analytics Services, Inc.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MainPage() {
  return(
    <header className = "App-header">
      <img src = { logo } className = "App-logo" alt = "Logo"/>
      <div id = "viewDiv" style = {{ outline: "solid 2px #000000", width: "75%", height: "500px" }}></div>
    </header>
  )
}

function App() {
  return (
    <div className = "App">
      <Routes>
        <Route path = "/" element = { <LandingPage/> }/>
        <Route path = "/login" element = { <LoginPage/> } />
        <Route path = "/main" element = { <MainPage/> } />
      </Routes>
    </div>
  );
}

export default App;
