import mongoose from 'mongoose';

const { Schema } = mongoose;

const spotifySchema = new Schema(
  {
    playlistId: String,
  },
  { collection: 'spotifys' }
);

export const Spotify = mongoose.model('Spotify', spotifySchema);
