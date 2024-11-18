// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const AppointmentModel = require("../Models/Appointment");
const JWTTokenService = require('jsonwebtoken');

const createAppointment = async (req, res, next) => {
    try {
        // Get appointment details
        const { doctorEmail, date, diagnosis} = req.body;

        // Data validation
        if (!doctorEmail || !date || !diagnosis) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check that date is either today or after
        const appointmentDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

        if (appointmentDate < today) {
            return res.status(400).json({ message: 'Appointment date must be today or in the future' });
        }
        
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

        const alreadyBooked = await AppointmentModel.findOne({ patientId: patient._id, doctorId: doctor._id, date: date });
        if (alreadyBooked) {
            return res.status(409).json({ message: 'Appointment already exist!', success: false });
        }
        
        // Create appointment
        const newAppointment = new AppointmentModel({
            patientId: patient._id,
            doctorId: doctor._id,
            date: date,
            diagnosis: "Patient " + patient.name +": " + diagnosis + "\n",
            treatment: "",
            notes: [],
            allergies: [],
            conditions: [],
            medications: [],
            immunizations: [],
            procedures: []
        });

        await newAppointment.save();
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror => " + err, success: false });
    }
}

const doctorUpdate = async (req, res, next) => {
    try {
        // Get appointment details
        const { diagnosis, treatment, notes, allergies, conditions, medications, immunizations, procedures} = req.body;

        // Data validation
        if (!diagnosis && !treatment && !notes && !allergies && !conditions && !medications && !immunizations && !procedures) {
            return res.status(400).json({ message: 'At least one field must be provided' });
        }

        // Get jwt payload
        const auth = req.headers['authorization'];
        const decoded = JWTTokenService.verify(auth, process.env.JWT_SECRET);
        const doctorId = decoded._id;

        // Query Doctor 
        const doctor = await UserModel.findOne({ _id: doctorId });
        if (!doctor || doctor.role.toString() !== 'doctor') {
            return res.status(403).json({ message: 'Forbidden, doctor does not exist' });
        }

        // Verify that the appointment does not exist
        const appointment = await AppointmentModel.findOne({ patientId: patient._id, doctorId: doctor._id, date: date });
        if (!appointment) {
            return res.status(409).json({ message: 'Appointment does not exist!', success: false });
        }
        
        // Update the appointment details
        appointment.diagnosis = diagnosis;
        appointment.treatment = treatment;
        appointment.notes = notes;
        appointment.allergies = allergies;
        appointment.conditions = conditions;
        appointment.medications = medications;
        appointment.immunizations = immunizations;
        appointment.procedures = procedures;

        // Save the updated appointment
        await appointment.save();
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror => " + err, success: false });
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
    createAppointment,
    doctorUpdate
};
