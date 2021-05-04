import { EmergencyDetails } from '../models/EmergencyDetails';
import { RoadTrip } from '../models/RoadTrip';

import { getRoadTrip } from './roadtrips';

export async function getAllEmergencyDetails(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, 'emergencyDetails');
  return dbRoadTrip.emergencyDetails;
}

export async function getEmergencyDetailsForUser(roadTripId, userId) {
  const allEmergencyDetails = await getAllEmergencyDetails(roadTripId);
  return allEmergencyDetails.find(
    (emergencyDetails) => new String(emergencyDetails.user).valueOf() === new String(userId).valueOf()
  );
}

export async function createEmergencyDetailsForUser(roadTripId, userId, emergencyDetails) {
  emergencyDetails.user = userId;

  const dbEmergencyDetailsForUser = new EmergencyDetails(emergencyDetails);
  await dbEmergencyDetailsForUser.save();

  const dbRoadTrip = await getRoadTrip(roadTripId);
  dbRoadTrip.emergencyDetails.push(dbEmergencyDetailsForUser._id);
  await dbRoadTrip.save();

  return dbEmergencyDetailsForUser;
}

export async function updateEmergencyDetailsForUser(originalEmergencyDetailsForUser, newEmergencyDetailsForUser) {
  originalEmergencyDetailsForUser.name = newEmergencyDetailsForUser.name;
  originalEmergencyDetailsForUser.phoneNumber = newEmergencyDetailsForUser.phoneNumber;
  originalEmergencyDetailsForUser.emergencyContact = newEmergencyDetailsForUser.emergencyContact;
  await originalEmergencyDetailsForUser.save();

  return originalEmergencyDetailsForUser;
}
