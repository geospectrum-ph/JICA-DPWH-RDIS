
const fs = require("fs");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");
const StreamZip = require("node-stream-zip");
const tj = require("@tmcw/togeojson");

function kmz_to_geojson(path) {
  const zip = new StreamZip.async({ file: path });

  zip.on("entry", () => {
    zip.extract(null, "./assets/files", (error, count) => {
      zip.close();
    });
  });

  zip.on("extract", (entry, path) => {
    let file = new DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

    console.log(tj.kml(file));
  });

  return null;
}


function kml_to_geojson(path) {
  let file = new DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.kml(file));
}

function gpx_to_geojson(path) {
  let file = new DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.gpx(file));
}

function tcx_to_geojson(path) {
  let file = new DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.tcx(file));
}

function convert(source) {
  let type = source.split(".").pop();

  switch (type) {
    case "kmz":
      return (kmz_to_geojson(source));
    case "kml":
      return (kml_to_geojson(source));
    case "gpx":
      return (gpx_to_geojson(source));
    case "tcx":
      return (tcx_to_geojson(source));
    default:
      return (null);
  }
}

module.exports = { convert };
 