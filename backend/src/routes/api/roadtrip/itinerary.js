import express from 'express';

import * as constants from '../../constants';
import * as itineraries from '../../../db/controllers/itineraries';

const router = express.Router();

// get itinerary for the specified roadtrip
router.get('/:id/itinerary', async (req, res) => {
  const { id: roadTripId } = req.params;

  const itinerary = await itineraries.getItinerary(roadTripId);
  res.json(itinerary);
});

// save the itinerary object for the specified roadtrip
router.post('/:id/itinerary', async (req, res) => {
  const { id: roadTripId } = req.params;

  const newItinerary = await itineraries.createItinerary(roadTripId, req.body);
  res.status(constants.HTTP_CREATED).header('Location', `/api/roadtrip/${roadTripId}/itinerary`).json(newItinerary);
});

router.patch('/:id/itinerary', async (req, res) => {
  const { id: roadTripId } = req.params;

  const updatedItinerary = await itineraries.addEvent(roadTripId, req.body.dayId, req.body.event);
  res.json(updatedItinerary);
});

export default router;
