import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roadTripSchema = new Schema({
    organiser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String, required: true},
    attendees: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
        default: [] 
    },
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary' },
    map: { type: Schema.Types.ObjectId, ref: 'Map' },
    emergencyDetails: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'EmergencyDetails' }], 
        default: [] 
    },
    packingList: { type: Schema.Types.ObjectId, ref: 'PackingList' },
    packedItems: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'PackedItems'}],
        default: [] 
    },
    spotify: { type: Schema.Types.ObjectId, ref: 'Spotify' }
}, { collection: 'roadtrips' });

export const RoadTrip = mongoose.model('RoadTrip', roadTripSchema);