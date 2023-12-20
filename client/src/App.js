import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import logo from "./assets/logo.png";
import background from "./assets/background.png";
import seal from "./assets/seal.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style = {{ width: "100%", height: "100%" }}>
      <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" }} alt = "Background"/>
      <div style = {{ width: "100%", height: "auto", position: "absolute", bottom: "0", zIndex: "100", backgroundColor: "#0C343D", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div style = {{ width: "auto", height: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
          <img src = { logo } style = {{ width: "48px", height: "48px", padding: "36px 18px 36px 36px", objectFit: "contain", objectPosition: "center center" }} alt = "Logo"/>
          <div style = {{ minWidth: "auto", height: "auto", padding: "18px 0px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <span style = {{ font: "bold 36px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Welcome to SEEDs!</span>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Geospectrum Analytics Services, Inc. © 2023</span>
          </div>
        </div> 
        <div style = {{ minWidth: "240px", height: "auto", margin: "36px", padding: "18px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} onClick = { () => navigate("/login") }>
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
          <div style = {{ minWidth: "240px", height: "auto", margin: "20px", padding: "10px", outline: "solid 2px #49676E", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} onClick = { () => navigate("/access") }>
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

function AccessPage() {
  const navigate = useNavigate();

  return(
    <div style = {{ width: "100%", height: "100%" }} onLoad = { () => setTimeout(function() { navigate("/main") }, 5000) }>
      <img src = { background }  style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" }} alt = "background"/>
      <div style = {{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "100", backgroundColor: "#1C424AF3", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style = {{ width: "50%", height: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style = {{ margin: "10px 0", font: "bold 36px 'League Spartan', sans-serif", color: "#7ED957" }}>SEEDs</span>
          <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Authorizing User...</span>
        </div>
      </div>
    </div>
  )
}

function MainPage() {
  // const navigate = useNavigate();

  React.useEffect(() => {
    var mainTime = document.getElementById("Main-Time");
    function setTime() { if (mainTime) mainTime.textContent = new Date().toLocaleString(); }
  
    setInterval(setTime, 1000);
  }, [])

  return(
    // <header className = "App-header">
    //   <img src = { logo } className = "App-logo" alt = "Logo"/>
    //   <div id = "viewDiv" style = {{ outline: "solid 2px #000000", width: "75%", height: "500px" }}></div> 
    // </header>
    <div style = {{ width: "100%", height: "100%" }}>
      <div style = {{ width: "100%", height: "auto", position: "absolute", top: "0", zIndex: "100", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <div style = {{ width: "100%", height: "auto", backgroundColor: "#0C343D", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <div style = {{ width: "auto", height: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
            <img src = { logo } style = {{ width: "36px", height: "36px", padding: "18px 9px 18px 18px", objectFit: "contain", objectPosition: "center center" }} alt = "Logo"/>
            <div style = {{ minWidth: "auto", height: "auto", padding: "9px 0px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>SEEDs © 2023 by Geospectrum Analytics Services, Inc.</span>
            </div>
          </div>
          <div style = {{ width: "auto", height: "auto", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div style = {{ minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <span id = "Main-Time" style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}></span>
            </div>
          </div>
        </div>
        <div style = {{ width: "100%", height: "auto", backgroundColor: "#1B798E", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <div style = {{ width: "auto", height: "auto", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div style = {{ minWidth: "180px", height: "auto", margin: "9px", padding: "9px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Executive Summary</span>
            </div>
            <div style = {{ minWidth: "180px", height: "auto", margin: "9px", padding: "9px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Data</span>
            </div>
            <div style = {{ minWidth: "180px", height: "auto", margin: "9px", padding: "9px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Analytics</span>
            </div>
          </div>
          <div style = {{ width: "auto", height: "auto", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div style = {{ minWidth: "180px", height: "auto", margin: "9px", padding: "9px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Account</span>
            </div>
            <div style = {{ minWidth: "180px", height: "auto", margin: "9px", padding: "9px", outline: "solid 2px #49676E", borderRadius: "12px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#FFFFFF" }}>Support</span>
            </div>
          </div>
        </div>
        <div style = {{ width: "100%", top: "auto", zIndex: "0", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "start" }}>
          <div style = {{ minWidth: "15%", height: "auto", padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start"}}>
            <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#000000" }}>Executive Summary</span>
            <ul style = {{ font: "12px 'League Spartan', sans-serif", color: "#000000", lineHeight: "150%" }}>
              <li>Introduction
                <ul>
                  <li>Messages</li>
                  <li>Vision & Mission</li>
                </ul>
              </li>
              <li>
                Profile
                <ul>
                  <li>General Map</li>
                  <li>Demographic Profile</li>
                  <li>Environmental Profile
                    <ul>
                      <li>Topography</li>
                      <li>Climate</li>
                      <li>Hazards</li>
                      <li>DRRMP</li>
                      <li>Protected Areas</li>
                      <li>Green Spaces</li>
                    </ul>
                  </li>
                  <li>Economic Profile
                    <ul>
                      <li>Schedule</li>
                      <li>Budget Report</li>
                      <li>CLUP</li>
                      <li>Tax Map</li>
                      <li>General Statistics</li>
                    </ul>
                  </li>
                  <li>Social Services
                    <ul>
                      <li>Emergency Hotlines</li>
                      <li>Healthcare Services</li>
                      <li>Education Services</li>
                      <li>Labor and Employment Services</li>
                      <li>Legal Services</li>
                    </ul>
                  </li>
                  <li>Plans & Projects
                    <ul>
                      <li>General Description</li>
                      <li>Schedule & Budget</li>
                      <li>Project Details</li>
                    </ul>
                  </li>
                  <li>People
                    <ul>
                      <li>Organizational Structure</li>
                      <li>Administrative Profile</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Index</li>
            </ul>
          </div>
          <div style = {{ width: "auto", height: "auto", padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start"}}>
            <div style = {{ minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "start" }}>
              <img src = { seal } style = {{ width: "120px", height: "120px", objectFit: "contain", objectPosition: "center center" }} alt = "Seal"/>
            </div>
            <div style = {{ minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "start" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#000000" }}>City of Mandaluyong, National Capital Region</span>
            </div>
            <div style = {{ minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "start" }}>
              <span style = {{ font: "bold 72px 'League Spartan', sans-serif", color: "#000000" }}>Executive Summary</span>
            </div>
            <div style = {{ minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "start" }}>
              <span style = {{ font: "bold 18px 'League Spartan', sans-serif", color: "#000000" }}>An empowered community, competent government sector human resource, and benevolent private sector working in an atmosphere of mutual assistance shaping Mandaluyong into a sustainable and globally competitive city and an effective partner in nation-building.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = { <LandingPage/> }/>
        <Route path = "/login" element = { <LoginPage/> } />
        <Route path = "/access" element = { <AccessPage/> } />
        <Route path = "/main" element = { <MainPage/> } />
      </Routes>
    </div>
  );
}

export default App;
