const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { getUser, allUser } = require('../controllers/user.Controllers');

router.get('/',isAuth,getUser);
router.get('/all',isAuth,allUser);

module.exports = router;