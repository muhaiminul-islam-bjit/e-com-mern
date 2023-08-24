const express = require('express');
const { seedUser } = require('../controller/seedController');

const router = express.Router();

router.get('/users', seedUser);

module.exports = router;
