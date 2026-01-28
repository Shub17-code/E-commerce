const express = require("express");
const {
  createUser,
  LoginUser,
  getPtofile,
} = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");

const UserRoutes = express.Router();

UserRoutes.post("/register", createUser);
UserRoutes.post("/login", LoginUser);
UserRoutes.get("/profile", protect, getPtofile);

module.exports = UserRoutes;
