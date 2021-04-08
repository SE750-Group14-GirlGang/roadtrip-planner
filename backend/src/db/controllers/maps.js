import { Map } from '../models/Map';
import { RoadTrip } from '../models/RoadTrip';

export async function createMap(roadTripId, map) {
    const dbMap = new Map(map);
    await dbMap.save();

    const roadtrip = RoadTrip.findById(roadTripId);
    roadtrip.map = dbMap._id;
    await roadtrip.save();

    return dbMap;
}