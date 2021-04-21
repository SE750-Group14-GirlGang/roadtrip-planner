import router from '../../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

let roadTrip, emergencyDetails;

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
    const emergencyDetailsColl = await mongoose.connection.db.createCollection('emergencydetails');

    emergencyDetails = {
        user: 1,
        phoneNumber: '0000000',
        emergencyContact: {
            name: 'Peter',
            phoneNumber: '1111111',
            relation: 'Father'
        },
        allergies: [ 'nuts' ],
        medicalConditions: [ 'hemophilia' ]
    };
    await emergencyDetailsColl.insertOne(emergencyDetails);

    roadTrip = {
        organiser: 0,
        name: 'My Road Trip',
        emergencyDetails: [
            emergencyDetails._id
        ]
    };
    await roadTripsColl.insertOne(roadTrip);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('roadtrips');
    await mongoose.connection.db.dropCollection('emergencydetails');
});

afterAll(done => {
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

// Test times out :( want to ask Andrew for guidance on how to test a POST
// it('posts emergency details for a roadtrip to the server and then can get', async () => {

//     const postReponse = await axios.post(`http://localhost:3000/api/roadtrip/${roadTrip._id}/emergencydetails`, {
//         user: 2,
//         phoneNumber: '1234567',
//         emergencyContact: {
//             name: 'Susan',
//             phoneNumber: '7654321',
//             relation: 'Father'
//         },
//         allergies: [ 'milk' ],
//         medicalConditions: []
//     });

//     const emergencyDetailsLocation = postReponse.headers.Location;
//     const getResponse = await axios.get(emergencyDetailsLocation);
//     const emergencyDetails = getResponse.data;

//     expect(emergencyDetails).toBeTruthy();
//     expect(emergencyDetails.length).toBe(2);

//     expect(emergencyDetails[0].phoneNumber).toBe('0000000');
//     expect(emergencyDetails[0].emergencyContact.name).toBe('Peter');

//     expect(emergencyDetails[1].phoneNumber).toBe('1234567');
//     expect(emergencyDetails[1].emergencyContact.name).toBe('Susan');
// });