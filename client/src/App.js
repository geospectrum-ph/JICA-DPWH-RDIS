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

  const modules = [["Home", "🏡"], ["Data", "📁"], ["Analytics", "⭐"], ["Account", "🧑"], ["Support", "⚙️"], ["Exit", "🔚"]];

  const [activeModule, setActiveModule] = React.useState(null);

  const navigate = useNavigate();

  function handleNavigation(module) {
    switch (module) {
      default:
        localStorage.setItem("active_module", module);
        setActiveModule(module);
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
    }
    
    return null;
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
              <a href = "#">{ "Documentation" }</a>
            </div>
            <div className = "row-center">
              <span>{ "•" }</span>
            </div>
            <div className = "row-center">
              <a href = "#">{ "Support" }</a>
            </div>
          </div>
          <div className = "row-center">
            <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
          </div>
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
          <form className = "column-center" onSubmit = { this.handleSubmit }>
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
          <div className = "row-center">
            <span>{ "Terms" }</span>
            <span>{ "•" }</span>
            <span>{ "Privacy" }</span>
            <span>{ "•" }</span>
            <span>{ "Documentation" }</span>
            <span>{ "•" }</span>
            <span>{ "Support" }</span>
          </div>
          <div className = "row-center">
            <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
          </div>
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
          <form className = "column-center" onSubmit = { this.handleSubmit }>
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
          <div className = "row-center">
            <span>{ "Terms" }</span>
            <span>{ "•" }</span>
            <span>{ "Privacy" }</span>
            <span>{ "•" }</span>
            <span>{ "Documentation" }</span>
            <span>{ "•" }</span>
            <span>{ "Support" }</span>
          </div>
          <div className = "row-center">
            <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
          </div>
        </div>
      </div>
    );
  }

  /* The Dashboard component. */

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);

      // this.state = { switch: false };
  
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);

      // this.handleDashboardSwitch = this.handleDashboardSwitch.bind(this);
    }

    // handleDashboardSwitch() {
    //   this.setState({ switch: false });
    // };

    componentDidMount() {
      // window.addEventListener("resize", this.handleDashboardSwitch);

      if (localStorage.getItem("active_module") !== null) setActiveModule(localStorage.getItem("active_module"));
    }

    // componentWillUnmount() {
    //   window.removeEventListener("resize", this.handleDashboardSwitch);
    // }

    render() {
      return (
        <div id = "dashboard" className = "row-center">
          <div className = "row-left">
            <div className = "row-center">
              <span>{ "🌱" }</span>
            </div>
            <div className = "row-center">
              <span>{ "SEEDs" }</span>
            </div>
          </div>
          <div className = "row-right">
            <div className = "row-fill">
              {
                modules.map((item) => (
                  <button key = { "modules-map-row-" + item[0] } className = "column-center" onClick = { () => { handleNavigation(item[0]); } }>
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
          {/* <div className = "column-center">
            <div className = "button row-center" onClick = { this.setState.switch(!this.state.switch) }>
              { this.state.switch ? <span>{ "❌" }</span> : <span>{ "🍔" }</span> }
            </div>
            <div className = { this.state.switch ? "header-list column-center" : "hidden" }>
              <div className = " column-center">
                {
                  modules.map((item) => (
                    <div key = { "modules-map-column-" + item[0] } className = "button row-center" onClick = { () => { handleNavigation(item[0]); } }>
                      <span>{ item[0] }</span>
                    </div>
                  ))
                }
              </div>
              <div className = " row-center">
                <span>{ "Powered by 🌈 GEOSPECTRUM" }</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      );
    }
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
        </div>
      </div>
    );
  }

  /* The Data page. */

  function DataPage() {
    const contexts = [["Upload", "🔼"], ["All", "🌐"], ["Social", "👨🏽‍👩🏽‍👧🏽‍👦🏽"], ["Economic", "💸"], ["Environmental", "🐤"], ["Demographic", "📈"]];
    
    const [activeContext, setActiveContext] = React.useState(null);

    React.useEffect(() => {
      if (localStorage.getItem("active_context") !== null) setActiveContext(localStorage.getItem("active_context"));
    }, []);

    function handleContextNavigation(context) {
      localStorage.setItem("active_context", context);
      setActiveContext(context);
    }

    const [fileObject, setFileObject] = React.useState(null);
    const [fileArray, setFileArray] = React.useState(null);

    function handleFetchData() {
      axios
        .post("http://localhost:5000/data/fetch/", {})
        .then((response) => {
          setFileObject(response.data);
          setFileArray(Object.values(response.data).flat());
        })
        .catch((error) => { setErrorMessage(error); })
        .finally(() => {});
    }

    React.useEffect(() => { handleFetchData(); }, []);

    function handleUploadData(object, aspect) {
      const data = new FormData();
      
      for (let index = 0; index < object.length; index++) { data.append("file", object[index]); }
      data.append("category", aspect ? aspect.toLowerCase() : "unclassified");
      
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

    function UploadContext() {
      const [file, setFile] = React.useState(null);
      const [fileCategory, setFileCategory] = React.useState(null);

      return (
        <div id = "upload-context">
          <div className = "header row-center">
            <input type = "file" onChange = { (event) => { setFile(event.target.files); } }/>
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
            <div className = "button row-center" onClick = { () => { handleUploadData(file, fileCategory); } }>
              <span>Submit</span>
            </div>
          </div>
        </div>
      )
    }

    const [fileShapefile, setFileShapefile] = React.useState(null);

    class ViewData extends React.Component {
      constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        remove_all_layers();
  
        if (fileShapefile !== this.props.item._id) {
          add_layer(this.props.item.file);
          setFileShapefile(this.props.item._id);
        }
        else { setFileShapefile(null); }
      }
    
      render() {
        return (
          <div className = "button row-center" onClick = { this.handleClick }>
            <span>{ fileShapefile === this.props.item._id ? "🙈" : "👀" }</span>
          </div>
        );
      }
    }

    const [fileDetails, setFileDetails] = React.useState(null);
    const [fileDetailsActive, setFileDetailsActive] = React.useState(false);
    const [fileEdits, setFileEdits] = React.useState(null);
    const [fileEditsActive, setFileEditsActive] = React.useState(false);

    React.useEffect(() => {
      setFileDetails(null);
      setFileDetailsActive(false);
      setFileEdits(null);
      setFileEditsActive(false);

      remove_all_layers();
      setFileShapefile(null);
    }, [activeContext]);

    class InspectData extends React.Component {
      constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        setFileDetails(this.props.item);
        setFileDetailsActive(!fileDetailsActive);
      }
    
      render() {
        return (
          <div className = { fileShapefile === this.props.item._id ? "button row-center" : "hidden" } onClick = { this.handleClick }>
            <span>{ fileDetailsActive ? "❌" : "📋" }</span>
          </div>
        );
      }
    }

    function handleEditData(edits) {
      setFileEdits(edits);
      setFileEditsActive(!fileEditsActive);
    }

    let parsedTokens = [];

    class TagsForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = { value: "" };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        let words = event.target.value.split(" ");
        let word = "";

        if (event.target.value.endsWith(" ")) { words.pop(); }
        else { word = words.pop(); }

        if (words[0]) { parsedTokens.push(words[0]); }
        this.setState({ value: word });
      }
    
      handleSubmit(event) {
        parsedTokens.push(this.state.value);
        console.log(parsedTokens);
        parsedTokens = [];
        event.preventDefault();
      }
    
      render() {
        return (
          <form className = "header row-center" onSubmit = { this.handleSubmit }>
            <label>
              Tags:
              <input type = "text" value = { this.state.value } onChange = { this.handleChange } required/>
            </label>
            <input type = "submit" value = "Submit"/>
          </form>
        );
      }
    }

    function EditContext({ object }) {
      return (
        <div className = "column-top">
          <div className = "header row-center">
            <input id = "edit-data-name" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = { object.name ? object.name : "" } onChange = { (event) => { Object.assign(editObject, { "name": event.target.value }); } } required/>
          </div>
          <div className = "header row-center">
            <input id = "edit-data-aspect" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = { object.aspect ? object.aspect : "" } onChange = { (event) => { Object.assign(editObject, { "aspect": event.target.value }); } } required/>
          </div>
          <div className = "header row-center">
            <TagsForm/>
          </div>
        </div>
      )
    }

    function handleDeleteData(object) {
      remove_all_layers();
      setFileShapefile(null);

      axios
        .post("http://localhost:5000/data/delete/", {
          file: object
        })
        .then((response) => {
          if (response) {
            Object.assign(fileObject, { [object.aspect]: fileObject[object.aspect].filter((item) => (item._id !== object._id)) });
            setFileArray(() =>fileArray.filter((item) => (item._id !== object._id)));
          }
        })
        .catch((error) => {
          setErrorMessage(error);
        })
        .finally(() => {});
    }

    function DataComponent({ array }) {
      return (
        <div className = " column-top">
          {
            array.map((item) => (
              <div key = { "file-array-map-" + item._id } className = "column-top">
                <div className = "header row-fill">
                  <div className = "row-center">
                    <div className = " row-left">
                      <span>{ item.name }</span>
                    </div>
                  </div>
                  <div className = "row-center">
                    <ViewData item = { item }/>
                    <InspectData item = { item }/>
                    {/* 
                    <EditData/>
                    <DeleteData/> */}

                    <div className = { fileShapefile === item._id ? "button row-center" : "hidden" } onClick = { () => { handleEditData(item); } }>
                      <span>{ fileEditsActive ? "❌" : "✏️" }</span>
                    </div>
                    <div className = { fileShapefile === item._id ? "button row-center" : "hidden" } onClick = { () => { handleDeleteData(item); } }>
                      <span>{ "🗑️" }</span>
                    </div>
                  </div>
                </div>
                <div className = { fileDetailsActive && fileShapefile === item._id ? "row-center" : "hidden" }>
                  <div className = "row-center">
                    <span>{ item.aspect ? item.aspect : "No information available." }</span>
                  </div>
                </div>
                <div className = { fileEditsActive && fileShapefile === item._id ? "row-center" : "hidden" }>
                  <div className = "row-center">
                      {
                        item ?
                          <EditContext object = { item }/>
                        :
                          <span>{ "No information available." }</span>
                      }
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
            fileObject.social ?
              fileObject.social.length > 0 ?
                <DataComponent array = { fileObject.social }/>
              :
                <div className = "empty-content  row-center">
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
            fileObject.economic ?
              fileObject.economic.length > 0 ?
                <DataComponent array = { fileObject.economic }/>
              :
                <div className = "empty-content  row-center">
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
            fileObject.environmental ?
              fileObject.environmental.length > 0 ?
                <DataComponent array = { fileObject.environmental }/>
              :
                <div className = "empty-content  row-center">
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
            fileObject.demographic ?
              fileObject.demographic.length > 0 ?
                <DataComponent array = { fileObject.demographic }/>
              :
                <div className = "empty-content  row-center">
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
                <DataComponent array = { fileArray }/>
              :
                <div className = "empty-content  row-center">
                  <span>{ "No items to show." }</span>
                </div>
            :
              null
          }
        </div>
      );
    }

    return (
      <div id = "data-page" className = "container column-center">
        <div className = "header row-center">
          <Dashboard/>
        </div>
        <div className = "body row-center">
          <div className = "column-center">
            <ArcGISMap/>
          </div>
          <div className = "column-top">
            <div className = "header column-center">
              <div className = "row-center">
                {
                  contexts.map((item) => (
                    <button key = { "contexts-map-" + item[0] } className = "column-center" onClick = { () => { handleContextNavigation(item[0]); } }>
                      <span>{ item[1] }</span>
                    </button>
                  ))
                }
              </div>
              <div className = "row-center">
                <span>{ activeContext ? contexts[contexts.findIndex((item) => { if (item[0] === activeContext) return true; else return false; })][1] + " " + activeContext + " Data" : contexts[0][1] + " Upload Data" }</span>
              </div>
            </div>     
            <div className = "body column-center">
              {
                fileArray ?
                  activeContext === contexts[1][0] ? <SummaryContext/> :
                  activeContext === contexts[2][0] ? <SocialContext/> :
                  activeContext === contexts[3][0] ? <EconomicContext/> :
                  activeContext === contexts[4][0] ? <EnvironmentalContext/> :
                  activeContext === contexts[5][0] ? <DemographicContext/> :
                  <UploadContext/>
                :
                  null
              }
            </div>
          </div>
        </div>
        <div className = "footer row-center">
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
        </div>
      </div>
    );
  }

  /* The Error page. */

  function ErrorPage() {
    return (
      <div id = "error-page">
      </div>
    )
  }

  return (
    <div className = "container">
      <Routes>
        <Route path = "/">
          <Route index = { true } element = { <LandingPage/> }></Route>
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
