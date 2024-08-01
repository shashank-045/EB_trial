const mongoose = require("mongoose");

const deliveryDriverSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  contactInformation: {
    phoneNumber: { type: String, required: true, unique: true }, // Assuming phone is the unique identifier
    email: { type: String, unique: true },
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  licenseNumber: { type: String, unique: true },
  vehicleInformation: {
    type: String,
    licensePlate: String,
  },
  availabilityStatus: {
    type: String,
    enum: ["available", "unavailable", "onDelivery"], // Predefined statuses
    default: "available",
  },
  currentLocation: {
    // For real-time tracking (if needed)
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  
});

const DeliveryDriver = mongoose.model("DeliveryDriver", deliveryDriverSchema);

module.exports = DeliveryDriver;
