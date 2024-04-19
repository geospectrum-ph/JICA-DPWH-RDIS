/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const crypto = require("crypto");

let algorithm = "aes-256-cbc";
let key = crypto.scryptSync("password", "SEEDs Rebuild", 32);

function encrypt(string) {
  let vector = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), vector);
  let output = cipher.update(string);

  output = Buffer.concat([output, cipher.final()]);

  return ({ data: output.toString("hex"), vector: vector.toString("hex") });
}

function decrypt(object) {
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(object.vector, "hex"));
  let output = decipher.update(Buffer.from(object.data, "hex"));

  output = Buffer.concat([output, decipher.final()]);

  return (output.toString());
}

const mongoose = require("mongoose");

var router = require("express").Router();

const usersData = mongoose.model("users",
  new mongoose.Schema({
    "username": { type: String },
    "name": { type: String },
    "password": { type: Object }
  })
);

router.route("/sign-in/post/").post((request, response) => {
  usersData
    .find({})
    .then((data) => {
      let found = data.find((object) => object.username === request.body.username);

      if (found === (null || undefined)) { response.json({ note: "Please enter a valid username and password.", code: 400 }); }
      else if (decrypt(found.password) !== request.body.password) { response.json({ note: "Please enter a valid username and password.", code: 403 }); }
      else { response.json({ note: "Successful user authentication!", code: 200 }); }
    })
    .catch((error) => { response.status(400).json("Error: " + error); });
});

router.route("/change-password/post/").post((request, response) => {
  usersData
    .find({})
    .then((data) => {
      let found = data.find((object) => object.username === request.body.username);

      if (found === (null || undefined)) { response.json({ note: "Please enter a valid username and password.", code: 400 }); }
      else if (decrypt(found.password) !== request.body.password) { response.json({ note: "Please enter a valid username and password.", code: 403 }); }
      else {
        if (request.body.newPassword !== request.body.clonePassword) { response.json({ note: "The entered passwords do not match.", code: 400 }); }
        else { 
          usersData
            .findOneAndUpdate({
              username: found.username,
              password: found.password
            }, {
              password: encrypt(request.body.newPassword)
            })
            .then(() => { response.json({ note: "Successful password update!", code: 200 }); })
            .catch((error) => { response.status(400).json("Error: " + error); });
        }
      }
    })
    .catch((error) => { response.status(400).json("Error: " + error); });
});

const unclassifiedData = mongoose.model("general-files",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: String }
  })
);

const socialData = mongoose.model("module-social-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: String }
  })
);

const economicData = mongoose.model("module-economic-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: String }
  })
);

const environmentalData = mongoose.model("module-environmental-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: String }
  })
);

const demographicData = mongoose.model("module-demographic-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: String }
  })
);

router.route("/fetch/").post((request, response) => {
  let object = { unclassified: null, social: null, economic: null, environmental: null, demographic: null }

  Promise
    .all([
      unclassifiedData
        .find({})
        .then((data) => { Object.assign(object, { unclassified: data }); })
        .catch((error) => { response.status(400).json("Error: " + error); }),
      socialData
        .find({})
        .then((data) => { Object.assign(object, { social: data }); })
        .catch((error) => { response.status(400).json("Error: " + error); }),
      economicData
        .find({})
        .then((data) => { Object.assign(object, { economic: data }); })
        .catch((error) => { response.status(400).json("Error: " + error); }),
      environmentalData
        .find({})
        .then((data) => { Object.assign(object, { environmental: data }); })
        .catch((error) => { response.status(400).json("Error: " + error); }),
      demographicData
        .find({})
        .then((data) => { Object.assign(object, { demographic: data }); })
        .catch((error) => { response.status(400).json("Error: " + error); })
    ])
    .then(() => { response.json(object); })
    .catch((error) => { response.status(400).json("Error: " + error); });  
});

const multer = require("multer");

var storage = multer.diskStorage({
  destination:
    function (request, file, callback) {
      callback(null, "client/src/assets/files");
    },
  filename:
    function (request, file, callback) {
      callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).fields([{ name: "file" }]);

const DOMParser = require("xmldom").DOMParser;
const fs = require("fs");
const path = require("path");
const convert = require("@tmcw/togeojson");

router.route("/upload/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) { return (response.status(500).json(error)); }
    else if (error) { return (response.status(500).json(error)); }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") { object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path))); }
      else if (type === "kml" || type === "gpx" || type == "tcx") {
        let location = path.join("./", request.files.file[index].path);
        let file = new DOMParser().parseFromString(fs.readFileSync(location, "utf8"));

        switch (type) {
          case "kml":
            object = convert.kml(file);
            break;
          case "gpx":
            object = convert.gpx(file);
            break;
          case "tcx":
            object = convert.tcx(file);
            break;
          default:
            return null;
        }
      }
      else {
        object = null;
      }

      if (object) {
        switch (request.body.category) {
          case "unclassified": 
            unclassifiedData
              .create({
                name: request.files.file[index].originalname,
                file: object,
                aspect: request.body.category
              })
              .then((data) => { response.json(data); })
              .catch((error) => { response.status(400).json("Error: " + error); });
            break;
          case "social":
            socialData
              .create({
                name: request.files.file[index].originalname,
                file: object,
                aspect: request.body.category
              })
              .then((data) => { response.json(data); })
              .catch((error) => { response.status(400).json("Error: " + error); });
            break;
          case "economic":
            economicData
              .create({
                name: request.files.file[index].originalname,
                file: object,
                aspect: request.body.category
              })
              .then((data) => { response.json(data); })
              .catch((error) => { response.status(400).json("Error: " + error); });
            break;
          case "environmental":
            environmentalData
              .create({
                name: request.files.file[index].originalname,
                file: object,
                aspect: request.body.category
              })
              .then((data) => { response.json(data); })
              .catch((error) => { response.status(400).json("Error: " + error); });
            break;
          case "demographic":
            demographicData
              .create({
                name: request.files.file[index].originalname,
                file: object,
                aspect: request.body.category
              })
              .then((data) => { response.json(data); })
              .catch((error) => { response.status(400).json("Error: " + error); });
            break;
          default:
            return null;
        }
      }
    }
  });
});

router.route("/delete/").post((request, response) => {
  switch (request.body.file.aspect) {
    case "unclassified": 
      unclassifiedData
        .deleteOne({ _id: request.body.file._id })
        .then((data) => { response.json(data); })
        .catch((error) => { response.status(400).json("Error: " + error); });
      break;
    case "social":
      socialData
        .deleteOne({ _id: request.body.file._id })
        .then((data) => { response.json(data); })
        .catch((error) => { response.status(400).json("Error: " + error); });
      break;
    case "economic":
      economicData
        .deleteOne({ _id: request.body.file._id })
        .then((data) => { response.json(data); })
        .catch((error) => { response.status(400).json("Error: " + error); });
      break;
    case "environmental":
      environmentalData
        .deleteOne({ _id: request.body.file._id })
        .then((data) => { response.json(data); })
        .catch((error) => { response.status(400).json("Error: " + error); });
      break;
    case "demographic":
      demographicData
        .deleteOne({ _id: request.body.file._id })
        .then((data) => { response.json(data); })
        .catch((error) => { response.status(400).json("Error: " + error); });
      break;
    default:
      return null;
  }
});

module.exports = router;