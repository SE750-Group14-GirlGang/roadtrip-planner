import { PackingList } from '../models/PackingList';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getPackingList(roadTripId) {
    const dbRoadTrip = await getRoadTrip(roadTripId);
    await RoadTrip.populate(dbRoadTrip, 'packingList');
    return dbRoadTrip.packingList;
}

export async function createPackingList(roadTripId, packingList) {
    const dbPackingList = new PackingList(packingList);
    await dbPackingList.save();

    const dbRoadTrip = await getRoadTrip(roadTripId);
    dbRoadTrip.packingList = dbPackingList._id;
    await dbRoadTrip.save();

    return dbPackingList;
}