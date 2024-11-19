const UserModel = require("../Models/User");
const mongoose = require('mongoose');
//make sure it connects to medicalRecords
const MedicalRecordModel = require("../Models/MedicalRecord");
const ObjectId = mongoose.Types.ObjectId;
exports.updateMedicalRecord = async (req, res) => {
    try{
        const {userId} = req.params;
        const {allergies, conditions, immunizations, medications, procedures } = req.body;
        // Data validation
        if(!userId){
            return res.status(400).json({message: 'Missing required fields: User id'});
        }

        if(!allergies && !conditions && !immunizations && !medications && !procedures){
            return res.status(400).json({message: 'Must enter at least one of these: allergies, conditions, immunizations, medications, procedures'});
        }

        // const user = await UserModel.findById(userId);
        const user = await UserModel.findOne({ _id: userId });

        if (!user.medical_records){
            return res.status(400).json({ message: 'No medical record linked to this patient'});
        }
        // const updatedRecord = await MedicalRecordModel.findByIdAndUpdate(
        //     new ObjectId(user.medical_records),
        //     {
        //         allergies: allergies ? allergies : [],
        //         conditions: conditions ? conditions : [],
        //         immunizations: immunizations ? immunizations : [],
        //         medications: medications ? medications : [],
        //         procedures: procedures ? procedures : [],
        //         created_at: new Date(),
        //         created_by: user._id,
        //         updated_at: new Date(),
        //         updated_by: user._id
        //     },
        //     { new: true}
        // );

        // Build the $push object dynamically based on provided fields
        const updateData = {};
        if (allergies) {
            updateData.allergies = { $each: [allergies] };
        }
        if (conditions) {
            updateData.conditions = { $each: [conditions] };
        }
        if (immunizations) {
            updateData.immunizations = { $each: [immunizations] };
        }
        if (medications) {
            updateData.medications = { $each: [medications] };
        }
        if (procedures) {
            updateData.procedures = { $each: [procedures] };
        }

        const updatedRecord = await MedicalRecordModel.findByIdAndUpdate(
            new ObjectId(user.medical_records),
            {
                $push: updateData, // Append to arrays
                $set: { // Update timestamps and metadata
                    updated_at: new Date(),
                    updated_by: user._id
                }
            },
            { new: true }
        );

    // const testMedicalRecord = await MedicalRecordModel.findOne({ _id: new ObjectId('6733c72e0ddf2342ee2b9e38') });
    console.log("updatedRecord : ", updatedRecord);
    
    if (!updatedRecord) {
        return res.status(404).json({ message: 'Medical record not found' });
    }

    await updatedRecord.save();

    return res.status(200).json({
        message: 'Medical record updated successfully',
        data: updatedRecord
    });
} 
    catch (error){
        return res.status(500).json({message: 'Error updating medical record '+ error});
    }
};
