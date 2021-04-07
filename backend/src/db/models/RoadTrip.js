import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roadTripSchema = new Schema({
    organiser: { type: Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary' },
    map: { type: Schema.Types.ObjectId, ref: 'Map' },
    packingList: { type: Schema.Types.ObjectId, ref: 'PackingList' },
    spotify: { type: Schema.Types.ObjectId, ref: 'Spotify' }
});

export default RoadTrip = mongoose.model('RoadTrip', roadTripSchema);