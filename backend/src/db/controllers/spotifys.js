import { Spotify } from '../models/Spotify';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getSpotify(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'spotify');
  return dbRoadTrip.spotify;
}

export async function createSpotify(roadTripId, spotify) {
  const dbSpotify = new Spotify(spotify);
  await dbSpotify.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.spotify = dbSpotify._id;
  await dbRoadTrip.save();

  return dbSpotify;
}
