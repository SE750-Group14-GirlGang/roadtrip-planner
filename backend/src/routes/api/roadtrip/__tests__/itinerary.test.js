import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

let roadTrip, itinerary;

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
    const itinerariesColl = await mongoose.connection.db.createCollection('itineraries');

    const april_21_2021 = new Date(2021,3,21); // months are indexed from 0

    itinerary = {
        dates: [april_21_2021],
        itineraryDays: [{
            day: april_21_2021,
            time: "Morning",
            location: "Cathedral Cove",
            notes: "Bring your togs!"
        }]
    };
    await itinerariesColl.insertOne(itinerary);

    roadTrip = {
        organiser: 0,
        name: 'My Road Trip',
        itinerary: itinerary._id
    };
    await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
    await mongoose.connection.db.dropCollection('itineraries');
});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets itinerary for a roadtrip from the server', async () => {
    const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/itinerary`);
    const itineraryRes = response.data;

    expect(itineraryRes).toBeTruthy();

    expect(itineraryRes.dates.length).toBe(1);
    expect(itineraryRes.itineraryDays[0].time).toBe('Morning');
    expect(itineraryRes.itineraryDays[0].location).toBe('Cathedral Cove');
    expect(itineraryRes.itineraryDays[0].notes).toBe('Bring your togs!');
});