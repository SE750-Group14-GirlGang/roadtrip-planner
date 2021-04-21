import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

let roadTrip, packedItems1, packedItems2;

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
    const packedItemsColl = await mongoose.connection.db.createCollection('packeditems');

    packedItems1 = {
        items: [
            "togs",
            "clothes",
            "sleeping bag",
        ]
    };
    packedItems2 = {
        items: [
            "alcohol", 
        ]
    };
    await packedItemsColl.insertMany([packedItems1, packedItems2]);

    roadTrip = {
        organiser: 0,
        name: 'My Road Trip',
        packedItems: [
            packedItems1._id,
            packedItems2._id,
        ]
    };
    await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
    await mongoose.connection.db.dropCollection('packeditems');
});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets packed items for a roadtrip from the server', async () => {
    const response = await axios.get(`http://localhost:3000/api/roadtrip/${roadTrip._id}/packeditems`);
    const packedItemsRes = response.data;

    expect(packedItemsRes).toBeTruthy();
    expect(packedItemsRes.length).toBe(2);

    expect(packedItemsRes[0].items.length).toBe(3);
    expect(packedItemsRes[0].items[0]).toBe("togs");
    expect(packedItemsRes[0].items[1]).toBe("clothes");
    expect(packedItemsRes[0].items[2]).toBe("sleeping bag");

    expect(packedItemsRes[1].items.length).toBe(1);
    expect(packedItemsRes[1].items[0]).toBe("alcohol");
});