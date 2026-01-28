const express = require("express");
const {
  createCheckout,
  updateCheckout,
  confirmedCheckout,
} = require("../controllers/CheckoutController");
const { protect } = require("../middleware/authMiddleware");

const CheckoutRoutes = express.Router();

CheckoutRoutes.post("/", protect, createCheckout);
CheckoutRoutes.put("/:id/pay", protect, updateCheckout);
CheckoutRoutes.post("/:id/finalize", protect, confirmedCheckout);

module.exports = CheckoutRoutes;
