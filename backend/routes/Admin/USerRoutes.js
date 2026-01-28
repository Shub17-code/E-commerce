const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/Admin/UserController");
const { protect, admin } = require("../../middleware/authMiddleware");

const AdminUserRoutes = express.Router();

AdminUserRoutes.get("/", protect, admin, getAllUsers);
AdminUserRoutes.post("/", protect, admin, addUser);
AdminUserRoutes.put("/:id", protect, admin, updateUser);
AdminUserRoutes.delete("/:id", protect, admin, deleteUser);

module.exports = AdminUserRoutes;
