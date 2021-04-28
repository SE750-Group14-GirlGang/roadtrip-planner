import express from 'express';
import mongoose from 'mongoose';

import * as constants from '../../constants';
import * as roadtrips from '../../../db/controllers/roadtrips';
import * as users from '../../../db/controllers/users';
import formatUserId from '../../../utils/formatUserId';

import emergencydetails from './emergencydetails';

import itinerary from './itinerary';

import map from './map';

import packeditems from './packeditems';

import packinglist from './packinglist';

import spotify from './spotify';

const router = express.Router();

// get all roadtrips for a user
router.get('/', async (req, res) => {
  const userId = formatUserId(req.user.sub);
  const allRoadTrips = {};
  allRoadTrips.roadTripsOrganising = await users.getRoadTripsOrganising(userId);
  allRoadTrips.roadTripsAttending = await users.getRoadTripsAttending(userId);
  res.json(allRoadTrips);
});

// create new roadtrip
router.post('/', async (req, res) => {
  const userId = formatUserId(req.user.sub);
  const newRoadTrip = await roadtrips.createRoadTrip(req.body, userId);
  res.status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${newRoadTrip._id}`)
    .json(newRoadTrip);
});

// id validation check
router.use('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    next();
  } else {
    res.status(constants.HTTP_BAD_REQUEST)
      .contentType('text/plain').send('Invalid ID');
  }
});

// get roadtrip
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const roadTrip = await roadtrips.getRoadTrip(id);
  res.json(roadTrip);
});
router.use('/', emergencydetails);
router.use('/', itinerary);
router.use('/', map);
router.use('/', packeditems);
router.use('/', packinglist);
router.use('/', spotify);

export default router;
