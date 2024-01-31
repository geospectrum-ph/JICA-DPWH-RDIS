var router = require("express").Router();
let Archive = require("../models/archive.model");

router.route("/").post((req, res) => { 
  var query = {
    "properties.timestamp": {
      $gte: req.body.from,
      $lte: req.body.to
    },
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Polygon",
          coordinates: [req.body.polyBounds.concat([req.body.polyBounds[0]])]
        }
      }
    }
  }

  if (req.body.prodType.length > 0) { 
    query = {...query, "properties.product_type": req.body.prodType}
  }
  if (req.body.lookSide.length > 0) {
    query = {...query, "properties.look_side": req.body.lookSide}
  }
  if (req.body.orbitDir.length > 0) {
    query = {...query, "properties.orbit_direction": req.body.orbitDir}
  }
  var pageNo = parseInt(req.body.pageNo);

  Archive
    .aggregate([{$match: query}]).sort({"properties.timestamp": "desc"})
    .skip(10 * (pageNo - 1)).limit(10)
    .then(items => res.json(items))
    .catch(err => res.status(400).json("Error: " + err));
});