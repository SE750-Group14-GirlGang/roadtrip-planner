import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    dates: [Date],
    itineraryDays: [{
        day: Date,
        time: string,
        location: string,
        notes: string
    }]
});

export default Itinerary = mongoose.model('Itinerary', itinerarySchema);