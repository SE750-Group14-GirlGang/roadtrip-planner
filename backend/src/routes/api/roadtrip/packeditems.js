import express from 'express';

import * as constants from '../../constants';
import * as packeditems from '../../../db/controllers/packeditems';

const router = express.Router();

// get packed items for the specified roadtrip
router.get('/:id/packeditems', async (req, res) => {
  const { id: roadTripId } = req.params;

  const packedItems = await packeditems.getPackedItems(roadTripId);
  res.json(packedItems);
});

// add an packed items object to the list for this roadtrip
router.post('/:id/packeditems', async (req, res) => {
  const { id: roadTripId } = req.params;

  const newPackedItems = await packeditems.createPackedItems(roadTripId, req.body);
  res.status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${roadTripId}/packeditems`)
    .json(newPackedItems);
});

export default router;
