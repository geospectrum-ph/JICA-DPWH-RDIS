import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";

import { ArcGISMapContext } from "./ArcGIS.js";
import LeafletMap from "./Leaflet.js"

import "./App.css";

import brand from "./assets/images/brand.png";
import logo from "./assets/images/logo.png";

import background from "./assets/images/background.png";
import overlay from "./assets/images/overlay.png";

import seal from "./assets/images/seal.png";

import error from "./assets/images/error.png";

function App() {
  const { add_layer, ArcGISMap } = React.useContext(ArcGISMapContext);

  /* For the navigation of routes. */

  const navigate = useNavigate();

  function handleNavigation(module) {
    switch (module) {
      case "Root":
        navigate("/");
        break;
      case "Sign In":
        navigate("/sign-in");
        break;
      case "Home":
        navigate("/home");
        break;
      case "Data":
        navigate("/data");
        break;
      case "Analytics":
        navigate("/analytics");
        break;
      case "Account":
        navigate("/account");
        break;
      case "Security":
        navigate("/security");
        break;
      case "Support":
        navigate("/support");
        break;
      default:
        return null;
    }
  }

  /* For the handling of errors. */

  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    if (errorMessage) console.log(errorMessage);
  }, [errorMessage]);
  
  /* Main modules. */

  function RootPage() {
    return (
      <div className = "container column-center">
        <div className = "container header fixed layer-interactive">
          <div className = "header-logo">
            <a href = "https://geospectrum.com.ph/" target = "_blank" rel = "noreferrer">
              <img src = { brand } title = "Geospectrum Marketing Services" alt = "Brand"/>
            </a>
          </div>
          <div className = "header-buttons">
            <div className = "button button-about">
              <a href = "https://github.com/geospectrum-ph/seeds-rebuild/blob/main/README.md/" target = "_blank" rel = "noreferrer"><span>ABOUT</span></a>
            </div>
            <div className = "button button-sign-in" onClick = { () => { handleNavigation("Sign In") } }>
              <span>SIGN IN</span>
            </div>
          </div>  
        </div>
        <div className = "container row-center fixed layer-overlay">
          <img src = { overlay } alt = "Overlay"/>
        </div>
        <div className = "container row-center fixed layer-foreground">
          <div className = "title-container">
            <span>SEEDs</span>
          </div>
        </div>
        <div className = "container row-center fixed layer-background">
          <img src = { background } alt = "Background"/>
        </div>
      </div>
    )
  }

  function SignInPage() {
    const [loginNote, setLoginNote] = React.useState("Please enter your username and password.");

    function handleLogin() {
      axios
        .post("http://localhost:5000/login/", {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password")
        })
        .then((response) => {
          switch (response.data) {
            case "username_error":
            case "password_error":
              setLoginNote("Please enter a valid username and password.");
              break;
            case "request_success":
              setLoginNote("Successful user authentication!");
              handleNavigation("Home");
              break;
            default: return null;
          }
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }

    return (
      <div className = "container column-center">
        <div className = "wrapper column-center">
          <div className = "box form static layer-interactive">
            <div className = "form-header">
              <span>Sign In to <b>SEEDs</b></span>
            </div>
            <div className = "form-field">
              <label htmlFor = "sign-in-username"><span>Username</span></label>
              <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("username", event.target.value); } } required/>
            </div>
            <div className = "form-field">
              <label htmlFor = "sign-in-password"><span>Password</span></label>
              <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { (event) => { localStorage.setItem("password", event.target.value); } } required/>
            </div>
            <div className = "form-note">
              <span>{ loginNote }</span>
            </div>
            <div className = "button" onClick = { () => { handleLogin(); } }>
              <span>Sign In</span>
            </div>
            <div className = "button" onClick = { () => { handleNavigation("Security") } }>
              <span>Forgot password?</span>
            </div>
            <div>
              <div className = "row-center">
                <span className = "type-body">Terms</span>
                <span className = "type-body">•</span>
                <span className = "type-body">Privacy</span>
                <span className = "type-body">•</span>
                <span className = "type-body">Documentation</span>
                <span className = "type-body">•</span>
                <span className = "type-body">Support</span>
              </div>
              <div>
                <span className = "type-p0-03">SEEDs © 2023 by Geospectrum Analytics Services, Inc.</span>
              </div>
            </div>
          </div>
          <div className = "container fixed layer-background" onClick = { () => { handleNavigation("Root") } }></div> 
        </div>
      </div>
    )
  }

  function SecurityPage() {
    const [usernameBuffer, setUsernameBuffer] = React.useState(null);
    const [passwordBuffer, setPasswordBuffer] = React.useState(null);
    const [newPasswordBuffer, setNewPasswordBuffer] = React.useState(null);
    const [clonePasswordBuffer, setClonePasswordBuffer] = React.useState(null);

    const [changePasswordNote, setChangePasswordNote] = React.useState("Please enter your username and password.");

    function handleChangePassword() {
      axios
        .post("http://localhost:5000/security/", {
          username: usernameBuffer,
          password: passwordBuffer,
          newPassword: newPasswordBuffer,
          clonePassword: clonePasswordBuffer
        })
        .then((response) => {
          switch (response.data) {
            case "username_error":
            case "password_error":
            case "case_error":
              setChangePasswordNote("Please enter a valid username and password.");
              break;
            case "password_mismatch":
              setChangePasswordNote("The entered passwords do not match.");
              break;
            case "request_success":
              setChangePasswordNote("Successful password update!");
              handleNavigation("Home");
              break;
            default: return null;
          }
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }

    return (
      <div style = { { width: "100%", height: "100%", zIndex: "500" } }>
        <img src = { background } style = { { width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "0", objectFit: "cover", objectPosition: "center center" } } alt = "background"/>
        <div style = { { width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "100", backgroundColor: "#1C424AF3", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
          <div style = { { width: "25%", height: "auto", zIndex: "50", outline: "solid 2px #FFFFFF44", borderRadius: "25px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
            <span style = { { margin: "20px 0 0 0", font: "24px 'Outfit', sans-serif", color: "#FFFFFF" } }>Sign In to <b>SEEDs</b></span>
            <div style = { { width: "100%", height: "auto", margin: "40px 0 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
              <input name = "username-buffer" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" onChange = { (event) => { setUsernameBuffer(event.target.value); } } style = { { width: "85%", border: "none", borderRadius: "10px", padding: "12px", font: "16px 'Outfit', sans-serif", color: "#000000" } }/>
            </div>
            <div style = { { width: "100%", height: "auto", margin: "10px 0 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
              <input name = "password-buffer" type = "password" minLength = "8" maxLength = "24" onChange = { (event) => { setPasswordBuffer(event.target.value); } } style = { { width: "85%", border: "none", borderRadius: "10px", padding: "12px", font: "16px 'Outfit', sans-serif", color: "#000000" } }/>
            </div>
            <div style = { { width: "100%", height: "auto", margin: "10px 0 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
              <input name = "new-password" type = "password" minLength = "8" maxLength = "24" onChange = { (event) => { setNewPasswordBuffer(event.target.value); } } style = { { width: "85%", border: "none", borderRadius: "10px", padding: "12px", font: "16px 'Outfit', sans-serif", color: "#000000" } }/>
            </div>
            <div style = { { width: "100%", height: "auto", margin: "10px 0 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
              <input name = "clone-password" type = "password" minLength = "8" maxLength = "24" onChange = { (event) => { setClonePasswordBuffer(event.target.value); } } style = { { width: "85%", border: "none", borderRadius: "10px", padding: "12px", font: "16px 'Outfit', sans-serif", color: "#000000" } }/>
            </div>
            <div style = { { width: "100%", height: "auto", margin: "10px 0 0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
              <span style = { { width: "85%", border: "none", borderRadius: "10px", padding: "12px", textAlign: "center", font: "16px 'Outfit', sans-serif", color: "#FFFFFF" } }>{ changePasswordNote }</span>
            </div>
            <div style = { { minWidth: "240px", height: "auto", margin: "20px", outline: "solid 2px #FFFFFF44", borderRadius: "10px", backgroundColor: "#1C424A", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } } onClick = { () => { handleChangePassword(); } }>
              <span style = { { padding: "10px", font: "16px 'Outfit', sans-serif", color: "#FFFFFF" } }>Submit</span>
            </div>
          </div>
          <div style = { { height: "auto", zIndex: "100", margin: "80px 0 0 0", padding: "10px 80px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", font: "18px 'Outfit', sans-serif", color: "#FFFFFF" } }>
            <span style = { { fontSize: "16px", margin: "0 20px" } }>Terms</span>
            <span style = { { fontSize: "18px" } }>•</span>
            <span style = { { fontSize: "16px", margin: "0 20px" } }>Privacy</span>
            <span style = { { fontSize: "18px" } }>•</span>
            <span style = { { fontSize: "16px", margin: "0 20px" } }>Documentation</span>
            <span style = { { fontSize: "18px" } }>•</span>
            <span style = { { fontSize: "16px", margin: "0 20px" } }>Support</span>
          </div>
          <div style = { { height: "auto", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } }>
            <img src = { logo } style = { { width: "24px", margin: "0 10px 0 0" } } alt = "Logo"/>
            <span style = { { font: "16px 'Outfit', sans-serif", color: "#FFFFFF" } }>SEEDs © 2023 by Geospectrum Analytics Services, Inc.</span>
          </div>
        </div>
      </div>
    )
  }

  function Menu() {
    return (
      <div className = "header">
        <div className = "header-logo">
          <img src = { logo } title = "Geospectrum Marketing Services" alt = "Brand"/>
          <span>SEEDs</span>
        </div>
        <div className = "header-buttons">
          <div className = "button" onClick = { () => { handleNavigation("Home"); } }>
            <span>Home</span>
          </div>
          <div className = "button" onClick = { () => { handleNavigation("Data"); } }>
            <span>Data</span>
          </div>
          <div className = "button" onClick = { () => { handleNavigation("Analytics"); } }>
            <span>Analytics</span>
          </div>
          <div className = "button" onClick = { () => { handleNavigation("Account"); } }>
            <span>Account</span>
          </div>
          <div className = "button" onClick = { () => { handleNavigation("Support"); } }>
            <span>Support</span>
          </div>
          <div className = "button" onClick = { () => { handleNavigation("Root"); } }>
            <span>Exit</span>
          </div>
        </div>  
      </div>
    );
  }
  
  function HomePage() {
    // setInterval((event) => { event.target.textContent = new Date().toLocaleString(); }, 1000); 

    function Backbone() {
      return (
        <div style = { { backgroundColor: "#FFFFFF", minWidth: "15%", height: "auto", padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start"} }>
          <span style = { { font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Executive Summary</span>
          <ul style = { { font: "12px 'Outfit', sans-serif", color: "#000000", lineHeight: "150%" } }>
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
      )
    }
    
    function Summary00() {
      return (
        <div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <img src = { seal } style = { { width: "120px", height: "120px", objectFit: "contain", objectPosition: "center center" } } alt = "Seal"/>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>City of Mandaluyong, National Capital Region</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 72px 'Outfit', sans-serif", color: "#000000" } }>Executive Summary</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>An empowered community, competent government sector human resource, and benevolent private sector working in an atmosphere of mutual assistance shaping Mandaluyong into a sustainable and globally competitive city and an effective partner in nation-building.</span>
          </div>
        </div>
      )
    }
    
    function Summary01() {
      return  (
        <div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 48px 'Outfit', sans-serif", color: "#000000" } }>Introduction</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>MANDALUYONG is a city that lies at the heart of Metropolitan Manila in the Republic of the Philippines.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Mandaluyong City skyline Mandaluyong’s remarkable rate of development since the early 80’s established the city as one of the most progressive economic centers in the country.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>In the past, Mandaluyong would hardly be thought of as the alternative place in which to be. Business tended to concentrate in neighboring areas and for some time, this quiet residential suburb just seemed to passively drift that way.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>But events that unfolded in the aftermath of the EDSA Revolution in 1986 saw the dawn of a new beginning for Mandaluyong.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>With the sense of stability brought about by a dynamic leadership then under Carmelita “Menchie” Aguilar Abalos., the expansion and relocation of major capital investments gradually shifted towards the city, and soon after, this once sleepy town’s landscape dramatically transformed into one of the most promising business and financial centers in Metro Manila.</span>
          </div>
        </div>
      )
    }
    
    function Summary02() {
      return  (
        <div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 36px 'Outfit', sans-serif", color: "#000000" } }>Messages</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis luctus eleifend. Maecenas ac massa feugiat, venenatis quam sit amet, mollis ex. Integer sodales odio non sem euismod varius. Sed vel consectetur justo. Pellentesque gravida aliquet nisl, a cursus purus mollis ut. Curabitur sit amet sem diam. Sed vel sodales neque, a faucibus lectus. Pellentesque viverra fermentum lacinia. Duis finibus eu nulla ut laoreet. Quisque in feugiat quam.</span>
          </div>
        </div>
      )
    }
    
    function Summary03() {
      return  (
        <div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 36px 'Outfit', sans-serif", color: "#000000" } }>Vision</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis luctus eleifend. Maecenas ac massa feugiat, venenatis quam sit amet, mollis ex. Integer sodales odio non sem euismod varius. Sed vel consectetur justo. Pellentesque gravida aliquet nisl, a cursus purus mollis ut. Curabitur sit amet sem diam. Sed vel sodales neque, a faucibus lectus. Pellentesque viverra fermentum lacinia. Duis finibus eu nulla ut laoreet. Quisque in feugiat quam.</span>
          </div>
        </div>
      )
    }
    
    function Summary04() {
      return  (
        <div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 36px 'Outfit', sans-serif", color: "#000000" } }>Mission</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis luctus eleifend. Maecenas ac massa feugiat, venenatis quam sit amet, mollis ex. Integer sodales odio non sem euismod varius. Sed vel consectetur justo. Pellentesque gravida aliquet nisl, a cursus purus mollis ut. Curabitur sit amet sem diam. Sed vel sodales neque, a faucibus lectus. Pellentesque viverra fermentum lacinia. Duis finibus eu nulla ut laoreet. Quisque in feugiat quam.</span>
          </div>
        </div>
      )
    }
    
    function Summary05() {
      return (
        <div>
          {/* <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { font: "bold 48px 'Outfit', sans-serif", color: "#000000" } }>Messages</span>
          </div>
          <div style = { { minWidth: "calc(180px + 20px)", height: "auto", margin: "9px", padding: "9px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" } }>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>MANDALUYONG is a city that lies at the heart of Metropolitan Manila in the Republic of the Philippines.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>Mandaluyong City skyline Mandaluyong’s remarkable rate of development since the early 80’s established the city as one of the most progressive economic centers in the country.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>In the past, Mandaluyong would hardly be thought of as the alternative place in which to be. Business tended to concentrate in neighboring areas and for some time, this quiet residential suburb just seemed to passively drift that way.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>But events that unfolded in the aftermath of the EDSA Revolution in 1986 saw the dawn of a new beginning for Mandaluyong.</span>
            <span style = { { margin: "0 0 12px 0", font: "bold 18px 'Outfit', sans-serif", color: "#000000" } }>With the sense of stability brought about by a dynamic leadership then under Carmelita “Menchie” Aguilar Abalos., the expansion and relocation of major capital investments gradually shifted towards the city, and soon after, this once sleepy town’s landscape dramatically transformed into one of the most promising business and financial centers in Metro Manila.</span>
          </div> */}
        </div>
      )
    }
  
    return (
      <div className = "container">
        <div style = { { width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "100", background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(118,194,224,1) 100%)" } }>
          <Menu/>
          <div style = { { width: "100%", top: "auto", zIndex: "0", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "start" } }>
            <Backbone/>
            <div style = { { width: "auto", height: "auto", padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start"} }>
              <Summary00/>
              <Summary01/>
              <Summary02/>
              <Summary03/>
              <Summary04/>
              <Summary05/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function DataPage() {
    const [active, setActive] = React.useState(null);

    return (
      <div className = "container fixed center-row layer-01" onLoad = { () => { setActive(null); } }>
        <Menu/>
        <div className = "container row-center">
          {/* <div className = "map-container"> */}
            <ArcGISMap/> 
          {/* </div> */}
          <div className = "container center-column">
            <div className = "header row-center">
              <div className = "button" onClick = { () => { setActive(null); } }>
                <span>All</span>
              </div>
              <div className = "button" onClick = { () => { setActive("Social"); } }>
                <span>Social</span>
              </div>
              <div className = "button" onClick = { () => { setActive("Economic"); } }>
                <span>Economic</span>
              </div>
              <div className = "button" onClick = { () => { setActive("Environmental"); } }>
                <span>Environmental</span>
              </div>
              <div className = "button" onClick = { () => { setActive("Demographic"); } }>
                <span>Demographic</span>
              </div>
            </div>
            <div className = "container">
              {
                active === "Social" ? <SocialPage/> :
                active === "Economic" ? <EconomicPage/> :
                active === "Environmental" ? <EnvironmentalPage/> :
                active === "Demographic" ? <DemographicPage/> :
                <SummaryPage/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  function SummaryPage() {
    function handleUpload(content) {
      const data = new FormData();
      for (let index = 0; index < content.length; index++) { data.append("file", content[index]); }

      const upload = async() => {
        await fetch("http://localhost:5000/upload/", {
          method: "POST",
          body: data
        })
        .then((response) => {
          return(response.json());
        })
        .then((response) => {
          if (response) {
            console.log("File(s) successfully uploaded!");
          }

          add_layer();
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
      }

      upload();
    }


    return (
      <div className = "box column-center" style = { { backgroundColor: "gray" } }>
        <div>
          <input type = "file" name = "generic-name" multiple onChange = { (event) => { handleUpload(event.target.files); } }/>
        </div>
      </div>
    )
  }

  function SocialPage() {
    return (
      <div className = "box column-center" style = { { backgroundColor: "red" } }>
        <span className = "type-xx-18">{ "Module development in progress." }</span>
      </div>
    )
  }

  function EconomicPage() {
    return (
      <div className = "box column-center" style = { { backgroundColor: "yellow" } }>
        <span className = "type-xx-18">{ "Module development in progress." }</span>
      </div>
    )
  }

  function EnvironmentalPage() {
    return (
      <div className = "box column-center" style = { { backgroundColor: "green" } }>
        <span className = "type-xx-18">{ "Module development in progress." }</span>
      </div>
    )
  }

  function DemographicPage() {
    return (
      <div className = "box column-center" style = { { backgroundColor: "blue" } }>
        <span className = "type-xx-18">{ "Module development in progress." }</span>
      </div>
    )
  }

  function AnalyticsPage() {
    return (
      // <div className = "box column-center">
      //   <span className = "type-xx-18">{ "Page development in progress." }</span>
      // </div>
      <div className = "container">
        <LeafletMap/>
      </div>
    )
  }

  function AccountPage() {
    return (
      <div className = "box column-center">
        <span className = "type-xx-18">{ "Page development in progress." }</span>
      </div>
    )
  }

  function SupportPage() {
    return (
      <div className = "box column-center">
        <span className = "type-xx-18">{ "Page development in progress." }</span>
      </div>
    )
  }

  function ErrorPage() {
    return (
      <div className = "box column-center">
        <img src = { error } title = "Error" alt = "Error" width = "240px" height = "240px"/>
        <span className = "type-xx-72">{ "ERROR 404" }</span>
        <span className = "type-xx-18">{ "Page not found." }</span>
      </div>
    );
  }

  return (
    <div className = "container">
      <Routes>
        <Route path = "/">
          <Route index = { true } element = { <RootPage/> }></Route>
          <Route path = "/sign-in" element = { <SignInPage/> }></Route>
          <Route path = "/home" element = { <HomePage/> }></Route>
          <Route path = "/data" element = { <DataPage/> }></Route>
          <Route path = "/analytics" element = { <AnalyticsPage/> }></Route>
          <Route path = "/account" element = { <AccountPage/> }></Route>
          <Route path = "/security" element = { <SecurityPage/> }></Route>
          <Route path = "/support" element = { <SupportPage/> }></Route>
        </Route>
        <Route path = "*" element = { <ErrorPage/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
