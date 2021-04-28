import mongoose from 'mongoose';

const { Schema } = mongoose;

const packingListSchema = new Schema({
  items: [String],
}, { collection: 'packinglists' });

export const PackingList = mongoose.model('PackingList', packingListSchema);
