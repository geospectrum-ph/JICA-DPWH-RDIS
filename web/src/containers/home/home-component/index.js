import * as React from "react";

import { Outlet } from "react-router-dom";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import { MainContext } from "../../../contexts/MainContext";

import { MapComponent, layer_road_slope_hazards, layer_road_slopes_and_countermeasures, layer_municipalities_cities, layer_provinces, layer_legislative_districts, layer_engineering_districts, layer_regions } from "../map-component";

import TitleComponent from "../title-component";
import FilterComponent from "../filter-component";
import MenuComponent from "../menu-component";

import "./index.css";

function HomeComponent () {
  const { menuComponentOpen } = React.useContext(MainContext);

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

  React.useEffect(function () {
    // For rendering administrative boundaries.

    layer_municipalities_cities
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          const array = response.features.map(function (feature) {
            return ({
              value: feature.attributes.MUNICIPAL,
              label: `${ feature.attributes.MUNICIPAL.toUpperCase() }, ${ feature.attributes.PROVINCE.toProperCase() }`,
              symbol: {
                type: "simple-fill",
                color:
                  feature.attributes.OBJECTID % 4 === 0 ? "rgba(246, 214, 214, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 1 ? "rgba(246, 247, 196, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 2 ? "rgba(161, 238, 189, 1.00)" :
                  "rgba(123, 211, 234, 1.00)",
                outline: { 
                  color: [0, 0, 0, 1.00],
                  width: 1.00
                }
              }
            });
          });

          layer_municipalities_cities.renderer = {
            type: "unique-value",
            field: "MUNICIPAL",
            defaultLabel: "Others",
            defaultSymbol: {
              type: "simple-fill",
              color: [191, 191, 191, 0.50],
              outline: { 
                color: [0, 0, 0, 1.00],
                width: 1.00
              }
            },
            uniqueValueInfos: array
          };
        }
      })
      .catch(function (error) {
        // console.log(error);
      });

    layer_provinces
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          const array = response.features.map(function (feature) {
            return ({
              value: feature.attributes.PROVINCE,
              label: `${ feature.attributes.PROVINCE.toProperCase() }`,
              symbol: {
                type: "simple-fill",
                color:
                  feature.attributes.OBJECTID % 4 === 0 ? "rgba(246, 214, 214, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 1 ? "rgba(246, 247, 196, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 2 ? "rgba(161, 238, 189, 1.00)" :
                  "rgba(123, 211, 234, 1.00)",
                outline: { 
                  color: [0, 0, 0, 1.00],
                  width: 1.00
                }
              }
            });
          });

          layer_provinces.renderer = {
            type: "unique-value",
            field: "PROVINCE",
            defaultLabel: "Others",
            defaultSymbol: {
              type: "simple-fill",
              color: [191, 191, 191, 0.50],
              outline: { 
                color: [0, 0, 0, 1.00],
                width: 1.00
              }
            },
            uniqueValueInfos: array
          };
        }
      })
      .catch(function (error) {
        // console.log(error);
      });

    layer_legislative_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          const array = response.features.map(function (feature) {
            return ({
              value: feature.attributes.CONG_DIST,
              label: `${ feature.attributes.CONG_DIST.toProperCase() }`,
              symbol: {
                type: "simple-fill",
                color:
                  feature.attributes.OBJECTID % 4 === 0 ? "rgba(246, 214, 214, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 1 ? "rgba(246, 247, 196, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 2 ? "rgba(161, 238, 189, 1.00)" :
                  "rgba(123, 211, 234, 1.00)",
                outline: { 
                  color: [0, 0, 0, 1.00],
                  width: 1.00
                }
              }
            });
          });

          layer_legislative_districts.renderer = {
            type: "unique-value",
            field: "CONG_DIST",
            defaultLabel: "Others",
            defaultSymbol: {
              type: "simple-fill",
              color: [191, 191, 191, 0.50],
              outline: { 
                color: [0, 0, 0, 1.00],
                width: 1.00
              }
            },
            uniqueValueInfos: array
          };
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
      
    layer_engineering_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          const array = response.features.map(function (feature) {
            return ({
              value: feature.attributes.DEO,
              label: `${ feature.attributes.DEO.toProperCase() }`,
              symbol: {
                type: "simple-fill",
                color:
                  feature.attributes.OBJECTID % 4 === 0 ? "rgba(246, 214, 214, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 1 ? "rgba(246, 247, 196, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 2 ? "rgba(161, 238, 189, 1.00)" :
                  "rgba(123, 211, 234, 1.00)",
                outline: { 
                  color: [0, 0, 0, 1.00],
                  width: 1.00
                }
              }
            });
          });

          layer_engineering_districts.renderer = {
            type: "unique-value",
            field: "DEO",
            defaultLabel: "Others",
            defaultSymbol: {
              type: "simple-fill",
              color: [191, 191, 191, 0.50],
              outline: { 
                color: [0, 0, 0, 1.00],
                width: 1.00
              }
            },
            uniqueValueInfos: array
          };
        }
      })
      .catch(function (error) {
        // console.log(error);
      });

    layer_regions
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          const array = response.features.map(function (feature) {
            return ({
              value: feature.attributes.REGION,
              label: `${ feature.attributes.REGION === " " ? "Bangsamoro Autonomous Region in Muslim Mindanao" : feature.attributes.REGION }`,
              symbol: {
                type: "simple-fill",
                color:
                  feature.attributes.OBJECTID % 4 === 0 ? "rgba(246, 214, 214, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 1 ? "rgba(246, 247, 196, 1.00)" :
                  feature.attributes.OBJECTID % 4 === 2 ? "rgba(161, 238, 189, 1.00)" :
                  "rgba(123, 211, 234, 1.00)",
                outline: { 
                  color: [0, 0, 0, 1.00],
                  width: 1.00
                }
              }
            });
          });

          layer_regions.renderer = {
            type: "unique-value",
            field: "REGION",
            defaultLabel: "Others",
            defaultSymbol: {
              type: "simple-fill",
              color: [191, 191, 191, 0.50],
              outline: { 
                color: [0, 0, 0, 1.00],
                width: 1.00
              }
            },
            uniqueValueInfos: array
          };
        }
      })
      .catch(function (error) {
        // console.log(error);
      });

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
          <FilterComponent/>
        </div>
      </div>
      <div>
        <div>
          <div>
            <MenuComponent/>
          </div>
          <div className = { menuComponentOpen ? "outlet-hidden" : "outlet-visible" }>
            <Outlet/>
          </div>
        </div>
        <div>
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;