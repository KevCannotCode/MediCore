const UserModel = require("../Models/User");

//make sure it connects to medicalRecords
const MedicalRecordModel = require("../Models/MedicalRecord");

exports.updateMedicalRecord = async (req, res) => {
    try{
        const { userId } = req.params;
        const updateData = req.body;

        // const user = await UserModel.findById(userId);
        const user = await UserModel.findOne({ _id: userId });
        // if (!user || !user.role.includes('patient')){
        //     return res.status(404).json({message: 'Patient not found' });
        // }
        if (!user || user.role.toString() !== 'patient') {
            return res.status(403).json({ message: 'Forbidden, wrong account must be a patient' });
        }


        if (!user.medical_records){
            return res.status(400).json({ message: 'No medical record linked to this patient'});
        }

        // const updatedRecord = await MedicalRecordModel.findByIdAndUpdate(
        //     user.medical_records,
        //     {
        //         allergies: [],
        //         conditions: [],
        //         immunizations: [],
        //         medications: [],
        //         procedures: [],
        //         created_at: new Date(),
        //         created_by: user._id,
        //         updated_at: new Date(),
        //         updated_by: user._id
        //     },
        //     { new: true}
        // );
    const testMedicalRecord = await MedicalRecordModel.findOne({ _id: '6733c72e0ddf2342ee2b9e38' });
    if (!updatedRecord) {
        return res.status(404).json({message: 'Medical record not found'});
    }

    return res.status(200).json({
        message: 'Medical record updated successfully',
        data: updatedRecord
    });
} 
    catch (error){
        return res.status(500).json({message: 'Error updating medical record', error});
    }
};
