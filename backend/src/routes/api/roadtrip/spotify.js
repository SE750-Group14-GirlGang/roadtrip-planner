import express from 'express';

import * as constants from '../../constants';
import * as spotifys from '../../../db/controllers/spotifys';

const router = express.Router();

// get spotify for the specified roadtrip
router.get('/:id/spotify', async (req, res) => {
    const { id: roadTripId } = req.params;

    const spotify = await spotifys.getSpotify(roadTripId);
    res.json(spotify);
});

// save the spotify object for the specified roadtrip
router.post('/:id/spotify', async (req, res) => {
    const { id: roadTripId } = req.params;

    const newSpotify = await spotifys.createSpotify(roadTripId, req.body);
    res.status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${roadTripId}/spotify`)
    .json(newSpotify);
});

export default router;