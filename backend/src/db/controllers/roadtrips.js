import { RoadTrip } from '../models/RoadTrip';
import {addRoadTripsOrganising} from '../controllers/users'

export async function getRoadTrip(id) {
    return await RoadTrip.findById(id);
}

export async function createRoadTrip(roadTrip, organiserId) {
    roadTrip.organiser = organiserId;
    const dbRoadTrip = new RoadTrip(roadTrip);
    await dbRoadTrip.save();
    //creates bidirectional relationship between User and Roadtrip
    await addRoadTripsOrganising(organiserId, dbRoadTrip._id);
    return dbRoadTrip;
}

