const express = require('express');
const router = express.Router();
const { registerUSer, loginUser,logoutUser } = require('../controllers/auth.controllers');

router.post('/signup', registerUSer);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;