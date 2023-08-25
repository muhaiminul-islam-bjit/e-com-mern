const express = require('express');
const { getUsers, getUser, deleteUser, processRegister, verifyUserAccount, updateUser } = require('../controller/user.controller');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration } = require('../validator/auth.validator');
const runValidation = require('../validator');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', isLoggedIn, isAdmin, getUsers);
router.post('/process-register', isLoggedOut, upload.single('image'), validateUserRegistration, runValidation, processRegister);
router.post('/verify', isLoggedOut, verifyUserAccount);
router.get('/:id', getUser);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
