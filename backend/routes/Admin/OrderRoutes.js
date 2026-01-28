const express = require("express");
const { protect, admin } = require("../../middleware/authMiddleware");
const {
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../../controllers/Admin/OrderController");

const AdminOrderRoutes = express.Router();

AdminOrderRoutes.get("/", protect, admin, getAllOrder);
AdminOrderRoutes.put("/:id", protect, admin, updateOrder);
AdminOrderRoutes.delete("/:id", protect, admin, deleteOrder);

module.exports = AdminOrderRoutes;
