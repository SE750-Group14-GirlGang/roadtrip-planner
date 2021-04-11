import mongoose from 'mongoose';

const DEFAULT_CONNECTION_STRING = 'mongodb+srv://dpUser:vXYcCjUYahPZXoKV@roadtrip-planner.dellc.mongodb.net/roadtrip-planner';

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
export default function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true
    });
}