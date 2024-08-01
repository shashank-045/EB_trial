const mongoose = require("mongoose");

const eggbucketVendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true, unique: true },
  vendorType: {
    type: String,
    enum: ["shop", "restaurant", "swiggy","zomato","other"], // Predefined types
    default: "other",
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
    openingTime: String,
    closingTime: String,
  },
  deliveryRadius: { type: Number, default: 0 }, // In kilometers (0 for no delivery)
  paymentMethods: [{ type: String }], // e.g., ['cash', 'card', 'UPI']
  associatedOutlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
  }, // Optional, for linking to outlets
});

const EggbucketVendor = mongoose.model(
  "EggbucketVendor",
  eggbucketVendorSchema
);

module.exports = EggbucketVendor;
