import express from 'express';

import * as constants from '../../constants';
import * as packinglists from '../../../db/controllers/packinglists';

const router = express.Router();

// get packing list for the specified roadtrip
router.get('/:id/packinglist', async (req, res) => {
  const { id: roadTripId } = req.params;

  const packingList = await packinglists.getPackingList(roadTripId);
  res.json(packingList);
});

// save the packing list object for the specified roadtrip
router.post('/:id/packinglist', async (req, res) => {
  const { id: roadTripId } = req.params;

  const newPackingList = await packinglists.createPackingList(roadTripId, req.body);
  res.status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${roadTripId}/packinglist`)
    .json(newPackingList);
});

export default router;
