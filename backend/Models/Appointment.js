const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AppointmentSchema = new Schema({
    patientId: {
        type: ObjectId,
        required: true,
    },
    doctorId: {
        type: ObjectId,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    diagnosis : {   
        type: String
    },
    treatment: {    
        type: String
    },
    notes: {
        type: [String]
    },
    allergies: {
        type: [String]
    },
    conditions: {
        type: [String]
    },
    medications: {
        type: [String]
    },
    immunizations: {
        type: [String]
    },
    procedures: {
        type: [String]
    }
});

const AppointmentModel = mongoose.model('appointments', AppointmentSchema);
module.exports = AppointmentModel;