const express = require('express');
const isAuth = require('../middlewares/isAuth');
const { getMessages, sendMessage } = require('../controllers/message.Controller');
const router = express.Router();

router.get('/:chatId',isAuth,getMessages);
router.post('/',isAuth,sendMessage);

module.exports = router;