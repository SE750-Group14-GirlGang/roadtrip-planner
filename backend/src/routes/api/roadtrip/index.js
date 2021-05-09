import express from 'express';
import mongoose from 'mongoose';

import * as constants from '../../constants';
import * as roadtrips from '../../../db/controllers/roadtrips';
import * as users from '../../../db/controllers/users';
import formatUserId from '../../../utils/formatUserId';

import attendees from './attendees';
import emergencydetails from './emergencydetails';
import isUserOrganiser from './isUserOrganiser';
import itinerary from './itinerary';
import map from './map';
import organiser from './organiser';
import packeditems from './packeditems/user';
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
  try {
    const newRoadTrip = await roadtrips.createRoadTrip(req.body, userId);
    res.status(constants.HTTP_CREATED).header('Location', `/api/roadtrip/${newRoadTrip._id}`).json(newRoadTrip);
  } catch (error) {
    res.sendStatus(constants.HTTP_BAD_REQUEST);
  }
});

// id validation check
router.use('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    next();
  } else {
    res.status(constants.HTTP_NOT_FOUND).send({ message: 'Roadtrip with this ID not found' });
  }
});

// get roadtrip
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const roadTrip = await roadtrips.getRoadTrip(id);
  res.json(roadTrip);
});

router.use('/', attendees);
router.use('/', emergencydetails);
router.use('/', isUserOrganiser);
router.use('/', itinerary);
router.use('/', map);
router.use('/', organiser);
router.use('/', packeditems);
router.use('/', packinglist);
router.use('/', spotify);

export default router;
