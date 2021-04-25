import { RoadTrip } from "../models/RoadTrip";
import { addRoadTripsOrganising } from "../controllers/users";

export async function getRoadTrip(roadTripId) {
    return await RoadTrip.findById(roadTripId);
}

export async function createRoadTrip(roadTrip, organiserId) {
    roadTrip.organiser = organiserId;
    const dbRoadTrip = new RoadTrip(roadTrip);
    await dbRoadTrip.save();
    //creates bidirectional relationship between User and Roadtrip
    await addRoadTripsOrganising(organiserId, dbRoadTrip._id);
    return dbRoadTrip;
}

export async function isUserOrganiser(roadTripId, userId) {
    const dbRoadTrip = await getRoadTrip(roadTripId);
    const organiserId =  dbRoadTrip.organiser;
    console.log("organiser ", organiserId);
    console.log("user ", userId);
    const result = new String(organiserId).valueOf() === new String(userId).valueOf();
    console.log("result ", result);
    return result;
}
