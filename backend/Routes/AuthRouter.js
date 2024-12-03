const AuthController = require('../Controllers/AuthController');
const AuthValidation = require('../Middlewares/AuthValidation');
const Auth = require('../Middlewares/Auth');
const router = require('express').Router();

router.post('/login', AuthValidation.loginValidation, AuthController.login);
router.post('/signup', AuthValidation.signupValidation, AuthController.signup);
router.get('/verifyPatient', Auth.verifyRole('patient'), (req, res) => {
    res.status(200).json({ message: 'User is a patient' });
});
router.get('/verifyDoctor', Auth.verifyRole('doctor'), (req, res) => {
    res.status(200).json({ message: 'User is a doctor' });
});
module.exports = router;

