const mongoose = require("mongoose");

const outletPartnerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },

  phoneNumber: { type: String, required: true, unique: true },

  aadharNumber: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select:false
  },

  img: String,
});

const OutletPartner = mongoose.model("OutletPartner", outletPartnerSchema);

module.exports = OutletPartner;
