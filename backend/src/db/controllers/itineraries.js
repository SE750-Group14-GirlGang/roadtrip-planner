import { Itinerary } from '../models/Itinerary';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getItinerary(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'itinerary');
  return dbRoadTrip.itinerary;
}

export async function createItinerary(roadTripId, itinerary) {
  const dbItinerary = new Itinerary(itinerary);
  await dbItinerary.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.itinerary = dbItinerary._id;
  await dbRoadTrip.save();

  return dbItinerary;
}
