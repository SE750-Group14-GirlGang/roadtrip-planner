import mongoose from 'mongoose';

const { Schema } = mongoose;

const itinerarySchema = new Schema(
  {
    days: [
      {
        date: Date,
        events: [
          {
            time: String,
            location: String,
            notes: String,
            description: String,
          },
        ],
      },
    ],
  },
  { collection: 'itineraries' }
);

export const Itinerary = mongoose.model('Itinerary', itinerarySchema);
