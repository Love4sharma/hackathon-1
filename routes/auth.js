const express = require("express");

const singupHandler = require("../controller/signup");
const loginHandler = require("../controller/login");

const router = express.Router();

router.route("/register").post(singupHandler);

router.route("/login").post(loginHandler);

module.exports = router;
