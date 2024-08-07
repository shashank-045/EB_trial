var express = require("express");
const { createOutlet, deleteOutlet, updateOutlet, getAllOutlets } = require("../controllers/outlet_controller");
var router = express.Router();
const multer = require('multer');

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads/outlet",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.post("/egg-bucket-b2b/create-outlet",upload.single("img"),createOutlet);   
router.delete("/egg-bucket-b2b/delete-outlet/:id",deleteOutlet);
router.patch("/egg-bucket-b2b/update-outlet/:id",upload.single("img"),updateOutlet);
router.get("/egg-bucket-b2b/get-all-outlets",getAllOutlets);

module.exports = router;  
