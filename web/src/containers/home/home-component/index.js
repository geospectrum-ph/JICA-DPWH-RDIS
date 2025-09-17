import * as React from "react";

import { Outlet } from "react-router-dom";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import { MainContext } from "../../../contexts/MainContext";

import {
  MapComponent,
  layer_road_slope_hazards,
  layer_road_slopes_and_countermeasures
} from "../map-component";

import TitleComponent from "../title-component";
import FilterComponent from "../filter-component";
import MenuComponent from "../menu-component";
import AdminComponent from "../admin-component";

import "./index.css";

function HomeComponent () {
  const {
    menuComponentOpen,

    modules,
    moduleSelected
  } = React.useContext(MainContext);

  React.useEffect(function () {
    // For rendering feature layer photos.
    
    const url_RDIS_RSH_photos = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/service_d949cc4a920045c699f13c5bb9e8938d/FeatureServer/0";
    const url_RDIS_RSMS_photos = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/service_fbfed27f898a4806af2b014de697906f/FeatureServer/0";
    // const url_RDIS_RSMS_photos_additional = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/service_fbfed27f898a4806af2b014de697906f/FeatureServer/1";

    new FeatureLayer({
      url: url_RDIS_RSH_photos
    })
    .queryAttachments({
      where: "1 = 1",
      returnGeometry: false,
      outFields: ["*"]
    })
    .then(function (response) {
      let retrieved_attachments = response;
      let retrieved_keys = Object.keys(retrieved_attachments);

      layer_road_slope_hazards
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: false,
          outFields: ["*"]
        })
        .then(async function (response) {
          if (response.features?.length > 0) {
            for (const feature of response.features) {
              let index = retrieved_keys.find(function (key) { return (retrieved_attachments[key][0].parentGlobalId === feature.attributes.globalid); });

              if (index) {
                let attachments_array = retrieved_attachments[index];

                layer_road_slope_hazards
                  .queryAttachments({
                    where: `globalid = '${ feature.attributes.globalid }'`,
                    returnGeometry: false,
                    outFields: ["*"]
                  })
                  .then(async function (response) {
                    let existing_attachments = response;
                    let key = Object.keys(existing_attachments)[0];
                    let working_array = existing_attachments[key]?.length > 0 ? existing_attachments[key].map(function (item) { return (item.name); }) : [];

                    for (const attachment of attachments_array) {
                      if (working_array.indexOf(attachment.name) < 0) {
                        const form = new FormData();
      
                        var image = await fetch(attachment.url);
                        var blob = await image.blob();
                        var file = new File([blob], attachment.name, { lastModified: new Date().getTime(), type: blob.type });
      
                        form.append("file", file);
                        form.append("f", "json");
      
                        layer_road_slope_hazards
                          .addAttachment(feature, form)
                          .catch(function (error) {
                            // console.log(error);
                          });
                      }
                    }
                  })
                  .catch(function (error) {
                    // console.log(error);
                  });
              }
            }
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    })
    .catch(function (error) {
      // console.log(error);
    });

    new FeatureLayer({
      url: url_RDIS_RSMS_photos
    })
    .queryAttachments({
      where: "1 = 1",
      returnGeometry: false,
      outFields: ["*"]
    })
    .then(function (response) {
      let retrieved_attachments = response;
      let retrieved_keys = Object.keys(retrieved_attachments);

      layer_road_slopes_and_countermeasures
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: false,
          outFields: ["*"]
        })
        .then(async function (response) {
          if (response.features?.length > 0) {
            for (const feature of response.features) {
              let index = retrieved_keys.find(function (key) { return (retrieved_attachments[key][0].parentGlobalId === feature.attributes.globalid); });

              if (index) {
                let attachments_array = retrieved_attachments[index];

                layer_road_slopes_and_countermeasures
                  .queryAttachments({
                    where: `globalid = '${ feature.attributes.globalid }'`,
                    returnGeometry: false,
                    outFields: ["*"]
                  })
                  .then(async function (response) {
                    let existing_attachments = response;
                    let key = Object.keys(existing_attachments)[0];
                    let working_array = existing_attachments[key]?.length > 0 ? existing_attachments[key].map(function (item) { return (item.name); }) : [];

                    for (const attachment of attachments_array) {
                      if (working_array.indexOf(attachment.name) < 0) {
                        const form = new FormData();
      
                        var image = await fetch(attachment.url);
                        var blob = await image.blob();
                        var file = new File([blob], attachment.name, { lastModified: new Date().getTime(), type: blob.type });
      
                        form.append("file", file);
                        form.append("f", "json");
      
                        layer_road_slopes_and_countermeasures
                          .addAttachment(feature, form)
                          .catch(function (error) {
                            // console.log(error);
                          });
                      }
                    }
                  })
                  .catch(function (error) {
                    // console.log(error);
                  });
              }
            }
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    })
    .catch(function (error) {
      // console.log(error);
    });
  }, []);

  return (
    <div id = "home-component">
      <div>
        <div>
          <TitleComponent/>
        </div>
        <div>
          <div>
            <MenuComponent/>
          </div>
          <div className = { menuComponentOpen ? "outlet-hidden" : "outlet-visible" }>
            <Outlet/>
          </div>
        </div>
      </div>
      <div>
        <div className = { modules[moduleSelected].map_visible ? "map-visible" : "map-hidden" }>
          <div>
            <FilterComponent/>
          </div>
          <div>
            <MapComponent/>
          </div>
        </div>
        <div className = { modules[moduleSelected].map_visible ? "admin-hidden" : "admin-visible" }>
          <AdminComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
