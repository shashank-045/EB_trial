const Customer = require("../models/customer_model");
const fs = require("fs");
const path = require("path");

const removeImg=require('../utils/imageRemove')

exports.createCustomer=async (req,res)=>{
try{
   const data=req.body;
   if (!req.file) {
    return res.status(400).json({ status: "fail", message: "No image file provided" });
    }

    if (!data.customerName  ||!data.customerId ||!data.location ||!data. phoneNumber ||!data.outlet) {
        await removeImg('customer',req.file.filename)
        return res
          .status(400)
          .json({ error: "Name,customerId,location,phoneNo and Outlet are required" });
      }
      data.img=req.file.filename
     const newCustomer = await Customer.create(data);
    res.status(201).json(newCustomer);

}catch (err) {
    await removeImg('customer',req.file.filename)
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res
        .status(400)
        .json({
          error: "Customer with this phone number or CustomerId exists",
        });
    }
    res
      .status(500)
      .json({ error: "Failed to create Customer", details: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
    try {
      const Customers = await Customer.find().populate('outlet');
      res.json(Customers);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get Customers", details: err.message });
    }
  };


  exports.getCustomerById = async (req, res) => {
    try {
      const CId = req.params.id;
      const result = await Customer.findById(CId).populate('outlet');
  
      if (!result) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      res.json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get Customer", details: err.message });
    }
  };

  exports.updateCustomer = async (req, res) => {
    try {
      const CId = req.params.id;
      const updateData = req.body;
      console.log(req.body)
      // Check if there is a file upload
      const file = req.file ? req.file.filename : null;
  
      const customer = await Customer.findById(CId);
      if (!customer) {
        await removeImg('customer',req.file.filename)
        return res.status(404).json({ error: "Customer not found" });
      }
  
      // Update the driver data
      if (file) {
        // Update the driver's image path
        updateData.img = file;
      }
  
      // Update the driver with new data
      const updatedCustomer = await Customer.findByIdAndUpdate(CId, updateData, { new: true });
     
      
      //remove old img
      if (customer.img && file) {
        await removeImg('customer',customer.img)
      }
  
      res.json(updatedCustomer);
    } catch (err) {
      // Handle duplicate key errors
      if (err.code === 11000) {
        return res.status(400).json({ error: "Phone number or CustomerId already in use" });
      }
      res.status(500).json({ error: "Failed to update Customer", details: err.message });
    }
  };


  exports.deleteCustomer = async (req, res) => {
    try {
      const CId = req.params.id;
      const customer = await Customer.findByIdAndDelete(CId);
  
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      // Remove image file if it exists
      if (customer.img) {
        await removeImg('customer',customer.img)
      }
  
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete Customer", details: err.message });
    }
  };
  