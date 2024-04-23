const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/order.controller");
router.get("/", controller.index);

module.exports = router;
