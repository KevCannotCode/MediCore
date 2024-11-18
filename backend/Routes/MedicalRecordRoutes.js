const express = require('express');
const router = express.Router();
const MedicalRecordController = require('../Controllers/MedicalRecordController');
const authMiddleware = require('../Middlewares/Auth.js');

// router.get('/test', (req, res) => {
//     res.send('pong');
// });

router.post(
    '/update/:userId', authMiddleware.verifyRole('doctor'), 
    MedicalRecordController.updateMedicalRecord,(req, res) => {res.send('pong');}
);

module.exports = router;