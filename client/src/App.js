import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";

import { ArcGISMapContext } from "./ArcGIS.js";
import LeafletMap from "./Leaflet.js"

import "./App.css";

import background from "./assets/images/background.png";
import overlay from "./assets/images/overlay.png";

function App() {
  /* For the handling of errors. */

  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    if (errorMessage) console.log(errorMessage);
  }, [errorMessage]);

  /* For the navigation of routes. */

  const navigate = useNavigate();

  function handleNavigation(module) {
    switch (module) {
      case "Exit":
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
      case "Change Password":
        navigate("/change-password");
        break;
      case "Support":
        navigate("/support");
        break;
      default:
        return null;
    }
  }
  
  function Dashboard() {
    const [modules, setModules] = React.useState([["Home", "🏡"], ["Data", "📁"], ["Analytics", "⭐"], ["Account", "🧑"], ["Support", "⚙️"], ["Exit", "🔚"]]);
    
    const [headerListActive, setHeaderListActive] = React.useState(false);

    window.addEventListener("resize", () => {
      setHeaderListActive(false);
    });

    return (
      <div>
        <div>
          <div>
            <span>🌱</span>
          </div>
          <div>
            <span>SEEDs</span>
          </div>
        </div>
        <div>
          <div>
            {
              modules.map((item) => (
                <div key = { "header-menu-" + item[0] } onClick = { () => { handleNavigation(item[0]); } }>
                  <span>{ item[1] }</span>
                </div>
              ))
            }
          </div>
          <div>
            <div onClick = { () => { setHeaderListActive(!headerListActive); } }>
              { headerListActive ? <span>❌</span> : <span>🍔</span> }
            </div>
            <div className = { headerListActive ? null : "hidden" }>
              <div>
                {
                  modules.map((item) => (
                    <div key = { "header-list-" + item[0] } onClick = { () => { handleNavigation(item[0]); } }>
                      <span>{ item[0] }</span>
                    </div>
                  ))
                }
              </div>
              <div>
                <span>Powered by 🌈 GEOSPECTRUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Main modules. */

  function LandingPage() {
    return (
      <div id = "landing-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
          </div>
          <div className = "body column-center">
            <div className = "button row-center" onClick = { () => { handleNavigation("Sign In") } }>
              <span>Enter</span>
            </div>
          </div>
          <div className = "footer column-center">
            <div className = "wrapper row-center">
              <span>Terms</span>
              <span>•</span>
              <span>Privacy</span>
              <span>•</span>
              <span>Documentation</span>
              <span>•</span>
              <span>Support</span>
            </div>
            <div className = "wrapper row-center">
              <span>Powered by 🌈 GEOSPECTRUM</span>
            </div>
          </div>
        </div>
        <div className = "overlay container transparent">
          {/* <img src = { overlay } alt = "Overlay"/> */}
        </div>
        <div className = "foreground container column-top">
          <div className = "title row-center">
            <span>SEEDs</span>
          </div>
          <div className = "subtitle row-center">
            <span>a new way of looking at things</span>
          </div>
        </div>
        <div className = "background container">
          {/* <img src = { background } alt = "Background"/> */}
        </div>
      </div>
    )
  }

  function SignInPage() {
    const [loginNote, setLoginNote] = React.useState("Please enter your username and password.");

    function handleLogin() {
      axios
        .post("http://localhost:5000/sign-in/post/", {
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
      <div id = "sign-in-page">
        <div className = "interactive container column-center">
          <div className = "wrapper column-center">
            <div className = "form column-top">
              <div className = "form-header row-center">
                <span>Sign In to 🌱 SEEDs</span>
              </div>
              <div className = "form-note row-center">
                <span>{ loginNote }</span>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "sign-in-username">
                  <span>Username</span>
                </label>
                <input id = "sign-in-username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("username", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "sign-in-password">
                  <span>Password</span>
                </label>
                <input id = "sign-in-password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { (event) => { localStorage.setItem("password", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
              </div>
              <div className = "form-buttons row-center">
                <div className = "button row-center" onClick = { () => { handleLogin(); } }>
                  <span>Sign In</span>
                </div>
                <div className = "button row-center" onClick = { () => { handleNavigation("Change Password") } }>
                  <span>Change Password</span>
                </div>
              </div>
            </div>
            <div className = "footer row-center">
              <span>Terms</span>
              <span>•</span>
              <span>Privacy</span>
              <span>•</span>
              <span>Documentation</span>
              <span>•</span>
              <span>Support</span>
            </div>
            <div className = "footer row-center">
              <span>SEEDs © 2023 by Geospectrum Analytics Services, Inc.</span>
            </div>
          </div>          
        </div>
        <div className = "background container">
          <div className = "button row-center" onClick = { () => { handleNavigation("Exit") } }>
            <span>❌</span>
          </div>
        </div> 
      </div>
    )
  }

  function ChangePasswordPage() {
    const [username, setUsername] = React.useState(null);
    const [oldPassword, setOldPassword] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState(null);
    const [newPasswordClone, setNewPasswordClone] = React.useState(null);

    const [changePasswordNote, setChangePasswordNote] = React.useState("Please enter your username and password.");

    function handleChangePassword() {
      axios
        .post("http://localhost:5000/change-password/post/", {
          username: username,
          password: oldPassword,
          newPassword: newPassword,
          clonePassword: newPasswordClone
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
              handleNavigation("Sign In");
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
      <div id = "change-password-page">
        <div className = "interactive container column-center">
          <div className = "wrapper column-center">
            <div className = "form column-top">
              <div className = "form-header row-center">
                <span>Change Password</span>
              </div>
              <div className = "form-note row-center">
                <span>{ changePasswordNote }</span>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-username">
                  <span>Username</span>
                </label>
                <input id = "change-password-username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { setUsername(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-old-password">
                  <span>Old Password</span>
                </label>
                <input id = "change-password-old-password" type = "password" minLength = "8" maxLength = "24" placeholder = "Old Password" onChange = { (event) => { setOldPassword(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password">
                  <span>New Password</span>
                </label>
                <input id = "change-password-new-password" type = "password" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { setNewPassword(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password-clone">
                  <span>New Password</span>
                </label>
                <input id = "change-password-new-password-clone" type = "password" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { setNewPasswordClone(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
              </div>
              <div className = "form-buttons row-center">
                <div className = "button row-center" onClick = { () => { handleChangePassword(); } }>
                  <span>Submit</span>
                </div>
              </div>
            </div>
            <div className = "footer row-center">
              <span>Terms</span>
              <span>•</span>
              <span>Privacy</span>
              <span>•</span>
              <span>Documentation</span>
              <span>•</span>
              <span>Support</span>
            </div>
            <div className = "footer row-center">
              <span>SEEDs © 2023 by Geospectrum Analytics Services, Inc.</span>
            </div>
          </div>          
        </div>
        <div className = "background container">
          <div className = "button row-center" onClick = { () => { handleNavigation("Sign In") } }>
            <span>❌</span>
          </div>
        </div> 
      </div>
    )
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
            {/* <img src = { seal } style = { { width: "120px", height: "120px", objectFit: "contain", objectPosition: "center center" } } alt = "Seal"/> */}
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
          <Dashboard/>
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

  const { add_layer, ArcGISMap } = React.useContext(ArcGISMapContext);

  function DataPage() {
    const [fileArray, setFileArray] = React.useState([]);

    const [socialArray, setSocialArray] = React.useState([]);
    const [socialArrayBoolean, setSocialArrayBoolean] = React.useState(false);
  
    const [economicArray, setEconomicArray] = React.useState([]);
    const [economicArrayBoolean, setEconomicArrayBoolean] = React.useState(false);
  
    const [environmentalArray, setEnvironmentalArray] = React.useState([]);
    const [environmentalArrayBoolean, setEnvironmentalArrayBoolean] = React.useState(false);
  
    const [demographicArray, setDemographicArray] = React.useState([]);
    const [demographicArrayBoolean, setDemographicArrayBoolean] = React.useState(false);
  
    function handleFetchSocial() {
      axios
        .post("http://localhost:5000/fetch/social", {
        })
        .then((response) => {
          setSocialArray(response.data);
          setSocialArrayBoolean(true);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }
  
    function handleFetchEconomic() {
      axios
        .post("http://localhost:5000/fetch/economic", {
        })
        .then((response) => {
          setEconomicArray(response.data);
          setEconomicArrayBoolean(true);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }
  
    function handleFetchEnvironmental() {
      axios
        .post("http://localhost:5000/fetch/environmental", {
        })
        .then((response) => {
          setEnvironmentalArray(response.data);
          setEnvironmentalArrayBoolean(true);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }
  
    function handleFetchDemographic() {
      axios
        .post("http://localhost:5000/fetch/demographic", {
        })
        .then((response) => {
          setDemographicArray(response.data);
          setDemographicArrayBoolean(true);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }
  
    function populateFileArray() {
      if (!socialArrayBoolean && !economicArrayBoolean && !environmentalArrayBoolean && !demographicArrayBoolean) {
        handleFetchSocial();
        handleFetchEconomic();
        handleFetchEnvironmental();
        handleFetchDemographic();
      }
    }
  
    React.useEffect(() => {
      populateFileArray();
    }, []);
  
    React.useEffect(() => {
      if (socialArrayBoolean && economicArrayBoolean && environmentalArrayBoolean && demographicArrayBoolean) {
        setSocialArrayBoolean(false);
        setEconomicArrayBoolean(false);
        setEnvironmentalArrayBoolean(false);
        setDemographicArrayBoolean(false);
  
        setFileArray(() => [...socialArray, ...economicArray, ...environmentalArray, ...demographicArray]);
      }
    }, [socialArray, economicArray, environmentalArray, demographicArray]);

    function UploadPage() {
      const [fileContainer, setFileContainer] = React.useState(null);
      const [fileCategory, setFileCategory] = React.useState(null);

      function handleUpload(content, category) {
        const data = new FormData();
        
        for (let index = 0; index < content.length; index++) { data.append("file", content[index]); }
    
        let path = "http://localhost:5000/upload/" + (category === null ? "" : category);
    
        const upload = async() => {
          await fetch(path, {
            method: "POST",
            body: data
          })
          .then((response) => {
            if (response) {
              console.log("Upload successful!");
            }
    
            populateFileArray();
          })
          .catch((error) => {
            setErrorMessage(error);
          })
          .finally(() => {});
        }
    
        upload();
      }

      return (
        <div className = "container column-center">
          <input type = "file" id = "file-container" name = "file-container" multiple onChange = { (event) => { setFileContainer(event.target.files); } }/>
          <label htmlFor = "file-container"></label>
          <fieldset onChange = { (event) => { setFileCategory(event.target.value); } }>
            <legend>Select one file category:</legend>
            <div>
              <input type = "radio" id = "social" name = "file-category" value = "social"/>
              <label htmlFor = "social">Social</label>
            </div>
            <div>
              <input type = "radio" id = "economic" name = "file-category" value = "economic"/>
              <label htmlFor = "economic">Economic</label>
            </div>
            <div>
              <input type = "radio" id = "environmental" name = "file-category" value = "environmental"/>
              <label htmlFor = "Environmental">Environmental</label>
            </div>
            <div>
              <input type = "radio" id = "demographic" name = "file-category" value = "demographic"/>
              <label htmlFor = "Demographic">Demographic</label>
            </div>
          </fieldset>
          <div className = "button" onClick = { () => { handleUpload(fileContainer, fileCategory); } }><span className = "type-body">Submit</span></div>
        </div>
      )
    }

    function SummaryPage() {
      return (
        <div className = "container column-center">
          {
            fileArray.length < 1 ?
            <div className = "container column-center">
              <span className = "type-body">No items to show.</span>
            </div>
            :
            <div className = "container">
              {
                fileArray.map((item) => (
                  <div className = "container row-center">
                    <div key = { item._id } className = "button" onClick = { () => { add_layer(item.file) } }>
                      <span className = "type-body">{ item.name }</span>
                    </div>
                    <div className = "container row-center">
                      <span>👀</span>
                      <span>✏️</span>
                      <span>🗑️</span>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
      )
    }
  
    function SocialPage() {
      return (
        <div className = "box column-center" style = { { backgroundColor: "red" } }>
          <div className = "container column-center">
            {
              socialArray.length < 1 ?
              <div className = "container column-center">
                <span className = "type-body">No items to show.</span>
              </div>
              :
              socialArray.map((item) => (
                <div key = { item._id } className = "button" onClick = { () => { add_layer(item.file) } }>
                  <span className = "type-body">{ item.name }</span>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  
    function EconomicPage() {
      return (
        <div className = "box column-center" style = { { backgroundColor: "yellow" } }>
          <div className = "container column-center">
            {
              economicArray.length < 1 ?
              <div className = "container column-center">
                <span className = "type-body">No items to show.</span>
              </div>
              :
              economicArray.map((item) => (
                <div key = { item._id } className = "button" onClick = { () => { add_layer(item.file) } }>
                  <span className = "type-body">{ item.name }</span>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  
    function EnvironmentalPage() {
      return (
        <div className = "box column-center" style = { { backgroundColor: "green" } }>
          <div className = "container column-center">
            {
              environmentalArray.length < 1 ?
              <div className = "container column-center">
                <span className = "type-body">No items to show.</span>
              </div>
              :
              environmentalArray.map((item) => (
                <div key = { item._id } className = "button" onClick = { () => { add_layer(item.file) } }>
                  <span className = "type-body">{ item.name }</span>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  
    function DemographicPage() {
      return (
        <div className = "box column-center" style = { { backgroundColor: "blue" } }>
          <div className = "container column-center">
            {
              demographicArray.length < 1 ?
              <div className = "container column-center">
                <span className = "type-body">No items to show.</span>
              </div>
              :
              demographicArray.map((item) => (
                <div key = { item._id } className = "button" onClick = { () => { add_layer(item.file) } }>
                  <span className = "type-body">{ item.name }</span>
                </div>
              ))
            }
          </div>
        </div>
      )
    }

    const [active, setActive] = React.useState("Upload");
    const [actions, setActions] = React.useState([["Upload", "🔼"], ["All", "🌐"], ["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]])

    return (
      <div className = "container fixed center-row layer-01" onLoad = { () => { setActive(null); } }>
        <Dashboard/>
        <div className = "data-page-outer-container">
          <div className = "map-container">
            <ArcGISMap/> 
          </div>
          <div className = "data-page-inner-container">
            <div className = "header row-center">
              {
                actions.map((item) => (
                  <div key = { "data-page-actions-" + item[0] } className = "header-menu-item" onClick = { () => { setActive(item[0]); } }>
                    <span>{ item[1] }</span>
                  </div>
                ))
              }
            </div>
            <div className = "header row-center">
              <span>{ actions[actions.findIndex((item) => { if (item[0] === active) return true; else return false; })][1] + " " + active + " Data"}</span>
            </div>
            <div className = "container">
              {
                active === actions[1][0] ? <SummaryPage/> :
                active === actions[2][0] ? <SocialPage/> :
                active === actions[3][0] ? <EconomicPage/> :
                active === actions[4][0] ? <EnvironmentalPage/> :
                active === actions[5][0] ? <DemographicPage/> :
                <UploadPage/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  function AnalyticsPage() {
    return (
      // <div className = "box column-center">
      //   <span className = "type-xx-18">{ "Page development in progress." }</span>
      // </div>
      <div className = "container">
        <Dashboard/>
        <LeafletMap/>
      </div>
    )
  }

  function AccountPage() {
    return (
      <div className = "container column-center">
        <Dashboard/>
        <div className = "container column-center">
          <span className = "type-xx-18">{ "Page development in progress." }</span>
        </div>
      </div>
    )
  }

  function SupportPage() {
    return (
      <div className = "container column-center">
        <Dashboard/>
        <div className = "container column-center">
          <span className = "type-xx-18">{ "Page development in progress." }</span>
        </div>
      </div>
    )
  }

  function ErrorPage() {
    return (
      <div className = "box column-center">
        <span className = "type-xx-72">{ "ERROR 404" }</span>
        <span className = "type-xx-18">{ "Page not found." }</span>
      </div>
    );
  }

  return (
    <div className = "container">
      <Routes>
        <Route path = "/">
          <Route index = { true } element = { <LandingPage/> }></Route>
          <Route path = "/sign-in" element = { <SignInPage/> }></Route>
          <Route path = "/home" element = { <HomePage/> }></Route>
          <Route path = "/data" element = { <DataPage/> }></Route>
          <Route path = "/analytics" element = { <AnalyticsPage/> }></Route>
          <Route path = "/account" element = { <AccountPage/> }></Route>
          <Route path = "/change-password" element = { <ChangePasswordPage/> }></Route>
          <Route path = "/support" element = { <SupportPage/> }></Route>
        </Route>
        <Route path = "*" element = { <ErrorPage/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
