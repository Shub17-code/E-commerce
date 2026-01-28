const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/UploadController");

const UploadRoutes = express.Router();

// multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

UploadRoutes.post("/", upload.single("image"), uploadImage);

module.exports = UploadRoutes;
