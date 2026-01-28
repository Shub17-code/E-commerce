const Order = require("../../models/Order");

const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "name email");
    res.status(200).json(order, { message: "Order found successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id).populate("user", "name");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status || order.status;
    order.isDelivered = status === "Delivered" ? true : order.isDelivered;
    order.deliveredAt = status === "Delivered" ? Date.now() : order.deliveredAt;
    await order.save();
    res.status(200).json(order, { message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllOrder, updateOrder, deleteOrder };
