const AuthController = require('../Controllers/AuthController');
const AuthValidation = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', AuthValidation.loginValidation, AuthController.login);
router.post('/signup', AuthValidation.signupValidation, AuthController.signup);

module.exports = router;

