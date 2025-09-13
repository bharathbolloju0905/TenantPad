const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');

const  authenticateUser  = require('../middlewares/authenticate.midleware');


router.post("/invite",authenticateUser, adminController.inviteUser);



module.exports = router;