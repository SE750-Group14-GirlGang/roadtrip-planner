import express from 'express';

import * as itineraries from '../../../../../db/controllers/itineraries';

const router = express.Router();

// append an event to a list of events in a day in an itinerary
router.patch('/:roadTripId/itinerary/days/:dayId/events', async (req, res) => {
  const { roadTripId, dayId } = req.params;

  const updatedItinerary = await itineraries.addEvent(roadTripId, dayId, req.body.event);
  res.json(updatedItinerary);
});

export default router;
