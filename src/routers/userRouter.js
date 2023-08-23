const express = require('express');
const { getUsers, getUser, deleteUser, processRegister, verifyUserAccount, updateUser } = require('../controller/userController');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration } = require('../validator/auth.validator');
const runValidation = require('../validator');

const router = express.Router();

router.get('/', getUsers);
router.post('/process-register', upload.single('image'), validateUserRegistration, runValidation, processRegister);
router.post('/verify', verifyUserAccount);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
