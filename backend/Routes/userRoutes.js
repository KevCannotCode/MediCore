const express = require('express');
const router = express.Router();
const AccountManagement = require('../Controllers/AccountManagement');
const authMiddleware = require('../Middlewares/Auth.js');

// Route to fetch all users
// router.get(
//     '/api/users', AccountManagement.getAllUsers);

router.get(
    '/api/users', authMiddleware.verifyRole('admin'), AccountManagement.getAllUsers, (req, res) => {res.send('pong');});

// router.get('/test', (req, res) => {
//     res.send('pong');
// });

// router.post(
//     '/update/:userId', authMiddleware.verifyRole('doctor'), 
//     MedicalRecordController.updateMedicalRecord,(req, res) => {res.send('pong');}
// );
module.exports = router;
