const express = require('express');
const router = express.Router();
const Auth = require('../Middlewares/Auth');
const AccountManagement = require('../Controllers/AccountManagement');
const AuthValidation = require('../Middlewares/AuthValidation');
const AppointmentManagement = require('../Controllers/AppointmentController');

// Middleware to verify that the user is an admin

// /* Post methods available at localhost:8080/Admin/deleteUser
//     Sends a JSON in the request in this format:
//     {"email":"email@gmail.com"}
//     The email is used to find the user in the database and delete it
//     The response is a JSON with a message that the user was successfully deleted

//     TODO: serve the appropriate frontend pages
// */
// router.post('/deleteUser', AccountManagement.deleteAccount, (req, res) => {
//         var t = "---- delete User Post method ---";
//     console.log(t);
//     res.status(200).json([
//         { message: req.body.email + ' was successfully deleted' }
//     ])
// });

// /**
//  * Post method available at localhost:8080/Admin/createUser
//  * Sends a JSON in the request in this format:
//  * {"name": "username","email":"useremail","password": "the password","role": "patient or doctor or admin"}
//  * The user input in the JSON request is used to create a new user in the database
//  * The response is a JSON with a message that the user was successfully created
//  * 
//  * TODO: serve the appropriate frontend pages
//  */
// router.post('/createUser', AuthValidation.signupValidation, AccountManagement.createAccount, (req, res) => {
//     console.log('---- Create User Post ---');
//     res.status(200).json([
//         { message: req.body.email + ' was successfully created!' }
//     ])
// });

/**
 * Post method available at localhost:8080/Admin/assignRole
 * Sends a JSON in the request in this format:
 * {"email":"useremail", "newRole":"role"}
 * The email and newRole are used to assign a new role to the user in the database
 * The response is a JSON with a message that the user's role was successfully changed
 * router.use(Auth.verifyRole('patient'));
 * TODO: serve the appropriate frontend pages
 */
router.post('/createAppointment', Auth.verifyRole('patient'), AppointmentManagement.createAppointment, (req, res) => {
    console.log('---- Create Appointment POST ---', req.user);
    res.status(200).json([
        { message: 'Appointment was successfully created '}
    ])
});

router.post('/doctorUpdate/:appointmentId', Auth.verifyRole('doctor'), AppointmentManagement.doctorUpdate, (req, res) => {
    console.log('---- Update Appointment POST ---', req.user);
    res.status(200).json([
        { message: 'Appointment was successfully updated by doctor '}
    ])
});

router.post('/cancellAppointment/:appointmentId', AppointmentManagement.deleteAppointment, (req, res) => {
    console.log('---- Delete Appointment POST ---', req.user);
    res.status(200).json([
        { message: 'Appointment was successfully deleted'}
    ])
});
module.exports = router;