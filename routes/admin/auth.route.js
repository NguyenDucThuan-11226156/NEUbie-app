const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/auth.controller");
router.get("/login", controller.login);
router.get("/createAdmin", controller.signUp);
router.post("/signup", controller.createSignUp);

module.exports = router;
