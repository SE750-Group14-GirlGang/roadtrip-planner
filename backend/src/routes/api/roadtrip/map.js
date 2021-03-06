import express from 'express';

import * as constants from '../../constants';
import * as maps from '../../../db/controllers/maps';

const router = express.Router();

// get map for the specified roadtrip
router.get('/:id/map', async (req, res) => {
  const { id: roadTripId } = req.params;

  const map = await maps.getMap(roadTripId);
  res.json(map);
});

// save the map object for the specified roadtrip
router.post('/:id/map', async (req, res) => {
  const { id: roadTripId } = req.params;

  const newMap = await maps.createMap(roadTripId, req.body);
  res.status(constants.HTTP_CREATED).header('Location', `/api/roadtrip/${roadTripId}/map`).json(newMap);
});

export default router;
