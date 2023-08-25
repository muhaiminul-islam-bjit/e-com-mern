const express = require('express');
const { httpLogin, httpLogout } = require('../controller/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', isLoggedOut, httpLogin);
router.post('/logout', isLoggedIn, httpLogout);

module.exports = router;
