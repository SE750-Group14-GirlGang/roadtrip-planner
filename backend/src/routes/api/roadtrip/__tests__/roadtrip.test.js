import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;
let roadTrip1, roadTrip2;

beforeAll(async done => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    app = express();
    app.use('/', router);
    server = app.listen(3000, () => done());

});

beforeEach(async () => {
    const roadTripsColl = await mongoose.connection.db.createCollection('roadtrips');

    roadTrip1 = {
        organiser: 0,
        name: 'The First Roadtrip'
    };
    roadTrip2 = {
        organiser: 0,
        name: 'The Second Roadtrip'
    };
    await roadTripsColl.insertMany([roadTrip1, roadTrip2]);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets all roadtrips', async () => {

    const response = await axios.get(`http://localhost:3000/api/roadtrip`);
    const roadTrips = response.data;

    expect(roadTrips).toBeTruthy();
    expect(roadTrips.length).toBe(2);

    expect(roadTrips[0].name).toBe('The First Roadtrip');
    expect(roadTrips[1].name).toBe('The Second Roadtrip');
});

it('gets a single roadtrip', async () => {

    const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip2._id}`);
    const roadTrip = response.data;

    expect(roadTrip).toBeTruthy();

    expect(roadTrip.name).toBe('The Second Roadtrip');
});