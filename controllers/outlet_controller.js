const Outlet = require("../models/outlet_model");
const ApiFeatures=require('../utils/apifeatures')
const removeImg = require("../utils/imageRemove");

exports.createOutlet = async (req, res) => {
  try {
    const outletData = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ status: "fail", message: "No image file provided" });
    }
    if (!outletData.outletNumber || !outletData.outletArea) {
      await removeImg(req.file.path)
      return res
        .status(400)
        .json({ error: "Outlet number and location are required" });
    }
    outletData.img = req.file.path;
    const newOutlet = await Outlet.create(outletData);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Outlet created successfully !",
      data: newOutlet,
    });
  } catch (err) {
    // Handle errors (e.g., duplicate outlet name)
    await removeImg(req.file.path)
    res
      .status(500)
      .json({
        status: "success",
        code: 200,
        message: "Internal Server Error",
        error: "Failed to create outlet",
        details: err.message,
      });
  }
};

// Get all outlets
exports.getAllOutlets = async (req, res) => {
  try {
    
    const apiFeatures = new ApiFeatures(Outlet.find(), req.query) 
      .filtering()    // Apply filtering
      .paginaton()

    // Apply population after other query methods
    const outlets = await apiFeatures.query
      .populate({ path: "outletPartner", select: "_id firstName lastName" })
      .populate({ path: "deliveryPartner", select: "_id firstName lastName" });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "All outlets fetched successfully",
      data: outlets,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get outlets", details: err.message });
  }
};

// Update an outlet by ID
exports.updateOutlet = async (req, res) => {
  try {
    const outletId = req.params.id;
    const { deliveryPartner, removeDeliveryPartner, ...otherData } = req.body;
    const file = req.file ? req.file.path : null;
    // Find the existing outlet
    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      await removeImg(req.file.path)
      console.log("oooo")
      console.log(req.file.path)
      return res.status(404).json({ error: "Outlet not found" });
    }

    // Add new delivery partners if provided
    if (deliveryPartner) {
      outlet.deliveryPartner = [
        ...new Set([...outlet.deliveryPartner, ...deliveryPartner]),
      ];
    }

    // Remove specified delivery partners if provided
    if (removeDeliveryPartner) {
      outlet.deliveryPartner = outlet.deliveryPartner.filter(
        (partner) => !removeDeliveryPartner.includes(partner.toString())
      );
    }
    let im=outlet.img || null
    if (file) {
      // Update the driver's image path
      otherData.img = file;
    }

    // Update other fields
    Object.assign(outlet, otherData);

    // Save the updated outlet
    await outlet.save();
    
       // Remove old image file if it exists
       if (im && file) {
        console.log(im)
        await removeImg(im)
      }
    
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Outlet updated successfully!",
    });
  } catch (err) {
    if(req.file.path)
      await removeImg(req.file.path)
    res.status(500).json({
      error: "Failed to update outlet",
      details: err.message,
    });
  }
};

// Delete an outlet by ID
exports.deleteOutlet = async (req, res) => {
  try {
    const outletId = req.params.id;

    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      return res.status(404).json({ error: "Outlet not found" });
    }

    await Outlet.findByIdAndDelete(outletId);
    if (outlet.img) {
      await removeImg(outlet.img)
    }
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Outlet deleted successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "fail",
        code: 500,
        message: "Internal Server Error",
        error: "Failed to delete outlet",
        details: err.message,
      });
  }
};
