const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticate.midleware');
const adminController = require('../controllers/admin.controllers');



router.post("/:slug/upgrade",authenticateUser, adminController.upgradeTenant);


module.exports = router;