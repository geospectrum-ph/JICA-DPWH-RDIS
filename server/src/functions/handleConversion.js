const fs = require("fs");
const path = require("path");
const DOMParser = require("xmldom").DOMParser;
const convert = require("@tmcw/togeojson");
const shapefile = require("shapefile");

function generate(location, type) {
  let output;

  if (type === "geojson") {
    output = JSON.parse(fs.readFileSync(path.join(location)));
  }
  else if (type === "kml" || type === "gpx" || type == "tcx") {
    let file = new DOMParser().parseFromString(fs.readFileSync(location, "utf8"));

    switch (type) {
      case "kml":
        output = convert.kml(file);
        break;
      case "gpx":
        output = convert.gpx(file);
        break;
      case "tcx":
        output = convert.tcx(file);
        break;
      default:
        return null;
    }
  }
  else {
    output = null;
  }

  fs.unlink(path.join(location), (error) => { if (error) { throw (error); } });

  console.log(location, type);
  console.log(output);

  return output;
}

module.exports = { generate };
