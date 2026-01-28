const express = require("express");
const { createSubscribe } = require("../controllers/subscribeConstroller");

const SubscribeRoutes = express.Router();

SubscribeRoutes.post("/", createSubscribe);

module.exports = SubscribeRoutes;
