import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import router from '../../../index';

let mongod;
let app;
let server;

let roadTrip;
let itinerary;

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
  const itinerariesColl = await mongoose.connection.db.createCollection('itineraries');

  const april_21_2021 = new Date(2021, 3, 21); // months are indexed from 0

  itinerary = {
    days: [
      {
        date: april_21_2021,
        events: [
          {
            time: '12:00',
            location: 'Cathedral Cove',
            notes: 'Bring your togs!',
            description: 'Swimming',
          },
        ],
      },
    ],
  };
  await itinerariesColl.insertOne(itinerary);

  roadTrip = {
    name: 'My Road Trip',
    itinerary: itinerary._id,
  };
  await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('roadtrips');
  await mongoose.connection.db.dropCollection('itineraries');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('returns itinerary for a roadtrip', async () => {
  const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/itinerary`);
  const itineraryRes = response.data;

  expect(itineraryRes).toBeTruthy();

  expect(itineraryRes.days.length).toBe(1);
  expect(itineraryRes.days[0].events.length).toBe(1);
  expect(itineraryRes.days[0].events[0].time).toBe('12:00');
  expect(itineraryRes.days[0].events[0].location).toBe('Cathedral Cove');
  expect(itineraryRes.days[0].events[0].notes).toBe('Bring your togs!');
  expect(itineraryRes.days[0].events[0].description).toBe('Swimming');
});
