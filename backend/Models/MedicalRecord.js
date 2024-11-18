const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MedicalRecordSchema = new mongoose.Schema({
    allergies: [String],
    conditions: [String],
    immunizations: [String],
    medications: [String],
    procedures: [String],
    created_at: {type: Date, default: Date.now },
    created_by: {type: ObjectId},
    updated_at: {type: Date },
    updated_by: {type: ObjectId}
})

// module.exports = mongoose.model('medicalRecord', MedicalRecordSchema);
const MedicalRecordModel = mongoose.model('medicalRecords', MedicalRecordSchema, 'medicalRecords');
module.exports = MedicalRecordModel;
