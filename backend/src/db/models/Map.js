import mongoose from 'mongoose';

const { Schema } = mongoose;

const mapSchema = new Schema(
  {
    primaryDestination: {
      long: Number,
      lat: Number,
      name: String,
    },
  },
  { collection: 'maps' },
);

export const Map = mongoose.model('Map', mapSchema);
