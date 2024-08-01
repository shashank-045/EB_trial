const DeliveryDriver = require("../models/delivery_driver_model");

// Create a new delivery driver
exports.createDeliveryDriver = async (req, res) => {
  try {
    const driverData = req.body;

    // Basic Validation (Add more as needed)
    if (!driverData.name || !driverData.contactInformation) {
      return res
        .status(400)
        .json({ error: "Name and contact information are required" });
    }

    const newDriver = await DeliveryDriver.create(driverData);
    res.status(201).json(newDriver);
  } catch (err) {
    // Handle errors, including duplicate unique fields
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res
        .status(400)
        .json({
          error: "Driver with this phone number or email already exists",
        });
    }
    res
      .status(500)
      .json({ error: "Failed to create driver", details: err.message });
  }
};

// Get all delivery drivers
exports.getAllDeliveryDrivers = async (req, res) => {
  try {
    const drivers = await DeliveryDriver.find();
    res.json(drivers);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get drivers", details: err.message });
  }
};

// Get a driver by ID
exports.getDeliveryDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driver = await DeliveryDriver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json(driver);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get driver", details: err.message });
  }
};

// Update a driver by ID
exports.updateDeliveryDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const updateData = req.body;

    const driver = await DeliveryDriver.findByIdAndUpdate(
      driverId,
      updateData,
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json(driver);
  } catch (err) {
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "Phone number or email already in use" });
    }
    res
      .status(500)
      .json({ error: "Failed to update driver", details: err.message });
  }
};

// Delete a driver by ID
exports.deleteDeliveryDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driver = await DeliveryDriver.findByIdAndRemove(driverId);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({ message: "Driver deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete driver", details: err.message });
  }
};
