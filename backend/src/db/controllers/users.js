import { User } from '../models/User';

export async function createUser(user) {
  const dbUser = new User(user);
  await dbUser.save();

  return dbUser;
}

export async function getUserByEmail(email) {
  return await User.findOne({ email });
}

export async function getRoadTripsAttending(userId) {
  const dbUser = await User.findById(userId);
  await User.populate(dbUser, 'roadTripsAttending');
  return dbUser.roadTripsAttending;
}

export async function addRoadTripAttending(userId, roadTripId) {
  const dbUser = await User.findById(userId);
  dbUser.roadTripsAttending.push(roadTripId);
  await dbUser.save();
}

export async function getRoadTripsOrganising(userId) {
  const dbUser = await User.findById(userId);
  await User.populate(dbUser, 'roadTripsOrganising');
  return dbUser.roadTripsOrganising;
}

export async function addRoadTripOrganising(userId, roadTripId) {
  const dbUser = await User.findById(userId);
  dbUser.roadTripsOrganising.push(roadTripId);
  await dbUser.save();
}
