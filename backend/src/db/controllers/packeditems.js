import { PackedItems } from '../models/PackedItems';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getPackedItems(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'packedItems');
  return dbRoadTrip.packedItems;
}

export async function createPackedItems(roadTripId, packedItems) {
  const dbPackedItems = new PackedItems(packedItems);
  await dbPackedItems.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.packedItems.push(dbPackedItems._id);
  await dbRoadTrip.save();

  return dbPackedItems;
}
