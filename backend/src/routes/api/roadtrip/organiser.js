import express from 'express';

import * as roadtrips from '../../../db/controllers/roadtrips';

const router = express.Router();

// get the organiser of a roadtrip
router.get('/:id/organiser', async (req, res) => {
  const { id: roadTripId } = req.params;
  const organiser = await roadtrips.getOrganiser(roadTripId);
  res.json(organiser);
});

export default router;
