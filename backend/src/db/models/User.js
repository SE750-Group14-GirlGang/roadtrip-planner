import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: string, unique: true, required: true },
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emergencyContact: {
        name: string,
        phoneNumber: string,
        relation: string
    },
    allergies: [string],
    medicalConditions: [string],
    packedItems: [string]
});

export default User = mongoose.model('User', userSchema);