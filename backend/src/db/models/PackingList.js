import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packingListSchema = new Schema({
    items: [ String ]
}, { collection: 'packinglists' });

export const PackingList = mongoose.model('PackingList', packingListSchema);