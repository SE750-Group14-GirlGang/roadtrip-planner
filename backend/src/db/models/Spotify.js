import mongoose from 'mongoose';

const { Schema } = mongoose;

const spotifySchema = new Schema({
  playlistLink: String,
}, { collection: 'spotifys' });

export const Spotify = mongoose.model('Spotify', spotifySchema);
