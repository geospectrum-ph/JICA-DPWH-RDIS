import * as React from "react";

import { useNavigate } from "react-router-dom";

// import axios from "axios";

import esriId from "@arcgis/core/identity/IdentityManager.js";

import { MainContext } from "../../contexts/MainContext";

import HomeComponent from "./home-component";
import LoadingComponent from "./loading-component";

import "./index.css";

// const URL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL;

function HomePage () {
  const navigate = useNavigate();
  
  const {
    token, setToken, 
    dataLoading, setDataLoading,
  } = React.useContext(MainContext);

  String.prototype.toProperCase = function () {
    return (this.replace(/\w+\S|.\s/g, function (text) {
      if (text.toLowerCase() === "of" || text.toLowerCase() === "ng" || text.toLowerCase() === "and" || text.toLowerCase() === "na" || (text.toLowerCase().startsWith("de") && text.length < 4)) {
        return (text.toLowerCase());
      }
      else if (text.includes("-")) {
        return (text.toLowerCase().split("-").map(function (portion) { return (String(portion).charAt(0).toUpperCase() + String(portion).slice(1)); }).join("-"));
      }
      else if (text.includes(" & ")) {
        return (text.toLowerCase().split(" & ").map(function (portion) { return (String(portion).charAt(0).toUpperCase() + String(portion).slice(1)); }).join(" & "));
      }
      else if (text.includes("&")) {
        return (text.toLowerCase().split("&").map(function (portion) { return (String(portion).charAt(0).toUpperCase() + String(portion).slice(1)); }).join(" & "));
      }
      else {
        return (text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
      }
    }));
  };
  
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
                
        setDataLoading(false);

        setToken(tokenInfo);
      })
      .catch(function (error) {
        alert(error);

        setDataLoading(false);

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
      console.log("test");
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
