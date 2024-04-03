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

  const [modules, setModules] = React.useState([["Home", "🏡"], ["Data", "📁"], ["Analytics", "⭐"], ["Account", "🧑"], ["Support", "⚙️"], ["Exit", "🔚"]]);
  const [activeModule, setActiveModule] = React.useState(null);

  function handleNavigation(module) {
    localStorage.setItem("active_module", module);
    setActiveModule(module);

    switch (module) {
      case "Sign In":
        navigate("/sign-in");
        break;
      case "Change Password":
        navigate("/change-password");
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
      case "Support":
        navigate("/support");
        break;
      case "Exit":
        navigate("/");
        break;
      default:
        return null;
    }
  }

  /* The Dashboard component. */
  
  function Dashboard() {
    const [dashboardDropdownActive, setDashboardDropdownActive] = React.useState(false);
    
    window.addEventListener("resize", () => {
      setDashboardDropdownActive(false);
    });

    React.useEffect(() => {
      if (localStorage.getItem("active_module") !== null) setActiveModule(localStorage.getItem("active_module"));
    }, []);

    return (
      <div id = "dashboard" className = "container row-center">
        <div className = "header row-left">
          <div className = "row-center">
            <span>{ "🌱" }</span>
          </div>
          <div className = "row-center">
            <span>{ "SEEDs" }</span>
          </div>
        </div>
        <div className = "header row-right">
          <div className = "header-menu row-fill">
            {
              modules.map((item) => (
                <div key = { "header-menu-" + item[0] } className = { activeModule === item[0] ? "button active column-center" : "button column-center" } onClick = { () => { handleNavigation(item[0]); } }>
                  <span>{ item[1] }</span>
                  <div></div>
                  <span>{ item[0] }</span>
                </div>
              ))
            }
          </div>
          <div className = "header-dropdown column-center">
            <div className = "button row-center" onClick = { () => { setDashboardDropdownActive(!dashboardDropdownActive); } }>
              { dashboardDropdownActive ? <span>{ "❌" }</span> : <span>{ "🍔" }</span> }
            </div>
            <div className = { dashboardDropdownActive ? "header-list column-center" : "hidden" }>
              <div className = "container column-center">
                {
                  modules.map((item) => (
                    <div key = { "header-list-" + item[0] } className = "button row-center" onClick = { () => { handleNavigation(item[0]); } }>
                      <span>{ item[0] }</span>
                    </div>
                  ))
                }
              </div>
              <div className = "container row-center">
                <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* The ArcGIS map component and its corresponding functions. */

  const { ArcGISMap, add_layer } = React.useContext(ArcGISMapContext);

  /* Main modules. */

  function LandingPage() {
    return (
      <div id = "landing-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
          </div>
          <div className = "body column-center">
            <div className = "button row-center" onClick = { () => { handleNavigation("Sign In"); } }>
              <span>{ "Enter" }</span>
            </div>
          </div>
          <div className = "footer column-center">
            <div className = "container row-center">
              <span>{ "Terms" }</span>
              <span>{ "•" }</span>
              <span>{ "Privacy" }</span>
              <span>{ "•" }</span>
              <span>{ "Documentation" }</span>
              <span>{ "•" }</span>
              <span>{ "Support" }</span>
            </div>
            <div className = "container row-center">
              <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
            </div>
          </div>
        </div>
        <div className = "overlay container transparent">
          {/* <img src = { overlay } alt = "Overlay"/> */}
        </div>
        <div className = "foreground container column-top">
          <div className = "title row-center">
            <span>{ "SEEDs" }</span>
          </div>
          <div className = "subtitle row-center">
            <span>{ "a new way of looking at things" }</span>
          </div>
        </div>
        <div className = "background container">
          {/* <img src = { background } alt = "Background"/> */}
        </div>
      </div>
    );
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
          <div className = "header row-right">
            <div className = "button row-center" onClick = { () => { handleNavigation("Exit"); } }>
              <span>{ "❌" }</span>
            </div>
          </div>
          <div className = "body column-center">
            <div className = "form column-center">
              <div className = "form-header row-center">
                <span>{ "Sign In to 🌱 SEEDs" }</span>
              </div>
              <div className = "form-note row-center">
                <span>{ loginNote }</span>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "sign-in-username">
                  <span>{ "Username" }</span>
                </label>
                <input id = "sign-in-username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("username", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "sign-in-password">
                  <span>{ "Password" }</span>
                </label>
                <input id = "sign-in-password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { (event) => { localStorage.setItem("password", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
              </div>
              <div className = "form-buttons row-center">
                <div className = "button row-center" onClick = { () => { handleLogin(); } }>
                  <span>{ "Sign In" }</span>
                </div>
                <div className = "button row-center" onClick = { () => { handleNavigation("Change Password") } }>
                  <span>{ "Change Password" }</span>
                </div>
              </div>
            </div>
          </div>
          <div className = "footer column-center">
            <div className = "container row-center">
              <span>{ "Terms" }</span>
              <span>{ "•" }</span>
              <span>{ "Privacy" }</span>
              <span>{ "•" }</span>
              <span>{ "Documentation" }</span>
              <span>{ "•" }</span>
              <span>{ "Support" }</span>
            </div>
            <div className = "container row-center">
              <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className = "header row-right">
            <div className = "button row-center" onClick = { () => { handleNavigation("Sign In"); } }>
              <span>{ "❌" }</span>
            </div>
          </div>
          <div className = "body column-center">
            <div className = "form column-center">
              <div className = "form-header row-center">
                <span>{ "Change Password" }</span>
              </div>
              <div className = "form-note row-center">
                <span>{ changePasswordNote }</span>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-username">
                  <span>{ "Username" }</span>
                </label>
                <input id = "change-password-username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { setUsername(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-old-password">
                  <span>{ "Old Password" }</span>
                </label>
                <input id = "change-password-old-password" type = "password" minLength = "8" maxLength = "24" placeholder = "Old Password" onChange = { (event) => { setOldPassword(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password">
                  <span>{ "New Password" }</span>
                </label>
                <input id = "change-password-new-password" type = "password" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { setNewPassword(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password-clone">
                  <span>{ "New Password" }</span>
                </label>
                <input id = "change-password-new-password-clone" type = "password" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { setNewPasswordClone(event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
              </div>
              <div className = "form-buttons row-center">
                <div className = "button row-center" onClick = { () => { handleChangePassword(); } }>
                  <span>{ "Submit" }</span>
                </div>
              </div>
            </div>
          </div>
          <div className = "footer column-center">
            <div className = "container row-center">
              <span>{ "Terms" }</span>
              <span>{ "•" }</span>
              <span>{ "Privacy" }</span>
              <span>{ "•" }</span>
              <span>{ "Documentation" }</span>
              <span>{ "•" }</span>
              <span>{ "Support" }</span>
            </div>
            <div className = "container row-center">
              <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function HomePage() {
    return (
      <div id = "home-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
            <Dashboard/>
          </div>
          <div className = "body column-center">
          </div>
          {/* <div className = "footer row-center">
          </div> */}
        </div>
      </div>
    );
  }

  const [contexts, setContexts] = React.useState([["Upload", "🔼"], ["All", "🌐"], ["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]]);
  const [activeContext, setActiveContext] = React.useState(null);

  function handleContextNavigation(context) {
    localStorage.setItem("active_context", context);
    setActiveContext(context);
  }

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
  
    function handleFetchSocialArray() {
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
  
    function handleFetchEconomicArray() {
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
  
    function handleFetchEnvironmentalArray() {
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
  
    function handleFetchDemographicArray() {
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
        handleFetchSocialArray();
        handleFetchEconomicArray();
        handleFetchEnvironmentalArray();
        handleFetchDemographicArray();
      }
    }
  
    function UploadContext() {
      const [fileContainer, setFileContainer] = React.useState(null);
      const [fileCategory, setFileCategory] = React.useState(null);
      const [fileOptions, setFileOptions] = React.useState([["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]]);
  
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
        <div id = "upload-context">
          <div className = "header row-center">
            <input type = "file" multiple onChange = { (event) => { setFileContainer(event.target.files); } }/>
          </div>
          <div className = "column-center">
            <div className = "header row-center">
              <span>{ "Choose File Category:" }</span>
            </div>
            <div className = "header row-center">
              {
                fileOptions.map((item) => (
                  <div key = { "data-sector-item-" + item[0] } className = { fileCategory === item[0] ? "button row-center active" : "button row-center" } onClick = { () => { fileCategory === item[0] ? setFileCategory(null) : setFileCategory(item[0]) } }>
                    <span>{ item[1] }</span>
                  </div>
                ))
              }
            </div>
            <div className = "button row-center" onClick = { () => { handleUpload(fileContainer, fileCategory); } }>
              <span>Submit</span>
            </div>
          </div>
        </div>
      )
    }
  
    function SummaryContext() {
      return (
        <div id = "summary-context">
          {
            fileArray.length < 1 ?
            <div className = "column-top">
              <span>No items to show.</span>
            </div>
            :
            <div className = "column-top">
              {
                fileArray.map((item) => (
                  <div key = { item._id } className = "header row-fill">
                    <div className = "button" onClick = { () => { add_layer(item.file) } }>
                      <span className = "type-body">{ item.name }</span>
                    </div>
                    <div className = "row-center">
                      <span>{ "👀" }</span>
                      <span>{ "✏️" }</span>
                      <span>{ "🗑️" }</span>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
      )
    }
  
    function SocialContext() {
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
  
    function EconomicContext() {
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
  
    function EnvironmentalContext() {
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
  
    function DemographicContext() {
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

    React.useEffect(() => {
      if (localStorage.getItem("active_context") !== null) setActiveContext(localStorage.getItem("active_context"));
    }, []);

    return (
      <div id = "data-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
            <Dashboard/>
          </div>
          <div className = "body row-center">
            <div className = "column-center">
              <ArcGISMap/>
            </div>
            <div className = "column-top">
              <div className = "header row-center">
                {
                  contexts.map((item) => (
                    <div key = { "data-sector-item-" + item[0] } className = { activeContext === item[0] ? "button column-center active" : "button column-center" } onClick = { () => { handleContextNavigation(item[0]); } }>
                      <span>{ item[1] }</span>
                    </div>
                  ))
                }
              </div>
              <div className = "header row-center">
                { activeContext ?
                    <div className = "row-center">
                      <span>{ contexts[contexts.findIndex((item) => { if (item[0] === activeContext) return true; else return false; })][1] + " " + activeContext + " Data" }</span>
                    </div>
                    :
                    <div className = "row-center">
                      <span>{ contexts[0][1] + " Upload Data" }</span>
                    </div>
                }
              </div>
              <div className = "body column-center">
                {
                  activeContext === contexts[0][0] ? <UploadContext/> :
                  activeContext === contexts[1][0] ? <SummaryContext/> :
                  activeContext === contexts[2][0] ? <SocialContext/> :
                  activeContext === contexts[3][0] ? <EconomicContext/> :
                  activeContext === contexts[4][0] ? <EnvironmentalContext/> :
                  activeContext === contexts[5][0] ? <DemographicContext/> :
                  null
                }
              </div>
            </div>
          </div>
          {/* <div className = "footer row-center">
          </div> */}
        </div>
      </div>
    );
  }

  function AnalyticsPage() {
    return (
      <div id = "analytics-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
            <Dashboard/>
          </div>
          <div className = "body column-center">
            <div className = "container row-center">
              <LeafletMap/>
            </div>
          </div>
          {/* <div className = "footer row-center">
          </div> */}
        </div>
      </div>
    );
  }

  function AccountPage() {
    return (
      <div id = "account-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
            <Dashboard/>
          </div>
          <div className = "body column-center">
            <span>{ "Page development in progress." }</span>
          </div>
          {/* <div className = "footer row-center">
          </div> */}
        </div>
      </div>
    );
  }

  function SupportPage() {
    return (
      <div id = "support-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
            <Dashboard/>
          </div>
          <div className = "body column-center">
            <span>{ "Page development in progress." }</span>
          </div>
          {/* <div className = "footer row-center">
          </div> */}
        </div>
      </div>
    );
  }

  function ErrorPage() {
    return (
      <div id = "error-page">
        <div className = "interactive container column-center">
          <div className = "header row-center">
          </div>
          <div className = "body column-center">
          </div>
          <div className = "footer row-center">
          </div>
        </div>
      </div>
    )
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
