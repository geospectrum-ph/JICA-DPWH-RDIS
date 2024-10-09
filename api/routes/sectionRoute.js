var router = require("express").Router()
let Section = require('../models/section.model')

router.route('/fetch/all').get((req, res) => {
  Section.find({}).limit(500)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));
})

router.route('/fetch/filter').post((req, res) => {
  console.log(req.body)
  var query = {}
  if (req.body.region.length > 0 && req.body.region !== 'Region') {
    query = {...query, "properties.REGION": req.body.region}
  }
  if (req.body.deo.length > 0 && req.body.deo !== 'Engineering District') {
    query = {...query, "properties.DEO": req.body.deo}
  }if (req.body.cong_dist.length > 0 && req.body.cong_dist !== 'Legislative District') {
    query = {...query, "properties.CONG_DIST": req.body.cong_dist}
  }

  Section.find( query )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

router.route('/fetch/:s_id').get((req, res) => {
  const {s_id} = req.params

  Section.find( {"properties.SECTION_ID": s_id} )
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err + "."));

})

module.exports = router;