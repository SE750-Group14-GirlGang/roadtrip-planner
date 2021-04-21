import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

let roadTrip, packingList;

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
    const packingListsColl = await mongoose.connection.db.createCollection('packinglists');

    packingList = {
        items: [
            "togs",
            "sleeping mat",
            "sleeping bag",
            "pillow",
            "clothes",
            "alcohol", 
        ]
    };
    await packingListsColl.insertOne(packingList);

    roadTrip = {
        name: 'My Road Trip',
        packingList: packingList._id
    };
    await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
    await mongoose.connection.db.dropCollection('packinglists');
});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets packing list for a roadtrip from the server', async () => {
    const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/packinglist`);
    const packingListRes = response.data;

    expect(packingListRes).toBeTruthy();

    expect(packingListRes.items.length).toBe(6);
    expect(packingListRes.items[2]).toBe("sleeping bag");
    expect(packingListRes.items[4]).toBe("clothes");
});