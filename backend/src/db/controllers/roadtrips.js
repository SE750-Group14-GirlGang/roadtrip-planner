import { RoadTrip } from '../models/RoadTrip';
import * as users from '../controllers/users';

export async function getRoadTrip(id) {
  return await RoadTrip.findById(id);
}

export async function createRoadTrip(roadTrip, organiserId) {
  roadTrip.organiser = organiserId;
  const dbRoadTrip = new RoadTrip(roadTrip);
  await dbRoadTrip.save();
  //creates bidirectional relationship between User and Roadtrip
  await users.addRoadTripOrganising(organiserId, dbRoadTrip._id);
  return dbRoadTrip;
}

export async function isUserOrganiser(roadTripId, userId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  return new String(dbRoadTrip.organiser).valueOf() === new String(userId).valueOf();
  
export async function getAttendees(roadTripId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  await RoadTrip.populate(dbRoadTrip, "attendees");
  return dbRoadTrip.attendees;
}

export async function addAttendee(roadTripId, userId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  if (dbRoadTrip.attendees.every((e) => new String(e).valueOf() !== new String(userId).valueOf())) {
    dbRoadTrip.attendees.push(userId);
    await users.addRoadTripAttending(userId, roadTripId);
  }
  await dbRoadTrip.save();
  return dbRoadTrip;
}
