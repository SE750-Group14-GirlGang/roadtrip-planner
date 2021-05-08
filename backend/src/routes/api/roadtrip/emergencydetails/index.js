import express from 'express';

import * as emergencydetails from '../../../../db/controllers/emergencydetails';
import user from './user';

const router = express.Router();

// get all emergency details for the specified roadtrip
router.get('/:id/emergencydetails', async (req, res) => {
  const { id: roadTripId } = req.params;

  const emergencyDetails = await emergencydetails.getAllEmergencyDetails(roadTripId);
  res.json(emergencyDetails);
});

router.use('/', user);

export default router;
