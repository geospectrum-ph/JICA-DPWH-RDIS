var router = require("express").Router()
let DEO = require('../models/deo.model')

router.route('/fetch/all').get((req, res) => {
  DEO.find({})
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));
})

router.route('/fetch/:region').get((req, res) => {
  const {region} = req.params

  DEO.find( {properties: {REGION: region}} )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

module.exports = router;