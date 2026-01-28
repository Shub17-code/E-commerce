const express = require("express");
const {
  getAllOrders,
  getOrderById,
} = require("../controllers/OrderController");
const { protect } = require("../middleware/authMiddleware");

const OrderRoutes = express.Router();

OrderRoutes.get("/my-orders", protect, getAllOrders);
OrderRoutes.get("/:id", protect, getOrderById);

module.exports = OrderRoutes;
