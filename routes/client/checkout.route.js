const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/checkout.controller");
router.get("/", controller.index);
router.post("/list-json", controller.listJson);
router.post("/order", controller.order);
module.exports = router;
