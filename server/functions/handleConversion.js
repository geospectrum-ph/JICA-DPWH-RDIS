async function convert() {
  let source = ("/assets/files/Cities.kml");

  const path = require("path");

  const file_path = path.join(__dirname, "..", source);

  const mime = require("mime-types");

  const type = mime.lookup(file_path);
  
  /*
    mime.lookup(/path/) will return
    > "text/plain" - for paths for files with a .TXT extension
    > "text/csv" - for paths for files with a .CSV extension
    > "application/geo+json" - for paths for files with a .GEOJSON extension
    > "application/zip" - for paths for files with a .ZIP extension
    > "application/vnd.google-earth.kmz" - for paths for files with a .KMZ extension
    > "application/vnd.google-earth.kml+xml" - for paths for files with a .KML extension
    > "application/vnd.dbf" - for paths for files with a .DBF extension
    > false - for paths for files with .GPKG, .QGZ, .QMD, .SHP, .SHX, and .PRJ extensions
  */

  const initgdaljs = require("gdal3.js/node");

  const gdal = await initgdaljs();

  const options = [
    "-f", "GeoJSON",
    "-t_srs", "EPSG:4326"
  ];

  const file =
    await gdal
      .open(file_path)
      .then((response) => {
        return (response);
      })
      .catch((error) => {
        console.log(error);
      });
  
  const virtual_path = file ? await gdal.ogr2ogr(file.datasets[0], options, "output") : null;
  
  const byte_data = virtual_path ? await gdal.getFileBytes(virtual_path) : null;

  const geojson = byte_data ? JSON.parse(Buffer.from(byte_data).toString("utf8")) : null;

  let source_ = ("/assets/files/Points.kml");

  const file_path_ = path.join(__dirname, "..", source_);

  const type_ = mime.lookup(file_path_);

  const file_ =
    await gdal
      .open(file_path_)
      .then((response) => {
        return (response);
      })
      .catch((error) => {
        console.log(error);
      });
  
  const virtual_path_ = file_ ? await gdal.ogr2ogr(file_.datasets[0], options, "output") : null;
  
  const byte_data_ = virtual_path_ ? await gdal.getFileBytes(virtual_path_) : null;

  const geojson_ = byte_data_ ? JSON.parse(Buffer.from(byte_data_).toString("utf8")) : null;

  if (geojson && geojson_) {
    function find_within(object, key_name) {
      const found = [];
      
      JSON.stringify(object, (key, value) => {
        if (key === key_name) {
         found.push(value);
        }
        return (value);
      });

      return (found[0]);
    };

    const features = find_within(geojson, "features");

    console.log(features.length);

    const features_ = find_within(geojson_, "features");

    console.log(features_.length);

    /*
      Each feature in the features constant should be of the format:

      {
        type: 'Feature',
        properties: { Name: [String], Description: [String] },
        geometry: { type: 'MultiLineString', coordinates: [Array] }
      }
    */
      
    function get_descriptive_statistics(array) {
      const size = array.length;

      const ascending = array.sort((return_value, working_value) => { return (return_value - working_value); });

      const mean = (array.reduce((return_value, working_value) => (return_value + working_value))) / size;

      console.log("Mean: " + mean);

      const median = size % 2 > 0 ? ascending[Math.ceil(size/2)] : ((ascending[(size/2) - 1] + ascending[(size/2)]) / 2);

      console.log("Median: " + median);

      // const frequency = array.reduce((object, value) => { object[value] = (object[value] || 0) + 1; return (object); }, {} );

      // const mode = Object.keys(frequency).filter((value) => { return (frequency[value] === Math.max.apply(null, Object.values(frequency))); }).map((value) => (parseFloat(value)));

      // console.log("Mode: " + mode);

      console.log();

      const minimum = array.reduce((return_value, working_value) => (return_value > working_value ? return_value = working_value : return_value));

      console.log("Minimum: " + minimum);

      const maximum = array.reduce((return_value, working_value) => (return_value < working_value ? return_value = working_value : return_value));

      console.log("Maximum: " + maximum);

      console.log("Range: " + (maximum - minimum));

      const p_25 = Math.floor((size + 1) / 4);
      const p_25_factor = ((size + 1) / 4) - p_25;
      const p_75 = Math.floor(3 * (size + 1) / 4);
      const p_75_factor = (3 * (size + 1) / 4) - p_75;

      const interquartile_range =
        (size + 1) % 4 === 0 ?
          ascending[p_75 - 1]
          - ascending[p_25 - 1]
          :
          (ascending[p_75 - 1] === ascending[p_75] ? ascending[p_75 - 1] : ascending[p_75 - 1] + (p_75_factor * (ascending[p_75] - ascending[p_75 - 1])))
          - (ascending[p_25 - 1] === ascending[p_25] ? ascending[p_25 - 1] : ascending[p_25 - 1] + (p_25_factor * (ascending[p_25] - ascending[p_25 - 1])));

      console.log("Interquartile Range: " + interquartile_range);

      console.log();

      const variance = (array.map((value) => ((value - mean) ** 2)).reduce((return_value, working_value) => (return_value + working_value))) / (size - 1);

      console.log("Variance: " + variance);

      const standard_deviation = variance ** (1/2);

      console.log("Standard Deviation: " + standard_deviation);

      const skewness = (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 3));

      console.log("Skewness: " + skewness);

      const kurtosis = (array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 4));

      console.log("Kurtosis: " + kurtosis);
    }


    // const test_size = 100;
    // const test_array = Array(test_size).fill().map(() => Math.round(Math.random() * test_size))

    // const result = get_descriptive_statistics(test_array);

    // const turf = require("@turf/turf");
    // const length_transform = features.map((feature) => (turf.area(feature) / 1000000));

    // console.log(length_transform);

    // get_descriptive_statistics(length_transform);
  }

  // let temp_path = path.join(__dirname, "..", "\\public\\uploads");

  // let files = fs.readdirSync(temp_path);

  // for (const file of files) {
  //   fs.unlinkSync(path.join(temp_path, "\\", file));
  // }

  // const fs = require("fs");

  // let read_stream = fs.createReadStream(file_path);

  // const close_stream = new Promise ((resolve, reject) => {
  //   let chunks = [];

  //   read_stream.on("data", (data) => {
  //     chunks.push(data);
  //   });

  //   read_stream.on("end", () => {
  //     resolve(chunks);
  //   });
  // });

  // let data = await close_stream;

  // let result = data.map((item) => (JSON.stringify(item).length)).filter((size) => (size > 16000000));

  // console.log(result);
}

module.exports = { convert };