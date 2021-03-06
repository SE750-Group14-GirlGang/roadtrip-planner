import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import router from '../../../index';

let mongod;
let app;
let server;

let roadTrip;
let spotify;

jest.mock('../../../../auth/checkJwt', () =>
  jest.fn((req, res, next) => {
    next();
  })
);

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use('/', router);
  server = app.listen(3000, () => done());
});

beforeEach(async () => {
  const roadTripsColl = await mongoose.connection.db.createCollection('roadtrips');
  const spotifysColl = await mongoose.connection.db.createCollection('spotifys');

  spotify = {
    playListLink: 'https://open.spotify.com/playlist/1uiJXPKTFDnlgvlJzhksSE?si=pyx5hNQjRWuXtAyaqsvbIQ',
  };
  await spotifysColl.insertOne(spotify);

  roadTrip = {
    name: 'My Road Trip',
    spotify: spotify._id,
  };
  await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('roadtrips');
  await mongoose.connection.db.dropCollection('spotifys');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('returns spotify for a roadtrip', async () => {
  const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/spotify`);
  const spotifyRes = response.data;

  expect(spotifyRes).toBeTruthy();

  expect(spotifyRes.playListLink).toBe(
    'https://open.spotify.com/playlist/1uiJXPKTFDnlgvlJzhksSE?si=pyx5hNQjRWuXtAyaqsvbIQ'
  );
});
