const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSimilarProducts,
  getProductsBestSellers,
  getProductsNewArrivals,
} = require("../controllers/ProductController");
const { protect, admin } = require("../middleware/authMiddleware");

const ProductRoutes = express.Router();

ProductRoutes.post("/", protect, admin, createProduct);
ProductRoutes.put("/:id", protect, admin, updateProduct);
ProductRoutes.delete("/:id", protect, admin, deleteProduct);
ProductRoutes.get("/", getAllProducts);
ProductRoutes.get("/best-seller", getProductsBestSellers);
ProductRoutes.get("/new-arrivals", getProductsNewArrivals);
ProductRoutes.get("/:id", getProductById);
ProductRoutes.get("/similar/:id", getSimilarProducts);

module.exports = ProductRoutes;
