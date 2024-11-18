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
        type: Array[String]
    },
    allergies: {
        type: Array[String]
    },
    conditions: {
        type: Array[String]
    },
    medications: {
        type: Array[String]
    },
    immunizations: {
        type: Array[String]
    },
    procedures: {
        type: Array[String]
    }
});

const AppointmentModel = mongoose.model('users', AppointmentSchema);
module.exports = AppointmentModel;