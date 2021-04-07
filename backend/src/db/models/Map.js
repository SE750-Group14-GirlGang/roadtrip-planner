import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mapSchema = new Schema({
    primaryDestination: {
        number: String,
        street: String,
        city: String,
        postcode: Number
    },
});

export default Map = mongoose.model('Map', mapSchema);