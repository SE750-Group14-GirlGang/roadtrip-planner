import { EmergencyDetails } from '../models/EmergencyDetails';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getEmergencyDetails(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'emergencyDetails');
  return dbRoadTrip.emergencyDetails;
}

export async function createEmergencyDetails(roadTripId, emergencyDetails) {
  const dbEmergencyDetails = new EmergencyDetails(emergencyDetails);
  await dbEmergencyDetails.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.emergencyDetails.push(dbEmergencyDetails._id);
  await dbRoadTrip.save();

  return dbEmergencyDetails;
}
