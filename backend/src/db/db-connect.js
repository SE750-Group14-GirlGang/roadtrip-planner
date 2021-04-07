import mongoose from 'mongoose';

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017/roadtrip-planner';

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
export default function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true
    });
}