const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/auth.Controller");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);

module.exports = router;
