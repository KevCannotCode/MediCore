const Auth = require('../Middlewares/Auth');
const AccountManagement = require('../Middlewares/AccountManagement');
const router = require('express').Router();

// router.use(Auth.verifyRole('admin'));

router.get('/', Auth.verifyRole('admin'), (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { message: 'This is Admin page' }
    ])
});

router.post('/deleteUser', Auth.verifyRole('admin'), AccountManagement.deleteAccount(), (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        { message: 'email : ' + 
            req.body.email + ' was successfully deleted' }
    ])
});

module.exports = router;