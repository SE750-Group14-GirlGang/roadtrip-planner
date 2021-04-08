import express from 'express';

import * as constants from '../../constants';
import * as itinerarys from '../../../db/controllers/itinerarys';

const router = express.Router();

// get itinerary for the specified roadtrip
router.get('/:id/itinerary', async (req, res) => {
    const { id: roadTripId } = req.params;

    const itinerary = await itinerarys.getItinerary(roadTripId);
    res.json(itinerary);
});

// save the itinerary object for the specified roadtrip
router.post('/:id/itinerary', async (req, res) => {
    const { id: roadTripId } = req.params;

    const newItinerary = await itinerarys.createItinerary(roadTripId, req.body);
    res.status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${roadTripId}/itinerary`)
    .json(newItinerary);
});

export default router;