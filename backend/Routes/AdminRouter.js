const express = require('express');
const router = express.Router();
// const deleteAccount = require('../Middlewares/AccountManagement');
const Auth = require('../Middlewares/Auth');
const AccountManagement = require('../Middlewares/AccountManagement');
const AuthValidation = require('../Middlewares/AuthValidation');

router.use(Auth.verifyRole('admin'));

router.get('/', (req, res) => {
    console.log('---- Get Admin ---', req.user);
    res.status(200).json([
        { message: 'This is Admin page' }
    ])
});

router.post('/deleteUser', AccountManagement.deleteAccount, (req, res) => {
        var t = "---- delete User Post method ---";
    console.log(t);
    res.status(200).json([
        { message: req.body.email + ' was successfully deleted' }
    ])
});

router.post('/createUser', AuthValidation.signupValidation, AccountManagement.createAccount, (req, res) => {
    console.log('---- Create User Post ---');
    res.status(200).json([
        { message: req.body.email + ' was successfully created!' }
    ])
});

router.post('/assignRole', AccountManagement.assignRole, (req, res) => {
    console.log('---- Assign Role POST ---', req.user);
    res.status(200).json([
        { message: 
            req.body.email + ' was successfully changed to ' + req.body.newRole }
    ])
});
module.exports = router;