/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const mongoose = require("mongoose");
var router = require("express").Router();

/* The users collection of the seeds-rebuild database. */

const usersData = mongoose.model("users",
    new mongoose.Schema({
        "username": {type: String},
        "name": {type: String},
        "password": {type: String}
    })
);

router.route("/hidden/users").get((req, res) => {
    usersData
        .find({})
        .then((items) => { res.json(items); })
        .catch((err) => { res.status(400).json("Error: " + err); });
});

module.exports = router;