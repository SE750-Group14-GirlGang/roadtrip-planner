import { RoadTrip } from '../models/RoadTrip';

export async function getAllRoadTrips() {
    return await RoadTrip.find();
}

export async function getRoadTrip(id) {
    return await RoadTrip.findById(id);
}

export async function createRoadTrip(roadTrip) {
    const dbRoadTrip = new RoadTrip(roadTrip);
    await dbRoadTrip.save();

    return dbRoadTrip;
}

