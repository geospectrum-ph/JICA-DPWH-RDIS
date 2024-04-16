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

  /* The ArcGIS map component and its corresponding functions. */

  const { ArcGISMap, add_layer, remove_all_layers } = React.useContext(ArcGISMapContext);

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

  /* The Landing page. */

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

  /* The Sign In page. */

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
                <div className = "button row-center" onClick = { () => { handleNavigation("Change Password"); } }>
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

  /* The Password Change page. */

  function ChangePasswordPage() {
    localStorage.setItem("temporary_username", null);
    localStorage.setItem("temporary_old_password", null);
    localStorage.setItem("temporary_new_password", null);
    localStorage.setItem("temporary_new_password_clone", null);

    const [changePasswordNote, setChangePasswordNote] = React.useState("Please enter your username and password.");

    function handleChangePassword() {
      axios
        .post("http://localhost:5000/change-password/post/", {
          username: localStorage.getItem("temporary_username"),
          password: localStorage.getItem("temporary_old_password"),
          newPassword: localStorage.getItem("temporary_new_password"),
          clonePassword: localStorage.getItem("temporary_new_password_clone")
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
                <input id = "change-password-username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("temporary_username", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-old-password">
                  <span>{ "Old Password" }</span>
                </label>
                <input id = "change-password-old-password" type = "password" minLength = "8" maxLength = "24" placeholder = "Old Password" onChange = { (event) => { localStorage.setItem("temporary_old_password", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password">
                  <span>{ "New Password" }</span>
                </label>
                <input id = "change-password-new-password" type = "password" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { localStorage.setItem("temporary_new_password", event.target.value); } } required/>
              </div>
              <div className = "form-field row-center">
                <label htmlFor = "change-password-new-password-clone">
                  <span>{ "New Password" }</span>
                </label>
                <input id = "change-password-new-password-clone" type = "password" minLength = "8" maxLength = "24" placeholder = "New Password" onChange = { (event) => { localStorage.setItem("temporary_new_password_clone", event.target.value); } } required/>
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
                <div key = { "modules-map-row-" + item[0] } className = { activeModule === item[0] ? "button active column-center" : "button column-center" } onClick = { () => { handleNavigation(item[0]); } }>
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
                    <div key = { "modules-map-column-" + item[0] } className = "button row-center" onClick = { () => { handleNavigation(item[0]); } }>
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

  /* The Home page. */

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

  /* The Data page. */

  function DataPage() {
    const [contexts, setContexts] = React.useState([["Upload", "🔼"], ["All", "🌐"], ["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]]);
    const [activeContext, setActiveContext] = React.useState(null);

    const [fileArray, setFileArray] = React.useState(null);
    const [unclassifiedArray, setUnclassifiedArray] = React.useState(null);
    const [socialArray, setSocialArray] = React.useState(null);
    const [economicArray, setEconomicArray] = React.useState(null);  
    const [environmentalArray, setEnvironmentalArray] = React.useState(null);
    const [demographicArray, setDemographicArray] = React.useState(null);

    React.useEffect(() => {
      if (unclassifiedArray && socialArray && economicArray && environmentalArray && demographicArray) {
        setFileArray(() => [...unclassifiedArray, ...socialArray, ...economicArray, ...environmentalArray, ...demographicArray]);
      }
    }, [unclassifiedArray, socialArray, economicArray, environmentalArray, demographicArray]);
  
    React.useEffect(() => {
      axios
        .post("http://localhost:5000/fetch", {
        })
        .then((response) => {
          setUnclassifiedArray(response.data);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});

      axios
        .post("http://localhost:5000/fetch/social", {
        })
        .then((response) => {
          setSocialArray(response.data);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});

      axios
        .post("http://localhost:5000/fetch/economic", {
        })
        .then((response) => {
          setEconomicArray(response.data);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});

      axios
        .post("http://localhost:5000/fetch/environmental", {
        })
        .then((response) => {
          setEnvironmentalArray(response.data);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
      
      axios
        .post("http://localhost:5000/fetch/demographic", {
        })
        .then((response) => {
          setDemographicArray(response.data);
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }, []);

    function UploadContext() {
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
          .then((promise) => {
            promise
              .json()
              .then((result) => {
                switch (category) {
                  case "Social":
                    setSocialArray(() => [...socialArray, result]);
                    break;
                  case "Economic":
                    setEconomicArray(() => [...economicArray, result]);
                    break;
                  case "Environmental":
                    setEnvironmentalArray(() => [...environmentalArray, result]);
                    break;
                  case "Demographic":
                    setDemographicArray(() => [...demographicArray, result]);
                    break;
                  default:
                    setFileArray(() => [...fileArray, result]);
                    return null;
                }
              });
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
                contexts.slice(2).map((item) => (
                  <div key = { "file-options-map-" + item[0] } className = { fileCategory === item[0] ? "button row-center active" : "button row-center" } onClick = { () => { fileCategory === item[0] ? setFileCategory(null) : setFileCategory(item[0]) } }>
                    <span>{ item[1] }</span>
                  </div>
                ))
              }
            </div>
            <div className = "button row-center" onClick = { () => { handleUpload(fileContainer, fileCategory); setFileCategory(null);} }>
              <span>Submit</span>
            </div>
          </div>
        </div>
      )
    }

    const [fileShapefile, setFileShapefile] = React.useState(null);

    function handleViewShapefile(object) {
      let shapefile = object.file;
      let name = object._id;

      remove_all_layers();

      if (fileShapefile !== name) {
        add_layer(shapefile);
        setFileShapefile(name);
      }
      else {
        setFileShapefile(null);
      }
    }

    function handleDeleteItem(object) {
      remove_all_layers();
      setFileShapefile(null);

      axios
        .post("http://localhost:5000/delete", {
          file: object
        })
        .then((response) => {
          if (response) {
            switch (object.aspect) {
              case null:
                setUnclassifiedArray(() => unclassifiedArray.filter((item) => (item._id !== object._id)));
                break;
              case "social":
                setSocialArray(() => socialArray.filter((item) => (item._id !== object._id)));
                break;
              case "economic":
                setEconomicArray(() => economicArray.filter((item) => (item._id !== object._id)));
                break;
              case "environmental":
                setEnvironmentalArray(() => environmentalArray.filter((item) => (item._id !== object._id)));
                break;
              case "demographic":
                setDemographicArray(() => demographicArray.filter((item) => (item._id !== object._id)));
                break;
              default:
                setFileArray(() => fileArray.filter((item) => (item._id !== object._id)));
                return null;
            }
          }
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }

    React.useEffect(() => {
      if (localStorage.getItem("active_context") !== null) setActiveContext(localStorage.getItem("active_context"));
    }, []);

    function handleContextNavigation(context) {
      remove_all_layers();
      setFileShapefile(null);

      localStorage.setItem("active_context", context);
      setActiveContext(context);
    }

    const [fileDetails, setFileDetails] = React.useState(null);
    const [fileDetailsActive, setFileDetailsActive] = React.useState(false);

    React.useEffect(() => {
      setFileDetails(null);
      setFileDetailsActive(false);
    }, [activeContext]);

    function handleViewDetails(details) {
      setFileDetails(details);
      setFileDetailsActive(!fileDetailsActive);
    }

    function Summary({ array }) {
      return (
        <div className = "container column-top">
          {
            array.map((item) => (
              <div key = { "file-array-map-" + item._id } className = "column-top">
                <div className = "header row-fill">
                  <div className = "row-center">
                    <div className = "container row-left">
                      <span>{ item.name }</span>
                    </div>
                  </div>
                  <div className = "row-center">
                    <div className = "button row-center" onClick = { () => { handleViewShapefile(item); } }>
                      <span>{ fileShapefile === item._id ? "🙈" : "👀" }</span>
                    </div>
                    <div className = { fileShapefile === item._id ? "button row-center" : "hidden" } onClick = { () => { handleViewDetails(item); } }>
                      <span>{ fileDetailsActive ? "❌" : "📋" }</span>
                    </div>
                    <div className = { fileShapefile === item._id ? "button row-center" : "hidden" }>
                      <span>{ "✏️" }</span>
                    </div>
                    <div className = { fileShapefile === item._id ? "button row-center" : "hidden" } onClick = { () => { handleDeleteItem(item); } }>
                      <span>{ "🗑️" }</span>
                    </div>
                  </div>
                </div>
                <div className = { fileDetailsActive && fileShapefile === item._id ? "row-center" : "hidden" }>
                  <div className = "row-center">
                    <span>{ item.aspect ? item.aspect : "No information available." }</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      );
    }

    function SocialContext() {
      return (
        <div id = "social-context">
          {
            socialArray ?
              socialArray.length > 0 ?
                <Summary array = { socialArray }/>
              :
                <div className = "empty-content container row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

    function EconomicContext() {
      return (
        <div id = "economic-context">
          {
            economicArray ?
              economicArray.length > 0 ?
                <Summary array = { economicArray }/>
              :
                <div className = "empty-content container row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

    function EnvironmentalContext() {
      return (
        <div id = "environmental-context">
          {
            environmentalArray ?
              environmentalArray.length > 0 ?
                <Summary array = { environmentalArray }/>
              :
                <div className = "empty-content container row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

    function DemographicContext() {
      return (
        <div id = "demographic-context">
          {
            demographicArray ?
              demographicArray.length > 0 ?
                <Summary array = { demographicArray }/>
              :
                <div className = "empty-content container row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

    function SummaryContext() {
      return (
        <div id = "summary-context">
          {
            fileArray ?
              fileArray.length > 0 ?
                <Summary array = { fileArray }/>
              :
                <div className = "empty-content container row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

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
                    <div key = { "contexts-map-" + item[0] } className = { activeContext === item[0] ? "button column-center active" : "button column-center" } onClick = { () => { handleContextNavigation(item[0]); } }>
                      <span>{ item[1] }</span>
                    </div>
                  ))
                }
              </div>
              <div className = "header row-center">
                <span>{ activeContext ? contexts[contexts.findIndex((item) => { if (item[0] === activeContext) return true; else return false; })][1] + " " + activeContext + " Data" : contexts[0][1] + " Upload Data" }</span>
              </div>
              <div className = "body column-center">
                {
                  activeContext === contexts[1][0] ? <SummaryContext/> :
                  activeContext === contexts[2][0] ? <SocialContext/> :
                  activeContext === contexts[3][0] ? <EconomicContext/> :
                  activeContext === contexts[4][0] ? <EnvironmentalContext/> :
                  activeContext === contexts[5][0] ? <DemographicContext/> :
                  <UploadContext/>
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
