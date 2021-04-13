import mongoose from 'mongoose';
const dotenv = require('dotenv');
dotenv.config()

const pw = process.env.MONGO_DB_PW
const user = process.env.MONGO_DB_USERNAME

const DEFAULT_CONNECTION_STRING = 'mongodb+srv://' + user + ':'  + pw + '@roadtrip-planner.dellc.mongodb.net/roadtrip-planner';

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
export default function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true
    });
}