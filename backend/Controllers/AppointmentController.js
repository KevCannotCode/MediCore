// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const AppointmentModel = require("../Models/Appointment");
const JWTTokenService = require('jsonwebtoken');
const MedicalRecordModel = require('../Models/MedicalRecord');
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

const getOneAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Retrieve all appointments
        const appointments = await AppointmentModel.find({_id: new ObjectId(appointmentId)}); 

        // Populate doctor and patient names
        const parsedAppointments = await Promise.all(appointments.map(async (appointment) => {
            const doctor = await UserModel.findById({_id: appointment.doctorId});
            const patient = await UserModel.findById({_id: appointment.patientId});
            return {
            _id: appointment._id.toString(),
            date: appointment.date,
            reason_for_appointment: appointment.reason_for_appointment,
            treatment: Array.isArray(appointment.treatment) ? appointment.treatment.join("\n\n") : appointment.treatment,
            notes: Array.isArray(appointment.notes) ? appointment.notes.join("\n\n") : appointment.notes,
            allergies: Array.isArray(appointment.allergies) ? appointment.allergies.join("\n\n") : appointment.allergies,
            conditions: Array.isArray(appointment.conditions) ? appointment.conditions.join("\n\n") : appointment.conditions,
            medications: Array.isArray(appointment.medications) ? appointment.medications.join("\n\n") : appointment.medications,
            immunizations: Array.isArray(appointment.immunizations) ? appointment.immunizations.join("\n\n") : appointment.immunizations,
            procedures: Array.isArray(appointment.procedures) ? appointment.procedures.join("\n\n") : appointment.procedures,
            doctorName: doctor ? doctor.name : 'Unknown Doctor',
            patientName: patient ? patient.name : 'Unknown Patient',
            doctorEmail: doctor ? doctor.email : 'Unknown Doctor',
            patientEmail: patient ? patient.email : 'Unknown Patient'
            };
        }));

        // Return the data
        res.status(200).json({ 
            success: true, 
            data: parsedAppointments
        });

    } catch (err) {
        // Handle errors
        res.status(500).json({ 
            message: "Internal server error => " + err, 
            success: false 
        });
    }
}

const doctorUpdate = async (req, res, next) => {
    try {
        // Get appointment details
        const { appointmentId, medicalRecordUpdate} = req.params;
        const { treatment, notes, allergies, conditions, medications, immunizations, procedures} = req.body;

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

        if (!appointmentId || !medicalRecordUpdate) {
            return res.status(400).json({ message: 'Missing required appointment id and medicalRecordUpdate' });    
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
        
        //can only update appointment after it has occurred
        if (new Date(appointment.date) > new Date()) {
            return res.status(409).json({ message: 'Appointment has not occurred yet!', success: false });
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

        
        // Update the corresponding medical record
        if(medicalRecordUpdate == '1') {
            const patient = await UserModel.findOne({ _id: appointment.patientId });
            const updateMedicalRecord = await MedicalRecordModel.findByIdAndUpdate(
                new ObjectId(patient.medical_records),
                {
                    $push: updateData, // Append to arrays
                    $set: { // Update timestamps and metadata
                        updated_at: new Date(),
                        updated_by: doctor._id
                    }
                },
                { new: true }
            );
    
            if (!updateMedicalRecord) {
                return res.status(404).json({ message: 'Medical record not found' });
            }
            
            else{
                await updateMedicalRecord.save();
            }
        }
    
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror => " + err, success: false });
    }
}

const patientUpdate = async (req, res, next) => {
    try {
        // Get appointment details
        const { appointmentId} = req.params;
        const { doctorEmail, date,reason_for_appointment} = req.body;

        // Data validation
        if (
            (!doctorEmail || doctorEmail === '') &&
            (!date || date === '') &&
            (!reason_for_appointment || reason_for_appointment === '')
        ) {
            return res.status(400).json({ message: 'At least one non-empty field must be provided' });
        }

        if (!appointmentId) {
            return res.status(400).json({ message: 'Missing required appointment id and medicalRecordUpdate' });    
        }

        // Get jwt payload
        const auth = req.headers['authorization'];
        const decoded = JWTTokenService.verify(auth, process.env.JWT_SECRET);
        const patientId = decoded._id;

        // Query Patient 
        const patient = await UserModel.findOne({ _id: patientId });
        if (!patient || patient.role.toString() !== 'patient') {
            return res.status(403).json({ message: 'Forbidden, patient does not exist' });
        }

        const doctor = await UserModel.findOne({ email: doctorEmail });

        // Verify that the appointment does not exist

        const appointment = await AppointmentModel.findOne({ _id: new ObjectId(appointmentId) });
        if (!appointment) {
            return res.status(409).json({ message: 'Appointment does not exist!', success: false });
        }
        
        //can only update appointment after it has occurred
        // if (new Date(appointment.date) > new Date()) {
        //     return res.status(409).json({ message: 'Appointment has not occurred yet!', success: false });
        // }

        // Prepare date to update the medical record
        const updateData = {};

        // Check for `doctorEmail`, ensuring it's not null, undefined, or an empty array
        updateData.reason_for_appointment = "Patient " + patient.name +": " + reason_for_appointment + "\n";
        updateData.date = new Date(date);
        updateData.doctorId = doctor._id;

        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            new ObjectId(appointmentId),
            {
                reason_for_appointment: updateData.reason_for_appointment,
                date: updateData.date,
                doctorId: updateData.doctorId
            },
            { new: true }
        );
    
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror => " + err, success: false });
    }
}

const deleteAppointment = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;

        // Get jwt payload
        const auth = req.headers['authorization'];
        const decoded = JWTTokenService.verify(auth, process.env.JWT_SECRET);
        const userId = decoded._id;
    
        // Query Doctor 
        const user = await UserModel.findOne({ _id: userId });
    
        // Verify that the appointment exists
        const appointment = await AppointmentModel.findOne({ _id: new ObjectId(appointmentId) });
        if (!appointment) {
            return res.status(409).json({ message: 'Appointment does not exist!', success: false });
        }
    
        if (!user || (user._id.toString() !== appointment.patientId.toString() && user._id.toString() !== appointment.doctorId.toString())) {
            return res.status(403).json({ message: 'Forbidden, only the respective doctor or patient can delete the appointment' });
        }
    
        // Delete appointment 
        await appointment.deleteOne();
        next();
    } catch (err) {
        return res.status(504).json({ message: 'Check deleteAccount in Auth\n' + err });
    }
}

