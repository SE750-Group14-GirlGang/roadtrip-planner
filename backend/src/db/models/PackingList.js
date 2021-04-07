import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packingListSchema = new Schema({
    items: [string]
});

export default PackingList = mongoose.model('PackingList', packingListSchema);