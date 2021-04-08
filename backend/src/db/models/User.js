import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emergencyContact: {
        name: String,
        phoneNumber: String,
        relation: String
    },
    allergies: [String],
    medicalConditions: [String],
    packedItems: [String]
});

export const User = mongoose.model('User', userSchema);