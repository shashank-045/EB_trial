const mongoose = require("mongoose");

const outletSchema = new mongoose.Schema({
  outletName: {
    type: String,
    required: true,
  },
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    coordinates: {
      // For geospatial queries (if needed)
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  contactInformation: {
    phoneNumber: String,
    email: String,
  },
  operatingHours: {
    // You can store this in various formats (e.g., an array of objects for each day)
    openingTime : String,
    closingTime :String,
  },
  
});

const Outlet = mongoose.model("Outlet", outletSchema);

module.exports = Outlet;
