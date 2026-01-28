const express = require("express");
const { protect, admin } = require("../../middleware/authMiddleware");
const { getAllProducts } = require("../../controllers/ProductController");

const AdminProductRoutes = express.Router();

AdminProductRoutes.get("/", protect, admin, getAllProducts);

module.exports = AdminProductRoutes;
