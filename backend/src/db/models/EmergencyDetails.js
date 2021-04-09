import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const emergencyDetailsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: String,
    emergencyContact: {
        name: String,
        phoneNumber: String,
        relation: String
    },
    allergies: [ String ],
    medicalConditions: [ String ]
}, { collection: 'emergencydetails' });

export const EmergencyDetails = mongoose.model('EmergencyDetails', emergencyDetailsSchema);