const getAllAppointments = async (req, res) => {
    try {
        // Get JWT token from the Authorization header
        const auth = req.headers['authorization'];

        if (!auth) {
            return res.status(401).json({ message: 'Authorization token is required', success: false });
        }

        // Decode the token to get user details
        const decoded = JWTTokenService.verify(auth, process.env.JWT_SECRET);
        const userId = decoded._id;

        // Fetch the user from the database to determine their role
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Filter appointments based on the user's role
        const query = (user.role == 'doctor') ? { doctorId: user._id.toString() } : { patientId: user._id.toString() };

        // Retrieve all appointments
        const appointments = (user.role == 'doctor')? await AppointmentModel.find({doctorId: user._id.toString()}) : await AppointmentModel.find({patientId: user._id.toString()}); 

        // Populate doctor and patient names
        const parsedAppointments = await Promise.all(appointments.map(async (appointment) => {
            const doctor = await UserModel.findById({_id: appointment.doctorId});
            const patient = await UserModel.findById({_id: appointment.patientId});
            return {
            _id: appointment._id.toString(),
            date: appointment.date,
            reason_for_appointment: appointment.reason_for_appointment,
            treatment: Array.isArray(appointment.treatment) ? appointment.treatment.join("\n\n") : appointment.treatment,
            notes: Array.isArray(appointment.notes) ? appointment.notes.join("\n\n") : appointment.notes,
            allergies: Array.isArray(appointment.allergies) ? appointment.allergies.join("\n\n") : appointment.allergies,
            conditions: Array.isArray(appointment.conditions) ? appointment.conditions.join("\n\n") : appointment.conditions,
            medications: Array.isArray(appointment.medications) ? appointment.medications.join("\n\n") : appointment.medications,
            immunizations: Array.isArray(appointment.immunizations) ? appointment.immunizations.join("\n\n") : appointment.immunizations,
            procedures: Array.isArray(appointment.procedures) ? appointment.procedures.join("\n\n") : appointment.procedures,
            doctorName: doctor ? doctor.name : 'Unknown Doctor',
            patientName: patient ? patient.name : 'Unknown Patient'
            };
        }));

        // Return the data
        res.status(200).json({ 
            success: true, 
            data: parsedAppointments
        });

    } catch (err) {
        // Handle errors
        res.status(500).json({ 
            message: "Internal server error => " + err, 
            success: false 
        });
    }
}
/*
    The module.exports object is used to make the functions available to other files.
*/
module.exports = {
    createAppointment,
    doctorUpdate,
    deleteAppointment,
    getAllAppointments,
    getOneAppointment,
    patientUpdate
};
