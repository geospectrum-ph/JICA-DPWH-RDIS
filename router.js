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

    return ({data: output.toString("hex"), vector: vector.toString("hex")});
}

function decrypt(object) {
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(object.vector, "hex"));
    let output = decipher.update(Buffer.from(object.data, "hex"));
    output = Buffer.concat([output, decipher.final()]);

    return (output.toString());
}

router.route("/login").post((request, response) => {
    usersData
        .find({})
        .then((data) => {
            let found = data.find((object) => object.username === request.body.username);

            if (found === (null || undefined)) { response.json("username_error"); }
            else if (decrypt(found.password) === request.body.password) { response.json("request_success"); }
            else { response.json("password_error"); }
        })
        .catch((error) => { response.status(400).json("Error: " + error); });
});

router.route("/security").post((request, response) => {
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
        .catch((error) => { response.status(400).json("Error: " + error); });
});

/* The *** collection of the seeds-rebuild database. */

/* const ***Data = mongoose.model("***",
    new mongoose.Schema({
        "***" : { type: *** }
    })
); */

/* router.route("/***").post((request, response) => {
    ***Data
        .find({ })
        .then((data) => {
            console.log(request.body);
            response.json(data);
        })
        .catch((error) => { response.status(400).json("Error: " + error); });
}); */

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "client/public");
    }, filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage}).fields([
    {name: "file"}
]);

router.route("/upload").post((request, response) => {
    upload (request, response, function (error) {
        if (error instanceof multer.MulterError) {
            return (response.status(500).json(error));
        }
        else if (error) {
            return (response.status(500).json(error));
        }
        console.log(request.files);
        response.json(request.files);
    });
});

module.exports = router;