const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    allergies: [String],
    conditions: [String],
    immunizations: [String],
    medications: [String],
    procedures: [String],
    created_at: {type: Date, default: Date.now },
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updated_at: {type: Date },
    updated_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

// module.exports = mongoose.model('medicalRecord', MedicalRecordSchema);
const MedicalRecordModel = mongoose.model('medicalRecords', MedicalRecordSchema);
module.exports = MedicalRecordModel;
