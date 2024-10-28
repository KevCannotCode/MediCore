const express = require('express');
const router = express.Router();
// const deleteAccount = require('../Middlewares/AccountManagement');
const Auth = require('../Middlewares/Auth');
const AccountManagement = require('../Middlewares/AccountManagement');
const AuthValidation = require('../Middlewares/AuthValidation');

// router.use(Auth.verifyRole('admin'));

router.get('/', Auth.verifyRole('admin'), (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { message: 'This is Admin page' }
    ])
});

router.post('/deleteUser', Auth.verifyRole('admin'), AccountManagement.deleteAccount, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { message: 'email : ' + 
            req.body.email + ' was successfully deleted' }
    ])
});

router.post('/createUser', AuthValidation.signupValidation, Auth.verifyRole('admin'), AccountManagement.createAccount, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { message: 'email : ' + 
            req.body.email + ' was successfully created!' }
    ])
});
module.exports = router;