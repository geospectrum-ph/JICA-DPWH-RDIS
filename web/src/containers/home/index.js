import * as React from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import esriId from "@arcgis/core/identity/IdentityManager.js";

import { MainContext } from "../../contexts/MainContext";

import HomeComponent from "./home-component";
import LoadingComponent from "./loading-component";

import "./index.css";

// const URL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL;

function HomePage () {
  const navigate = useNavigate();
  
  const {
    dataLoading,
    setDataLoading
  } = React.useContext(MainContext);

  const [token, setToken] = React.useState(null);

  async function handleAuthentication (username, password) {
    const portalUrl = "https://www.arcgis.com";      
    const server = portalUrl + "/sharing/rest";
    const tokenServiceUrl = server + "/generateToken";
    
    const serverInfo = {
      tokenServiceUrl
    };
    
    const userInfo = {
      username,
      password
    };
    
    esriId
      .generateToken(serverInfo, userInfo)
      .then(function (tokenInfo) {
        // axios
        //   .post("http://localhost:1433/users/login", userInfo)
        //   .then(function (response) {             
            esriId
              .registerToken({
                ...tokenInfo,
                server
              });

            // sessionStorage.setItem("regionDefault", response.data.user.ro);
            // sessionStorage.setItem("engineeringDistrictDefault", response.data.user.deo);

            let user_ro = username === "dpwh_rdis" ? null : username === "rdis_training1" ? "Region VII" : "Cordillera Administrative Region";
            let user_deo = username === "dpwh_rdis" ? null : username === "rdis_training1" ? null : null;

            sessionStorage.setItem("regionDefault", user_ro);
            sessionStorage.setItem("engineeringDistrictDefault", user_deo);

            setToken(tokenInfo);
          // });
      })
      .catch(function (error) {
        // console.log(error);

        setToken(null);

        navigate("/");
      });
  }

  React.useEffect(function () {
    setDataLoading(true);

    let username = sessionStorage.getItem("username");
    let password = sessionStorage.getItem("password");

    if (String(username).length > 0 && String(username).length > 0)  {
      handleAuthentication(username, password);
    }
    else {
      setDataLoading(false);

      navigate("/");
    }
  }, []);

  return (
    <div id = "home-container">
      <div>
        { Boolean(token) ? <HomeComponent/> : null }
      </div>
      <div className = { dataLoading || !(Boolean(token)) ? "loading-component-visible" : "loading-component-hidden" }>
        <LoadingComponent/>
      </div>
    </div>
  );
}

export default HomePage;
