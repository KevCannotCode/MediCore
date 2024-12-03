const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const Auth = require('../Middlewares/Auth');


// Route to get user profile details
router.get('/profile', Auth.ensureAuthenticated, userController.getUserProfile );

module.exports = router;
