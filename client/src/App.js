import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import logo from "./assets/logo.png";
import background from "./assets/background.png";



function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style = {{ width: "100%", height: "100%" }}>
      <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" }} alt = "Background"/>
      <div style = {{ width: "100%", height: "auto", position: "absolute", bottom: "0", zIndex: "100", backgroundColor: "#0C343D", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div style = {{ width: "auto", height: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
          <img src = { logo } style = {{ width: "50px", height: "50px", padding: "20px 10px 20px 20px", objectFit: "contain", objectPosition: "center center" }} alt = "Logo"/>
          <div style = {{ width: "auto", height: "auto", padding: "20px 0px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <span style = {{ font: "bold 36px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Welcome to SEEDs!</span>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Geospectrum Analytics Services, Inc. © 2023</span>
          </div>
        </div> 
        <div style = {{ minWidth: "240px", height: "auto", margin: "20px", padding: "10px", outline: "solid 2px #49676E", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} onClick = { () => navigate("/login") }>
          <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Sign In</span>
        </div>
      </div>
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate();

  return(
    <div style = {{ width: "100%", height: "100%" }}>
      <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" }} alt = "background"/>
      <div style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "100", backgroundColor: "#1C424AF3", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style = {{ width: "50%", height: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style = {{ font: "bold 36px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Sign In to SEEDs</span>
          <div style = {{ minWidth: "50%", height: "auto", margin: "80px 0 10px", padding: "10px", outline: "solid 2px #49676E", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Username</span>
          </div>
          <div style = {{ minWidth: "50%", height: "auto", margin: "10px 0 40px", padding: "10px", outline: "solid 2px #49676E", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Password</span>
          </div>
          <div style = {{ minWidth: "240px", height: "auto", margin: "20px", padding: "10px", outline: "solid 2px #49676E", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} onClick = { () => navigate("/main") }>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Sign In</span>
          </div>
          <div style = {{ height: "auto", margin: "80px 0 0 0", padding: "10px 80px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>
            <span style = {{ fontSize: "18px", margin: "0 20px" }}>Terms</span>
            <span style = {{ fontSize: "18px" }}>•</span>
            <span style = {{ fontSize: "18px", margin: "0 20px" }}>Privacy</span>
            <span style = {{ fontSize: "18px" }}>•</span>
            <span style = {{ fontSize: "18px", margin: "0 20px" }}>Documentation</span>
            <span style = {{ fontSize: "18px" }}>•</span>
            <span style = {{ fontSize: "18px", margin: "0 20px" }}>Support</span>
          </div>
          <div style = {{ height: "auto", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <img src = { logo } style = {{ width: "24px", margin: "0 10px 0 0" }} alt = "Logo"/>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>SEEDs © 2023  by Geospectrum Analytics Services, Inc.</span>
          </div>
        </div>
      </div>
    </div>
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
    <div>
      <Routes>
        <Route path = "/" element = { <LandingPage/> }/>
        <Route path = "/login" element = { <LoginPage/> } />
        <Route path = "/main" element = { <MainPage/> } />
      </Routes>
    </div>
  );
}

export default App;
