import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const spotifySchema = new Schema({
    playlistLink: string
});

export const Spotify = mongoose.model('Spotify', spotifySchema);