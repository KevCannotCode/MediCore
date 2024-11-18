// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const AppointmentModel = require("../Models/Appointment");
const JWTTokenService = require('jsonwebtoken');
const UserModel = require("../Models/User");

/* 
    The deleteAccount is a function that returns a middleware function. 
    The middleware function checks if the user exists in the database. 
    If the user exists, the function will delete the user from the database. 
    If the user does not exist, the function will return a 403 status code with a message.
*/
// const deleteAccount = async (req, res, next) => {
//     try {
//         // Get jwt payload
//         const email = req.body.email;
//         if (!email) {
//             return res.status(404).json({ message: 'User not found' });
//         }   
//         // Query user
//         const user = await UserModel.deleteOne({ email: email });

//         if (user.deletedCount != 1) {
//             return res.status(403).json({ message: 'User does not exist' });
//         }
//         next();
//     } catch (err) {
//         return res.status(504).json({ message: 'Check deleteAccount in Auth' });
//     }
// }

/**/
const createAppointment = async (req, res, next) => {
    try {
        // Get appointment details
        const { doctorEmail, date, diagnosis} = req.body;
        
        // Get jwt payload
        const auth = req.headers['authorization'];
        const decoded = JWTTokenService.verify(auth, process.env.JWT_SECRET);
        const patientId = decoded._id;

        // Query patient 
        const patient = await UserModel.findOne({ _id: patientId });
        if (!patient || patient.role.toString() !== 'patient') {
            return res.status(403).json({ message: 'Forbidden, wrong account must be a patient' });
        }

        // Query Doctor 
        const doctor = await UserModel.findOne({ email: doctorEmail });
        if (!doctor || doctor.role.toString() !== 'doctor') {
            return res.status(403).json({ message: 'Forbidden, doctor does not exist' });
        }

        // Verify that the appointment does not exist

        const alreadyBooked = AppointmentModel.findOne({ patient: patientId, doctor: doctor._id, date: date });
        if (alreadyBooked) {
            return res.status(409).json({ message: 'Appointment already exist!', success: false });
        }

        // Create appointment
        const newAppointment = new AppointmentModel({
            patient: userId,
            doctor: doctor._id,
            date: date,
            diagnosis: diagnosis
        });

        await newAppointment.save();
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror", success: false });
    }
}

/*
    AssignRole is a function that returns a middleware function.
    The middleware function checks if the user exists in the database.
    If the user exists, the function will update the user's role in the database.
    If the user does not exist, the function will return a 404 status code with a message.
*/
// const assignRole = async (req, res, next) => {
//     try {
//         // Get verify email
//         const { email, newRole } = req.body;
//         if (!email) {
//             return res.status(404).json({ message: 'User not found' });
//         }   

//         const updatedUser = await UserModel.findOneAndUpdate(
//             { email: email },
//             { role: newRole },
//             { new: true, runValidators: true }
//         );
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found', success: false });
//         }

//         next();
//     } catch (err) {
//         return res.status(504).json({ message: 'Check assignRole in AccountManagement' });
//     }
// }

/*
    The module.exports object is used to make the functions available to other files.
*/
module.exports = {
    createAppointment
};
