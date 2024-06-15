const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  createGroupChat,
  fetchChats,
} = require("../controllers/chat.Controller");

//create a group
router.post("/groups", isAuth, createGroupChat);

//fetch all the chats of the user
router.get("/findallchats", isAuth, fetchChats);

router.post("/access", isAuth);

module.exports = router;
