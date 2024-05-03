import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";

import { ArcGISMapContext } from "./ArcGIS.js";
import LeafletMap from "./Leaflet.js"

import "./App.css";

function App() {
  /* For the handling of errors. */

  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => { if (errorMessage) { console.log(errorMessage); } }, [errorMessage]);

  /* The ArcGIS map component and its corresponding functions. */

  const { ArcGISMap, add_layer, remove_all_layers } = React.useContext(ArcGISMapContext);

  /* For the navigation of routes. */

  const [activeModule, setActiveModule] = React.useState(null);

  React.useEffect(() => {
    let value = localStorage.getItem("active_module");

    if (value) { setActiveModule(value); }
  }, []);

  const navigate = useNavigate();

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
        localStorage.clear();
        navigate("/");
        break;
      default:
        return null;
    }    
  }

  function Dashboard() {
    function Brand() {
      return (
        <div id = "dashboard-brand" className = "row-center">
          <div className = "row-center">
            <span>{ "🌱" }</span>
          </div>
          <div className = "row-center">
            <span>{ "SEEDs" }</span>
          </div>
        </div>
      );
    }

    const modules = [["Home", "🏡"], ["Data", "📁"], ["Analytics", "⭐"], ["Account", "🧑"], ["Support", "⚙️"], ["Exit", "🔚"]];

    function FullMenu() {
      return (
        <div id = "dashboard-full-menu" className = "row-center">
          {
            modules.map((item) => (
              <button key = { "key-dfm-" + item[0] } className = "column-center" type = "button" onClick = { () => { handleNavigation(item[0]); } }>
                <div className = "row-center">
                  <span>{ item[1] }</span>
                </div>
                <div className = "row-center">
                  <span>{ item[0] }</span>
                </div>
              </button>
            ))
          }
        </div>
      );
    }

    function HiddenMenu() {
      const [view, setView] = React.useState(false);

      React.useEffect(() => {
        window.addEventListener("resize", setView(false));
      }, []);

      return (
        <div id = "dashboard-hidden-menu" className = "row-center">
          <div className = "row-center">
            <button className = "row-center" type = "button" onClick = { () => { setView(!view); } }>
              { view ? <span>{ "❌" }</span> : <span>{ "🍔" }</span> }
            </button>
          </div>
          <div className = { view ? "column-center" : "hidden" }>
            <div className = "row-center">
              {
                modules.map((item) => (
                  <button key = { "key-dhm-" + item[0] } className = "row-center" type = "button" onClick = { () => { handleNavigation(item[0]); } }>
                    <span>{ item[0] }</span>
                  </button>
                ))
              }
            </div>
            <div className = "row-center">
              <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id = "dashboard" className = "row-center">
        <div className = "row-left">
          <Brand/>
        </div>
        <div className = "row-right">
          <FullMenu/>
          <HiddenMenu/>
      </div>
    </div>
    );
  }

  function LinkBar() {
    return (
      <div className = "column-center">
        <div className = "row-center">
          <div className = "row-center">
            <a href = "#">{ "Terms" }</a>
          </div>
          <div className = "row-center">
            <span>{ "•" }</span>
          </div>
          <div className = "row-center">
            <a href = "#">{ "Privacy" }</a>
          </div>
          <div className = "row-center">
            <span>{ "•" }</span>
          </div>
          <div className = "row-center">
            <a href = "about" target = "_self">{ "Documentation" }</a>
          </div>
          <div className = "row-center">
            <span>{ "•" }</span>
          </div>
          <div className = "row-center">
            <a href = "#">{ "Support" }</a>
          </div>
        </div>
        <div className = "row-center">
          <span>{ "Powered by " }<a href = "https://geospectrum.com.ph" target = "_blank">{ "🌈 GEOSPECTRUM" }</a></span>
        </div>
      </div>
    );
  }

  /* The Landing page. */

  function LandingPage() {
    return (
      <div id = "landing-page" className = "container column-center">
        <div className = "header row-center">
        </div>
        <div className = "body column-center">
          <div className = "row-center">
            <span>{ "SEEDs" }</span>
          </div>
          <div className = "row-center">
            <span>{ "a new way of looking at things" }</span>
          </div>
          <div className = "row-center" >
            <button type = "button" onClick = { () => { handleNavigation("Sign In"); } }>{ "Enter" }</button>
          </div>
        </div>
        <div className = "footer column-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The About page. */

  function AboutPage() {
    return (
      <div id = "sign-in-page" className = "container column-center">
        <div className = "header row-right">
          <div className = "row-center" >
            <button type = "button" onClick = { () => { handleNavigation("Exit"); } }>{ "❌" }</button>
          </div>
        </div>
        <div className = "body column-center">
          <span>{ "Page development in progress." }</span>
        </div>
        <div className = "footer column-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Sign In page. */

  function SignInPage() {
    class SignInForm extends React.Component {
      constructor(props) {
        super(props);

        this.state = { note: "Please enter your username and password." };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) { localStorage.setItem(event.target.name, event.target.value); }

      handleSubmit(event) {
        axios
          .post("http://localhost:5000/user/sign-in/", {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          })
          .then((response) => {
            this.setState({ note: response.data.note });

            if (response.data.code === 200) {
              localStorage.setItem("token", true);
              handleNavigation("Home");
            }
          })
          .catch((error) => { setErrorMessage(error); })
          .finally(() => {});

        event.preventDefault();
      }
    
      render() {
        return (
          <form id = "sign-in-form" className = "column-center" onSubmit = { this.handleSubmit }>
            <div className = "row-center">
              <span>{ "Sign In to 🌱 SEEDs" }</span>
            </div>
            <div className = "row-center">
              <span>{ this.state.note }</span>
            </div>
            <label>
              <span>{ "Username" }</span>
              <input type = "text" name = "username" autoComplete = "true" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <label>
              <span>{ "Password" }</span>
              <input type = "password" name = "password" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <input className = "button" type = "submit" value = "Submit"/>
            <div className = "row-center" >
              <button type = "button" onClick = { () => { handleNavigation("Change Password"); } }>{ "Change Password" }</button>
            </div>
          </form>
        );
      }
    }

    return (
      <div id = "sign-in-page" className = "container column-center">
        <div className = "header row-right">
          <div className = "row-center" >
            <button type = "button" onClick = { () => { handleNavigation("Exit"); } }>{ "❌" }</button>
          </div>
        </div>
        <div className = "body column-center">
          <SignInForm/>
        </div>
        <div className = "footer column-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Change Password page. */

  function ChangePasswordPage() {
    class ChangePasswordForm extends React.Component {
      constructor(props) {
        super(props);

        this.state = { note: "Please enter your username and password." };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) { localStorage.setItem(event.target.name, event.target.value); }

      handleSubmit(event) {
        axios
          .post("http://localhost:5000/user/change-password/", {
            username: localStorage.getItem("temporary_username"),
            password: localStorage.getItem("temporary_old_password"),
            newPassword: localStorage.getItem("temporary_new_password"),
            clonePassword: localStorage.getItem("temporary_new_password_clone")
          })
          .then((response) => {
            this.setState({ note: response.data.note });

            if (response.data.code === 200) { handleNavigation("Sign In"); }
          })
          .catch((error) => { setErrorMessage(error); })
          .finally(() => {});

        event.preventDefault();
      }
    
      render() {
        return (
          <form id = "change-password-form" className = "column-center" onSubmit = { this.handleSubmit }>
            <div className = "row-center">
              <span>{ "Change Password" }</span>
            </div>
            <div className = "row-center">
              <span>{ this.state.note }</span>
            </div>
            <label>
              <span>{ "Username" }</span>
              <input type = "text" name = "temporary_username" autoComplete = "true" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <label>
              <span>{ "Old Password" }</span>
              <input type = "password" name = "temporary_old_password" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <label>
              <span>{ "New Password" }</span>
              <input type = "password" name = "temporary_new_password" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <label>
              <span>{ "New Password" }</span>
              <input type = "password" name = "temporary_new_password_clone" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <input className = "button" type = "submit" value = "Submit"/>
          </form>
        );
      }
    }

    return (
      <div id = "change-password-page" className = "container column-center">
        <div className = "header row-right">
          <div className = "row-center" >
            <button type = "button" onClick = { () => { handleNavigation("Sign In"); } }>{ "❌" }</button>
          </div>
        </div>
        <div className = "body column-center">
          <ChangePasswordForm/>
        </div>
        <div className = "footer column-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Home page. */

  function HomePage() {
    return (
      <div id = "home-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body column-center">
          <span>{ "Page development in progress." }</span>
        </div>
        <div className = "footer row-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Data page. */

  function DataPage() {
    const [fileObject, setFileObject] = React.useState(null);
    const [fileArray, setFileArray] = React.useState(null);

    const [activeArray, setActiveArray] = React.useState([]);

    function handleFetchData() {
      axios
        .post("http://localhost:5000/data/fetch/", {})
        .then((response) => {
          setFileObject(response.data);
          setFileArray(Object.values(response.data).flat());
          setActiveArray(Object.values(response.data).flat());
        })
        .catch((error) => { setErrorMessage(error); })
        .finally(() => {});
    }

    const contexts = [["Upload", "🔼"], ["All", "🌐"], ["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]];

    const [activeContext, setActiveContext] = React.useState(null);

    React.useEffect(() => {
      handleFetchData();

      let value = localStorage.getItem("active_context");
  
      if (value) { setActiveContext(value); }
      else { setActiveContext("Upload"); }
    }, []);

    function handleContextNavigation(context) {
      localStorage.setItem("active_context", context);
      setActiveContext(context);

      switch (context) {
        case "Upload":
        case "All":
          setActiveArray(fileArray);
          break;
        case "Social":
          setActiveArray(fileObject.social);
          break;
        case "Economic":
          setActiveArray(fileObject.economic);
          break;
        case "Environmental":
          setActiveArray(fileObject.environmental);
          break;
        case "Demographic":
          setActiveArray(fileObject.demographic);
          break;
        default:
          return (null);
      }
    }

    function ContextSwitch() {
      return (
        <div id = "data-page-context-switch" className = "column-center">
          <div className = "row-center">
          {
            contexts.map((item) => (
              <button key = { "key-dpcs-" + item[0] } className = "column-center" type = "button" onClick = { () => { handleContextNavigation(item[0]); } }>
                <span>{ item[1] }</span>
              </button>
            ))
          }
          </div>
          <div className = "row-center">
            <span>{ activeContext ? activeContext + " Data" :  null }</span>
          </div>
        </div>
      );
    }

    function UploadContext() {
      const [fileContent, setFileContent] = React.useState(null);
      const [fileCategory, setFileCategory] = React.useState(null);
      const [fileTags, setFileTags] = React.useState("");

      function handleUploadData(object, aspect, tags) {
        if (object === null) {
          setErrorMessage("No file uploaded!");
          return null;
        }

        const data = new FormData();
        
        for (let index = 0; index < object.length; index++) { data.append("file", object[index]); }
        data.append("category", aspect ? aspect.toLowerCase() : "unclassified");
        data.append("tags", tags);
        
        const upload = async() => {
          await fetch("http://localhost:5000/data/upload/", {
            method: "POST",
            body: data
          })
          .then((promise) => {
            promise
              .json()
              .then((response) => {
                if (response) {
                  Object.assign(fileObject, { [response.aspect]: [...fileObject[response.aspect], response] });
                  setFileArray(() => [...fileArray, response]);
                }
              })
              .catch((error) => { setErrorMessage(error); });
          })
          .catch((error) => { setErrorMessage(error); })
          .finally(() => {});
        }
    
        upload();
      }

      return (
        <div id = "upload-context" className = "column-center">
          <div className = "row-center">
            <input type = "file" onChange = { (event) => { setFileContent(event.target.files); } }/>
          </div>
          <div className = "row-center">
            <span>{ "Choose File Category:" }</span>
          </div>
          <div className = "row-center">
            {
              contexts.slice(2).map((item) => (
                <button key = { "key-dpucc-" + item[0] } className = "row-center" type = "button" onClick = { () => { fileCategory === item[0] ? setFileCategory(null) : setFileCategory(item[0]) } }>
                  <span>{ item[1] }</span>
                </button>
              ))
            }
          </div>
          <div className = "row-center">
            <span>{ "Input Tags:" }</span>
          </div>
          <div className = "column-center">
            <div className = "row-center">
              {
                fileTags ?
                  fileTags.split(" ").filter((word) => word.length > 0).splice(0, 5).map((item, index) => (
                    item ?
                      <div key = { "keu-dpuct-" + index } className = "row-center">
                        <span>{ item }</span>
                        <button type = "button">{ "❌" }</button>
                      </div>
                    :
                      null
                  ))
                :
                  null 
              }
            </div>
            <div className = "row-center">
              <input type = "text" onChange = { (event) => { setFileTags(event.target.value) } }/>
            </div>
          </div>
          <div className = "row-center">
            <button className = "row-center" type = "button" onClick = { () => { handleUploadData(fileContent, fileCategory, fileTags); } }>
              <span>Submit</span>
            </button>
          </div>
        </div>
      )
    }

    function SummaryContext() {
      const [shapefile, setShapefile] = React.useState(null);
      const [showShapefile, setShowShapefile] = React.useState(false);

      function ViewData({ object }) {
        function handleViewData() {
          remove_all_layers();
          
          if (shapefile === object._id) {
            setShapefile(null);
            setShowShapefile(false);
          }
          else {
            setShapefile(object._id);
            setShowShapefile(true);
            add_layer(object.file);
          }
        }

        return (
          <div className = "row-center">
            <button type = "button" onClick = { () => { handleViewData(); } }>
              <span>{ "XP" }</span>
            </button>
          </div>
        );
      }

      const [details, setDetails] = React.useState(null);
      const [showDetails, setShowDetails] = React.useState(false);

      function InspectData({ object }) {
        function handleInspectData() {
          setDetails(
            <div className = "column-center">
              <div className = "row-center">
                <span>{ "Aspect: " }</span>
                <span>{ object.aspect }</span>
              </div>
              <div className = "row-center">
                <span>{ "Tags: " }</span>
                { object.tags.map((item, index) => (<span key = { "key-dpid-" + index }>{ item }</span>)) }
              </div>
            </div>
          );

          setShowDetails(!showDetails);
        }

        return (
          <div className = "row-center">
            <button type = "button" onClick = { () => { handleInspectData(); } }>
              <span>{ ":)" }</span>
            </button>
          </div>
        );
      }

      const [editDetails, setEditDetails] = React.useState(false);

      function EditData({ object }) {
        function handleEditData() {
          if (showDetails) {
            if (editDetails) {
              setShowDetails(false);
              setEditDetails(false);
            }
            else {
              setDetails(
                <span>{ "Function is under development." }</span>
              );

              setEditDetails(true);
            }
          }
        }

        return (
          <div className = "row-center">
            <button type = "button" onClick = { () => { handleEditData(); } }>
              <span>{ "T^T" }</span>
            </button>
          </div>
        );
      }
  
      function DeleteData({ object }) {
        function handleDeleteData() {
          axios
            .post("http://localhost:5000/data/delete/", {
              file: object
            })
            .then((response) => {
              if (response) {
                let new_object = fileObject[object.aspect].filter((item) => (item._id !== object._id));
  
                Object.assign(fileObject, { [object.aspect]: new_object });
                
                let new_array = Object.values(Object.assign(fileObject, { [object.aspect]: new_object })).flat();
  
                setFileArray(new_array);
  
                if (activeContext === "All") { setActiveArray(new_array); }
                else { setActiveArray(new_object); }
              }
            })
            .catch((error) => {
              setErrorMessage(error);
            })
            .finally(() => {});
        }
  
        return (
          <div className = "row-center">
            <button type = "button" onClick = { () => { handleDeleteData(); } }>
              <span>{ ":'(" }</span>
            </button>
          </div>
        );
      }
      
      function ArrayList() {
        return (
          <div className = "column-top">
            {
              activeArray.map((item) => (
                <div key = { "key-dpsc-" + item._id } className = "column-center">
                  <div className = "row-center">
                    <div className = "row-center">
                      <span>{ item.name }</span>
                    </div>
                    <div className = "row-center">
                      <ViewData object = { item }/>
                      <InspectData object = { item }/>
                      <EditData object = { item }/>
                      <DeleteData object = { item }/>
                    </div>
                  </div>
                  <div className = "row-center">
                    { showDetails ? details : null }
                  </div>
                </div>
              ))
            }
          </div>
        );
      }

      function NoList() {
        return (
          <div className = "row-center">
            <span>{ "No items to show." }</span>
          </div>
        );
      }

      return (
        <div id = "data-page-summary-context" className = "column-top">{ activeArray ? activeArray.length > 0 ? <ArrayList/> : <NoList/> : null } </div>
      );
    }

    return (
      <div id = "data-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body row-center">
          <div className = "row-center">
            <ArcGISMap/>
          </div>
          <div className = "column-top">
            <div className = "header row-center">
              <ContextSwitch/>
            </div>     
            <div className = "body column-center">
              { activeContext ? activeContext === contexts[0][0] ? <UploadContext/> : <SummaryContext/> : null }
            </div>
          </div>
        </div>
        <div className = "footer row-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Analytics page. */

  function AnalyticsPage() {
    return (
      <div id = "analytics-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body column-center">
          <span>{ "Page development in progress." }</span>
        </div>
        <div className = "footer row-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Account page. */
  
  function AccountPage() {
    return (
      <div id = "account-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body column-center">
          <span>{ "Page development in progress." }</span>
        </div>
        <div className = "footer row-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Support page. */
  
  function SupportPage() {
    return (
      <div id = "support-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body column-center">
          <span>{ "Page development in progress." }</span>
        </div>
        <div className = "footer row-center">
          <LinkBar/>
        </div>
      </div>
    );
  }

  /* The Error page. */

  function ErrorPage() {
    return (
      <div id = "error-page" className = "container column-center">
        <div className = "row-center">
          <a href = "https://geospectrum.com.ph" target = "_self">{ "Geospectrum" }</a>
        </div>
        <div className = "row-center">
          <span>{ "Page not found." }</span>
        </div>
        <div className = "row-center">
        <button type = "button" onClick = { () => { handleNavigation("Exit"); } }>{ "Return home." }</button>
        </div>
      </div>
    )
  }

  return (
    <div className = "container">
      <Routes>
        <Route path = "/">
          <Route index = { true } element = { <LandingPage/> }></Route>
          <Route path = "/about" element = { <AboutPage/> }></Route>
          <Route path = "/sign-in" element = { <SignInPage/> }></Route>
          <Route path = "/change-password" element = { <ChangePasswordPage/> }></Route>
          <Route path = "/home" element = { localStorage.token ? <HomePage/> : <SignInPage/> }></Route>
          <Route path = "/data" element = { localStorage.token ? <DataPage/> : <SignInPage/> }></Route>
          <Route path = "/analytics" element = { localStorage.token ? <AnalyticsPage/> : <SignInPage/> }></Route>
          <Route path = "/account" element = { localStorage.token ? <AccountPage/> : <SignInPage/> }></Route>
          <Route path = "/support" element = { localStorage.token ? <SupportPage/> : <SignInPage/> }></Route>
        </Route>
        <Route path = "*" element = { <ErrorPage/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
