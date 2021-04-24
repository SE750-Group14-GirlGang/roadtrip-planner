import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

let roadTrip, map;

jest.mock('../../../../auth/checkJwt', () => {
    return jest.fn((req, res, next) => {
        next();
    });
});

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
    const mapsColl = await mongoose.connection.db.createCollection('maps');

    map = {
        primaryDestination: {
            number: "123",
            street: "Queen Street",
            city: "Auckland",
            postcode: "1010"
        }
    };
    await mapsColl.insertOne(map);

    roadTrip = {
        name: 'My Road Trip',
        map: map._id
    };
    await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
    await mongoose.connection.db.dropCollection('maps');
});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets map for a roadtrip from the server', async () => {
    const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/map`);
    const mapRes = response.data;

    expect(mapRes).toBeTruthy();

    expect(mapRes.primaryDestination.number).toBe("123");
    expect(mapRes.primaryDestination.street).toBe("Queen Street");
    expect(mapRes.primaryDestination.city).toBe("Auckland");
    expect(mapRes.primaryDestination.postcode).toBe("1010");
});