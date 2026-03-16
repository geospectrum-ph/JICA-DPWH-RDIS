import * as React from "react";

import { useNavigate, } from "react-router-dom";

import esriId from "@arcgis/core/identity/IdentityManager.js";

import { MainContext, } from "../../contexts/MainContext";

import HomeComponent from "./home-component";
import LoadingComponent from "./loading-component";

import "./index.css";

function HomePage () {
  const navigate = useNavigate();
  
  const {
    dataLoading,
    setDataLoading,
    token, setToken,
  } = React.useContext(MainContext);

  React.useEffect(function () {
    setDataLoading(true);

    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");

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
          esriId
            .registerToken({
              ...tokenInfo,
              server
            });

          let user_ro =
            username === "dpwh_rdis" ?
              null
              :
            username === "rdis_training1" ?
              "Cordillera Administrative Region"
              :
            username === "rdis_training2" ?
              "Region VII"
              :
            username === "rdis_training3" ?
              "Region XI"
              :
            username === "rdis_training4" ?
              "National Capital Region"
              :
              "National Capital Region";

          let user_deo =
            username === "dpwh_rdis" ?
              null
              :
            username === "rdis_training1" ?
              null
              :
            username === "rdis_training2" ?
              null
              :
            username === "rdis_training3" ?
              null
              :
            username === "rdis_training4" ?
              "South Manila District Engineering Office"
              :
              null;

          localStorage.setItem("regionDefault", user_ro);
          localStorage.setItem("engineeringDistrictDefault", user_deo);

          localStorage.setItem("yearDefault", new Date().getFullYear());

          setToken(tokenInfo);
        })
        .catch(function () {
          setToken(null);

          navigate("/");
        });
    }

    if (String(username).length > 0 && String(username).length > 0)  {
      handleAuthentication(username, password);
    }
    else {
      setDataLoading(false);

      navigate("/");
    }

  }, [navigate, setDataLoading]);

  return (
    <div id = "home-container">
      <div>
        { Boolean(token) ? <HomeComponent/> : null }
      </div>
      <div className = { dataLoading ?? !(Boolean(token)) ? "loading-component-visible" : "loading-component-hidden" }>
        <LoadingComponent/>
      </div>
    </div>
  );
}

export default HomePage;
