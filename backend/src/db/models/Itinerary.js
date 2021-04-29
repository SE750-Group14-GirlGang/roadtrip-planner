import mongoose from 'mongoose';

const { Schema } = mongoose;

const itinerarySchema = new Schema(
  {
    days: [
      {
        date: Date,
        itinerary: [
          {
            time: String,
            location: String,
            notes: String,
          },
        ],
      },
    ],
  },
  { collection: 'itineraries' }
);

export const Itinerary = mongoose.model('Itinerary', itinerarySchema);
