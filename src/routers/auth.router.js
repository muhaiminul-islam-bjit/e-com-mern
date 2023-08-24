const express = require('express');
const { httpLogin } = require('../controller/auth.controller');

const router = express.Router();

router.post('/login', httpLogin);

module.exports = router;
