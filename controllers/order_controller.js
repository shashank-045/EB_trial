const Order = require("../models/order_model");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Basic validation (add more as needed)
    if (!orderData.outletId || !orderData.customerId || !orderData.vendorId || !orderData.deliveryId || !orderData.numTrays || !orderData.amount) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", details: err.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: "outletId", select: "_id outletNumber phoneNumber"}) 
      .populate({ path: "customerId", select: "_id customerId customerName phoneNumber" })
      .populate({ path: "vendorId", select: "_id vendorName phoneNumber" })
      .populate({ path: "deliveryId", select: "_id firstName phoneNumber" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders", details: err.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
    .populate({ path: "outletId", select: "_id outletNumber phoneNumber"}) 
    .populate({ path: "customerId", select: "_id customerId customerName phoneNumber" })
    .populate({ path: "vendorId", select: "_id vendorName phoneNumber" })
    .populate({ path: "deliveryId", select: "_id firstName phoneNumber" });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to get order", details: err.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true })

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order", details: err.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order", details: err.message });
  }
};
