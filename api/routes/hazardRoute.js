var router = require("express").Router()
let Hazard = require('../models/hazard.model')

router.route('/fetch/all').get((req, res) => {
  Project.find({}).limit(500)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));
})

router.route('/fetch/filter').post((req, res) => {
  var query = {}
  if (req.body.region.length > 0) {
    query = {...query, "properties.REGION": req.body.region}
  }
  if (req.body.deo.length > 0) {
    query = {...query, "properties.DEO": req.body.deo}
  }if (req.body.cong_dist.length > 0) {
    query = {...query, "properties.CONG_DIST": req.body.cong_dist}
  }

  Hazard.find( query )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

router.route('/fetch/:s_id').get((req, res) => {
  const {s_id} = req.params

  console.log(s_id)

  Project.find( {"properties.SECTION_ID": s_id} )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

module.exports = router;