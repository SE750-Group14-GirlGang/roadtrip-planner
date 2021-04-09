import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packedItemsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [ String ]
}, { collection: 'packeditems' });

export const PackedItems = mongoose.model('PackedItems', packedItemsSchema);