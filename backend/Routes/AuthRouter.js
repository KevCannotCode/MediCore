const AuthController = require('../Controllers/AuthController');
const AuthValidation = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', AuthValidation.loginValidation, AuthController.login);
router.post('/signup', AuthValidation.signupValidation, AuthController.signup);
router.get('/test', (req, res) => {
    res.send('pong');
});
module.exports = router;

