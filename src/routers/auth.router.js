const express = require('express');
const { httpLogin, httpLogout } = require('../controller/auth.controller');

const router = express.Router();

router.post('/login', httpLogin);
router.post('/logout', httpLogout);

module.exports = router;
