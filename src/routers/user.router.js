const express = require('express');
const { getUsers, getUser, deleteUser, processRegister, verifyUserAccount, updateUser } = require('../controller/user.controller');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration } = require('../validator/auth.validator');
const runValidation = require('../validator');
const { isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.get('/', isLoggedIn, getUsers);
router.post('/process-register', upload.single('image'), validateUserRegistration, runValidation, processRegister);
router.post('/verify', verifyUserAccount);
router.get('/:id', getUser);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
