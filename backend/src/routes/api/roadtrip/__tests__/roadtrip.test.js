import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import router from '../../../index';

let mongod;
let app;
let server;
let roadTrip1;
let roadTrip2;
let roadTrip3;
let roadTrip4;
const userId = '608360966dcb41278446d3da';

jest.mock('../../../../auth/checkJwt', () =>
  // mock user id
  jest.fn((req, res, next) => {
    req.user = {
      sub: 'prefix|608360966dcb41278446d3da',
    };
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
  const usersColl = await mongoose.connection.db.createCollection('users');
  const roadTripsColl = await mongoose.connection.db.createCollection('roadtrips');

  roadTrip1 = {
    name: 'The First Roadtrip',
  };
  roadTrip2 = {
    name: 'The Second Roadtrip',
  };
  roadTrip3 = {
    name: 'The First Roadtrip user is organising',
  };
  roadTrip4 = {
    name: 'The Second Roadtrip user is organising',
  };
  await roadTripsColl.insertMany([roadTrip1, roadTrip2, roadTrip3, roadTrip4]);

  const user = {
    _id: mongoose.Types.ObjectId(userId),
    email: 'mockEmail',
    roadTripsOrganising: [roadTrip3._id, roadTrip4._id],
    roadTripsAttending: [roadTrip1._id, roadTrip2._id],
  };

  await usersColl.insertOne(user);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('roadtrips');
  await mongoose.connection.db.dropCollection('users');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('returns all roadtrips', async () => {
  const response = await axios.get('http://localhost:3000/api/roadtrip');
  const roadTrips = response.data;

  expect(roadTrips).toBeTruthy();

  expect(roadTrips.roadTripsAttending.length).toBe(2);
  expect(roadTrips.roadTripsAttending[0].name).toBe('The First Roadtrip');
  expect(roadTrips.roadTripsAttending[1].name).toBe('The Second Roadtrip');

  expect(roadTrips.roadTripsOrganising.length).toBe(2);
  expect(roadTrips.roadTripsOrganising[0].name).toBe('The First Roadtrip user is organising');
  expect(roadTrips.roadTripsOrganising[1].name).toBe('The Second Roadtrip user is organising');
});

it('returns a single roadtrip', async () => {
  const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip2._id}`);
  const roadTrip = response.data;

  expect(roadTrip).toBeTruthy();

  expect(roadTrip.name).toBe('The Second Roadtrip');
});
