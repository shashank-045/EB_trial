var express = require("express");
const { createOutlet, deleteOutlet, updateOutlet, getAllOutlets } = require("../controllers/outlet_controller");
var router = express.Router();

router.post("/egg-bucket-b2b/create-outlet", createOutlet);
router.post("/egg-bucket-b2b/delete-outlet",deleteOutlet);
router.post("/egg-bucket-b2b/update-outlet",updateOutlet);
router.get("/egg-bucket-b2b/get-all-outlets",getAllOutlets);

module.exports = router;
