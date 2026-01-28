const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    // find all orders for authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by createdAt in descending order
    res.status(201).json(orders, { message: "Orders found successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    // find order by id for authenticated user
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // return the full order details
    res.status(200).json(order, { message: "Order found successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllOrders, getOrderById };
