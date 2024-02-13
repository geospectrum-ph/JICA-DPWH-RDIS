/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const mongoose = require("mongoose");

var router = require("express").Router();

const usersData = mongoose.model("users",
    new mongoose.Schema({
        "username": { type: String },
        "name": { type: String },
        "password": { type: String }
    })
);

// const crypto = require("crypto");

// let algorithm = "aes-256-cbc";
// let password = "dicotyledon";

// function encrypt(text) {
//     let vector = crypto.randomBytes(32);
//     let cipher = crypto.createCipheriv(algorithm, key, vector);
// }

router.route("/login").post((request, response) => {
    usersData
        .find({})
        .then((data) => {
            let found = data.find((object) => object.username === request.body.username);

            if (found === (null || undefined)) { response.json("username_error"); }
            else if (found.password === request.body.password) { response.json("request_success"); }
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
            else if (found.password === request.body.password) {
                if (request.body.newPassword === request.body.clonePassword) { 
                    usersData
                        .findOneAndUpdate({
                            username: request.body.username,
                            password: request.body.password
                        }, {
                            password: request.body.newPassword
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

module.exports = router;