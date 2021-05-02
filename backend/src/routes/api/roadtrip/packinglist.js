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

// update the packing list object for the specified road trip
// creates a new packing list object if one does not already exist
router.put('/:id/packinglist', async (req, res) => {
  const { id: roadTripId } = req.params;
  const currentPackingList = await packinglists.getPackingList(roadTripId);

  if (currentPackingList) {
    // packinglist has already been created, update it
    const updatedPackingList = await packinglists.updatePackingList(currentPackingList, req.body);
    res.json(updatedPackingList);
  } else {
    // packing list has not been made before
    const newPackingList = await packinglists.createPackingList(roadTripId, req.body);
    res
      .status(constants.HTTP_CREATED)
      .header('Location', `/api/roadtrip/${roadTripId}/packinglist`)
      .json(newPackingList);
  }
});

export default router;
