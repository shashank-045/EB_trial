const {createDeliveryDriver,getAllDeliveryDrivers,getDeliveryDriverById,updateDeliveryDriver,deleteDeliveryDriver}=require('../controllers/delivery_driver_controller')
const express = require("express");
const multer = require('multer');

const router=express.Router()  

// Image storage engine
const storage = multer.diskStorage({
      destination: "uploads/deliveryDriver",
      filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
      }
  });
  
  const upload = multer({ storage });



router.post("/egg-bucket-b2b/create-delivery_partner", upload.single("img"), createDeliveryDriver);
router.get("/egg-bucket-b2b/displayAll-delivery_partner", getAllDeliveryDrivers);
router.route("/egg-bucket-b2b/delivery_partner/:id")
      .get(getDeliveryDriverById)
      .patch(upload.single("img"),updateDeliveryDriver)
      .delete(deleteDeliveryDriver)  


module.exports = router;
