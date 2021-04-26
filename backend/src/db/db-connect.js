import mongoose from 'mongoose';
import {MONGO_DB_PW, MONGO_DB_USERNAME} from '../config';

const pw = MONGO_DB_PW
const user = MONGO_DB_USERNAME

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