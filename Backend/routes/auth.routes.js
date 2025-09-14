const express = require('express');
const router = express.Router();
const { registerUSer, loginUser,logoutUser ,getProfile} = require('../controllers/auth.controllers');
const authenticateUser = require('../middlewares/authenticate.midleware');

router.post('/signup', registerUSer);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/me', authenticateUser, getProfile);

module.exports = router;