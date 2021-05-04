import express from 'express';

import * as constants from '../../constants';
import * as users from '../../../db/controllers/users';
import * as roadtrips from '../../../db/controllers/roadtrips';

const router = express.Router();

// get the list of attendees for a roadtrip
router.get('/:id/attendees', async (req, res) => {
  const { id: roadTripId } = req.params;
  const attendees = await roadtrips.getAttendees(roadTripId);
  res.json(attendees);
});

// append a user to the list of attendees of a roadtrip
// the user's email is provided
router.patch('/:id/attendees', async (req, res) => {
  const { id: roadTripId } = req.params;
  const user = await users.getUserByEmail(req.body.userEmail);
  if (user) {
    const updatedRoadtrip = await roadtrips.addAttendee(roadTripId, user._id);
    res.json(updatedRoadtrip);
  } else {
    res.sendStatus(constants.HTTP_NOT_FOUND);
  }
});

export default router;
