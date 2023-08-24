const express = require('express');
const { seedUser } = require('../controller/seed.controller');

const router = express.Router();

router.get('/users', seedUser);

module.exports = router;
