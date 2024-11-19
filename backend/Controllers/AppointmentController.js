// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const AppointmentModel = require("../Models/Appointment");
const JWTTokenService = require('jsonwebtoken');
const ObjectId = mongoose.Types.ObjectId;


const createAppointment = async (req, res, next) => {
    try {
        // Get appointment details
        const { doctorEmail, date, reason_for_appointment} = req.body;

        // Data validation
        if (!doctorEmail || !date || !reason_for_appointment) {
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
            reason_for_appointment: "Patient " + patient.name +": " + reason_for_appointment + "\n",
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
        const { appointmentId } = req.params;
        const {  treatment, notes, allergies, conditions, medications, immunizations, procedures} = req.body;

        // Data validation
        if (
            (!treatment || treatment.trim() === '') &&
            (!notes || notes.length === 0) &&
            (!allergies || allergies.length === 0) &&
            (!conditions || conditions.length === 0) &&
            (!medications || medications.length === 0) &&
            (!immunizations || immunizations.length === 0) &&
            (!procedures || procedures.length === 0)
        ) {
            return res.status(400).json({ message: 'At least one non-empty field must be provided' });
        }
        
        if (!appointmentId) {
            return res.status(400).json({ message: 'Missing required appointment id' });
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

        const appointment = await AppointmentModel.findOne({ _id: new ObjectId(appointmentId) });
        if (!appointment) {
            return res.status(409).json({ message: 'Appointment does not exist!', success: false });
        }
        
        // Prepare date to update the medical record
        const updateData = {};

        // Check for `notes`, ensuring it's not null, undefined, or an empty array
        if (notes !== null && notes !== undefined && notes.length > 0) {
            updateData.notes = { $each: [notes] }; // Assuming `notes` is an array
        }
        
        // Check for `allergies`
        if (allergies !== null && allergies !== undefined && allergies.length > 0) {
            updateData.allergies = { $each: [allergies] };
        }
        
        // Check for `conditions`
        if (conditions !== null && conditions !== undefined && conditions.length > 0) {
            updateData.conditions = { $each: [conditions] };
        }
        
        // Check for `immunizations`
        if (immunizations !== null && immunizations !== undefined && immunizations.length > 0) {
            updateData.immunizations = { $each: [immunizations] };
        }
        
        // Check for `medications`
        if (medications !== null && medications !== undefined && medications.length > 0) {
            updateData.medications = { $each: [medications] };
        }
        
        // Check for `procedures`
        if (procedures !== null && procedures !== undefined && procedures.length > 0) {
            updateData.procedures = { $each: [procedures] };
        }

        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            new ObjectId(appointmentId),
            {
                $push: updateData, // Append to arrays
                $set: { // Update timestamps and metadata
                    treatment: treatment ? treatment : "",
                }
            },
            { new: true }
        );

        // Save the updated appointment
        await updatedAppointment.save();
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
