import { Map } from "../models/Map";
import { RoadTrip } from "../models/RoadTrip";

import { getRoadTrip } from "./roadtrips";

export async function getMap(roadTripId) {
    const dbRoadTrip = await getRoadTrip(roadTripId);
    await RoadTrip.populate(dbRoadTrip, "map");
    return dbRoadTrip.map;
}

export async function createMap(roadTripId, map) {
    const dbMap = new Map(map);
    await dbMap.save();

    const dbRoadTrip = await getRoadTrip(roadTripId);
    dbRoadTrip.map = dbMap._id;
    await dbRoadTrip.save();

    return dbMap;
}
