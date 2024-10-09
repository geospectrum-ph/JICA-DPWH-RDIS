var router = require("express").Router()
let Project = require('../models/project.model')

router.route('/fetch/all').get((req, res) => {
  Project.find({}).limit(500)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));
})

router.route('/fetch/filter').post((req, res) => {
  var query = {}
  if (req.body.region.length > 0) {
    query = {...query, "properties.region": req.body.region}
  }
  if (req.body.deo.length > 0) {
    query = {...query, "properties.deo_name": req.body.deo}
  }if (req.body.cong_dist.length > 0) {
    query = {...query, "properties.district": req.body.cong_dist}
  }

  Project.find( query )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

router.route('/fetch/:s_id').get((req, res) => {
  const {s_id} = req.params

  console.log(s_id)

  Project.find( {"properties.section_id": s_id} )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

module.exports = router;