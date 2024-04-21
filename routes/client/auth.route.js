const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/auth.controller");
router.get("/login", controller.index);
router.get("/logout", controller.logOut);
module.exports = router;
