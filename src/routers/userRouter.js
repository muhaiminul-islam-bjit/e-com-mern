const express = require('express');
const { getUsers, getUser, deleteUser, processRegister, verifyUserAccount } = require('../controller/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/process-register', processRegister);
router.post('/verify', verifyUserAccount);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
