/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const mongoose = require("mongoose");

var router = require("express").Router();

const usersData = mongoose.model("users",
  new mongoose.Schema({
    "username": { type: String },
    "name": { type: String },
    "password": { type: Object }
  })
);

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

router.route("/sign-in/post/").post((request, response) => {
  usersData
    .find({})
    .then((data) => {
      let found = data.find((object) => object.username === request.body.username);

      if (found === (null || undefined)) { response.json("username_error"); }
      else if (decrypt(found.password) === request.body.password) { response.json("request_success"); }
      else { response.json("password_error"); }
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

router.route("/change-password/post/").post((request, response) => {
  usersData
    .find({})
    .then((data) => {
      let found = data.find((object) => object.username === request.body.username);

      if (found === (null || undefined)) { response.json("username_error"); }
      else if (decrypt(found.password) === request.body.password) {
        if (request.body.newPassword === request.body.clonePassword) { 
          usersData
            .findOneAndUpdate({
              username: found.username,
              password: found.password
            }, {
              password: encrypt(request.body.newPassword)
            })
            .then(() => { response.json("request_success"); })
            .catch((error) => { response.status(400).json("Error: " + error); });
        }
        else { response.json("password_mismatch"); }
      }
      else { response.json("password_error"); }
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const filesData = mongoose.model("general-files",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: Object },
    "tags": { type: Object }
  })
);

router.route("/fetch/").post((request, response) => {
  filesData
    .find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const socialData = mongoose.model("module-social-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: Object },
    "tags": { type: Object }
  })
);

router.route("/fetch/social/").post((request, response) => {
  socialData
    .find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const economicData = mongoose.model("module-economic-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: Object },
    "tags": { type: Object }
  })
);

router.route("/fetch/economic/").post((request, response) => {
  economicData
    .find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const environmentalData = mongoose.model("module-environmental-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: Object },
    "tags": { type: Object }
  })
);

router.route("/fetch/environmental/").post((request, response) => {
  environmentalData
    .find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const demographicData = mongoose.model("module-demographic-databases",
  new mongoose.Schema({
    "name": { type: String },
    "file": { type: Object },
    "aspect": { type: Object },
    "tags": { type: Object }
  })
);

router.route("/fetch/demographic/").post((request, response) => {
  demographicData
    .find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json("Error: " + error);
    });
});

const DOMParser = require("xmldom").DOMParser;
const fs = require("fs");
const path = require("path");
const convert = require("@tmcw/togeojson");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "client/src/assets/files");
  }, filename: function (request, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).fields([
  { name: "file" }
]);

router.route("/upload/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return (response.status(500).json(error));
    }
    else if (error) {
      return (response.status(500).json(error));
    }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") {
        object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path)));
      }
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
        filesData
          .create({
            name: request.files.file[index].originalname,
            file: object,
            aspect: null
          })
          .then((data) => {
            response.json(data);
          });
      }
    }
  });
});

router.route("/upload/social/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return (response.status(500).json(error));
    }
    else if (error) {
      return (response.status(500).json(error));
    }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") {
        object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path)));
      }
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
        socialData
          .create({
            name: request.files.file[index].originalname,
            file: object,
            aspect: "social"
          });
      }
    }

    response.json("upload_successful");
  });
});

router.route("/upload/economic/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return (response.status(500).json(error));
    }
    else if (error) {
      return (response.status(500).json(error));
    }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") {
        object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path)));
      }
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
        economicData
          .create({
            name: request.files.file[index].originalname,
            file: object,
            aspect: "economic"
          });
      }
    }

    response.json("upload_successful");
  });
});

router.route("/upload/environmental/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return (response.status(500).json(error));
    }
    else if (error) {
      return (response.status(500).json(error));
    }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") {
        object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path)));
      }
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
        environmentalData
          .create({
            name: request.files.file[index].originalname,
            file: object,
            aspect: "environmental"
          });
      }
    }

    response.json("upload_successful");
  });
});

router.route("/upload/demographic/").post((request, response) => {
  upload (request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return (response.status(500).json(error));
    }
    else if (error) {
      return (response.status(500).json(error));
    }

    for (let index = 0; index < request.files.file.length; index++) {
      let type = request.files.file[index].filename.split(".").pop();
      let object;

      if (type === "geojson") {
        object = JSON.parse(fs.readFileSync(path.join(request.files.file[index].path)));
      }
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
        demographicData
          .create({
            name: request.files.file[index].originalname,
            file: object,
            aspect: "demographic"
          });
      }
    }

    response.json("upload_successful");
  });
});

router.route("/delete/").post((request, response) => {
  switch (request.body.file.aspect) {
    case null: 
      filesData
        .deleteOne({
          _id: request.body.file._id
        })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json("Error: " + error);
        });
      break;
    case "social":
      socialData
        .deleteOne({
          _id: request.body.file._id
        })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json("Error: " + error);
        });
      break;
    case "economic":
      economicData
        .deleteOne({
          _id: request.body.file._id
        })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json("Error: " + error);
        });
      break;
    case "environmental":
      environmentalData
        .deleteOne({
          _id: request.body.file._id
        })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json("Error: " + error);
        });
      break;
    case "demographic":
      demographicData
        .deleteOne({
          _id: request.body.file._id
        })
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json("Error: " + error);
        });
      break;
    default:
      return null;
  }
});

module.exports = router;