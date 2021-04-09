import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
}, { collection: 'users' });

export const User = mongoose.model('User', userSchema);