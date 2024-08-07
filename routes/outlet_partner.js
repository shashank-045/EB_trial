const {createOutletPartner, getAllPartners, getPartner, updatePartner, deletePartner}=require('../controllers/outlet_partner_controller')
const express = require("express");
const multer = require('multer');

const router=express.Router()  

// Image storage engine
const storage = multer.diskStorage({
      destination: "uploads/outletPartner",
      filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
      }
  });
  
  const upload = multer({ storage });

router.post("/egg-bucket-b2b/create-outlet_partner", upload.single("img"), createOutletPartner);
router.get("/egg-bucket-b2b/displayAll-outlet_partner", getAllPartners);
router.route("/egg-bucket-b2b/outlet_partner/:id")
      .get(getPartner)
      .patch(upload.single("img"),updatePartner)
      .delete(deletePartner)  


module.exports = router;
