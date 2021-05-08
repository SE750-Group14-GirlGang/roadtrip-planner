import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import router from '../../../../index';

let mongod;
let app;
let server;

let roadTrip;
let emergencyDetails1;
let emergencyDetails2;

const userId1 = '608360966dcb41278446d3da';
const userId2 = '679554266dcb41278446d3da';

jest.mock('../../../../../auth/checkJwt', () =>
  // mock user id
  jest.fn((req, res, next) => {
    req.user = {
      sub: `prefix|${userId1}`,
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
  const roadTripsColl = await mongoose.connection.db.createCollection('roadtrips');
  const emergencyDetailsColl = await mongoose.connection.db.createCollection('emergencydetails');

  emergencyDetails1 = {
    user: userId1,
    name: 'Charlie',
    phoneNumber: '0000000',
    emergencyContact: {
      name: 'Peter',
      phoneNumber: '1111111',
      relation: 'Father',
    },
  };

  emergencyDetails2 = {
    user: userId2,
    name: 'Daniel',
    phoneNumber: '1234567',
    emergencyContact: {
      name: 'Susan',
      phoneNumber: '7654321',
      relation: 'Mother',
    },
  };
  await emergencyDetailsColl.insertOne(emergencyDetails1);
  await emergencyDetailsColl.insertOne(emergencyDetails2);

  roadTrip = {
    name: 'My Road Trip',
    emergencyDetails: [emergencyDetails1._id, emergencyDetails2._id],
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

it('gets emergency details for a roadtrip for a specific user from the server', async () => {
  const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/emergencydetails/user`);
  const emergencyDetailsRes = response.data;

  expect(emergencyDetailsRes).toBeTruthy();

  expect(emergencyDetailsRes.name).toBe('Charlie');
  expect(emergencyDetailsRes.phoneNumber).toBe('0000000');
  expect(emergencyDetailsRes.emergencyContact.name).toBe('Peter');
});
