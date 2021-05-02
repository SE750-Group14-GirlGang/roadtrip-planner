import { PackedItems } from '../models/PackedItems';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getAllPackedItems(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'packedItems');
  return dbRoadTrip.packedItems;
}

export async function getPackedItemsForUser(roadTripId, userId) {
  const allPackedItems = await getAllPackedItems(roadTripId);
  return allPackedItems.find((packedItems) => new String(packedItems.user).valueOf() === new String(userId).valueOf());
}

export async function createPackedItemsForUser(roadTripId, userId, packedItems) {
  packedItems.user = userId;

  const dbPackedItemsForUser = new PackedItems(packedItems);
  await dbPackedItemsForUser.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.packedItems.push(dbPackedItemsForUser._id);
  await dbRoadTrip.save();

  return dbPackedItemsForUser;
}

export async function updatePackedItemsForUser(originalPackedItemsForUser, newPackedItemsForUser) {
  originalPackedItemsForUser.items = newPackedItemsForUser.items;
  await originalPackedItemsForUser.save();

  return originalPackedItemsForUser;
}
