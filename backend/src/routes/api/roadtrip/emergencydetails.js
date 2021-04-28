import express from 'express';

import * as constants from '../../constants';
import * as emergencydetails from '../../../db/controllers/emergencydetails';

const router = express.Router();

// get emergency details for the specified roadtrip
router.get('/:id/emergencydetails', async (req, res) => {
  const { id: roadTripId } = req.params;

  const emergencyDetails = await emergencydetails.getEmergencyDetails(roadTripId);
  res.json(emergencyDetails);
});

// add an emergency details object to the list for this roadtrip
router.post('/:id/emergencydetails', async (req, res) => {
  const { id: roadTripId } = req.params;

  const newEmergencyDetails = await emergencydetails.createEmergencyDetails(roadTripId, req.body);
  res
    .status(constants.HTTP_CREATED)
    .header('Location', `/api/roadtrip/${roadTripId}/emergencydetails`)
    .json(newEmergencyDetails);
});

export default router;
