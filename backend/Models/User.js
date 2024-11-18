const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: [String],
        enum: ['patient', 'doctor', 'admin'],
        required: true
    },
    //UnComment when medical_records is ready
    medical_records: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord'
    },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

