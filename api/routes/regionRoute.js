var router = require("express").Router()
let Region = require('../models/region.model')

router.route('/fetch/all').get((req, res) => {
  Region.find({})
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));
})

module.exports = router;