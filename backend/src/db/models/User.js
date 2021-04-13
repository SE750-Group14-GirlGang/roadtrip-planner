import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    password: String,
    roadTripsOrganising: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'RoadTrip' }], 
        default: [] 
    }, 
    roadTripsAttending: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'RoadTrip' }], 
        default: [] 
    }
}, { collection: 'users' });

export const User = mongoose.model('User', userSchema);