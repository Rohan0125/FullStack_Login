const express = require("express");
const router = express.Router();
const { register, login, userInfo } = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/userinfo", userInfo);
module.exports = router;
