const express = require('express');
const { getUsers, getUser, deleteUser, processRegister } = require('../controller/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/process-register', processRegister);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
