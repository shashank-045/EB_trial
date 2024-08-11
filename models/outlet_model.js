const mongoose = require("mongoose");

const OutletPartner = require("./outlet_partner_model");
const DeliveryPartner = require("./delivery_driver_model");

const OutletSchema = new mongoose.Schema({
  outletNumber: {
    type: String,
    required: true,
    unique:true
  },
  outletName:{
    type:String
  },
  outletArea: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  
 
  outletPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OutletPartner",
    required: true,
  },
  deliveryPartner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryPartner",
      required: true,
    },
  ],
  img:String
});

// Pre-save middleware to check for duplicates in deliveryPartner
OutletSchema.pre('save', function (next) {
  // Check if deliveryPartner is an array and remove duplicates
  if (Array.isArray(this.deliveryPartner)) {
    const uniqueDeliveryPartners = [...new Set(this.deliveryPartner.map(String))];
    
    this.deliveryPartner = uniqueDeliveryPartners;
  }
  next();
});

const Outlet = mongoose.model("Outlet", OutletSchema);

module.exports = Outlet;
