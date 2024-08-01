const Outlet = require("../models/outlet_model");

exports.createOutlet = async (req, res) => {
  try {
    const outletData = req.body;

    if (!outletData.outletName || !outletData.location) {
      return res
        .status(400)
        .json({ error: "Outlet name and location are required" });
    }

    const newOutlet = await Outlet.create(outletData);
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Outlet created successfully !",
        data: newOutlet,
      });
  } catch (err) {
    // Handle errors (e.g., duplicate outlet name)
    res
      .status(500)
      .json({ status : 'success',code : 200, message : 'Internal Server Error',error: "Failed to create outlet", details: err.message });
  }
};


// Get all outlets
exports.getAllOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.status(200).json({status : 'success', code : 200, message : 'All outlets fetched successfully ',data : outlets});
  } catch (err) {
    res.status(500).json({ error: 'Failed to get outlets', details: err.message });
  }
};

// Update an outlet by ID
exports.updateOutlet = async (req, res) => {
  try {
    const outletId = req.params.id;
    const outletData = req.body;

    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    const updatedOutlet = await Outlet.findByIdAndUpdate(outletId, outletData, { new: true });
    res.status(200).json({status : 'success',code : 200, message : 'Outlet updated successfully !',data : outletData});
  } catch (err) {
    res.status(500).json({ error: 'Failed to update outlet', details: err.message });
  }
};

// Delete an outlet by ID
exports.deleteOutlet = async (req, res) => {
  try {
    const outletId = req.params.id;

    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    await Outlet.findByIdAndRemove(outletId);
    res.status(200).json({ status : 'success',code : 200,message: 'Outlet deleted successfully' });
  } catch (err) {
    res.status(500).json({ status : 'fail', code : 500,message : 'Internal Server Error',error: 'Failed to delete outlet', details: err.message });
  }
};
