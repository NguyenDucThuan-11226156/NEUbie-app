const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");
router.get("/detail/:slug", controller.detail);
router.get("/:id", controller.getProductById);
module.exports = router;
