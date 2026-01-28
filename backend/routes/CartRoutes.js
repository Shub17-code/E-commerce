const express = require("express");
const {
  createCart,
  updateCart,
  deleteCart,
  getCartInfo,
  mergerCarts,
} = require("../controllers/CartController");
const { protect } = require("../middleware/authMiddleware");

const CartRoutes = express.Router();

CartRoutes.post("/", createCart);
CartRoutes.put("/", updateCart);
CartRoutes.delete("/", deleteCart);
CartRoutes.get("/", getCartInfo);
CartRoutes.post("/merge", protect, mergerCarts);

module.exports = CartRoutes;
