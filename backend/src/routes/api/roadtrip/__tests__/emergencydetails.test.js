import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import router from '../../../index';

let mongod; let app; let
  server;

let roadTrip; let
  emergencyDetails;

jest.mock('../../../../auth/checkJwt', () => jest.fn((req, res, next) => {
  next();
}));

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
  const emergencyDetailsColl = await mongoose.connection.db.createCollection('emergencydetails');

  emergencyDetails = {
    phoneNumber: '0000000',
    emergencyContact: {
      name: 'Peter',
      phoneNumber: '1111111',
      relation: 'Father',
    },
    allergies: ['nuts'],
    medicalConditions: ['hemophilia'],
  };
  await emergencyDetailsColl.insertOne(emergencyDetails);

  roadTrip = {
    name: 'My Road Trip',
    emergencyDetails: [
      emergencyDetails._id,
    ],
  };
  await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('roadtrips');
  await mongoose.connection.db.dropCollection('emergencydetails');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('gets emergency details for a roadtrip from the server', async () => {
  const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/emergencydetails`);
  const emergencyDetailsRes = response.data;

  expect(emergencyDetailsRes).toBeTruthy();
  expect(emergencyDetailsRes.length).toBe(1);

  expect(emergencyDetailsRes[0].phoneNumber).toBe('0000000');
  expect(emergencyDetailsRes[0].emergencyContact.name).toBe('Peter');
});
