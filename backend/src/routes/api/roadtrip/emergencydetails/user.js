import express from 'express';

import * as constants from '../../../constants';
import * as emergencydetails from '../../../../db/controllers/emergencydetails';
import formatUserId from '../../../../utils/formatUserId';

const router = express.Router();

// get emergency details for the specified roadtrip for the specified user
router.get('/:id/emergencydetails/user', async (req, res) => {
  const { id: roadTripId } = req.params;
  const userId = formatUserId(req.user.sub);

  const emergencyDetailsForUser = await emergencydetails.getEmergencyDetailsForUser(roadTripId, userId);

  if (emergencyDetailsForUser) {
    res.json(emergencyDetailsForUser);
  } else {
    res.status(constants.HTTP_NOT_FOUND).send({ message: 'Emergency details have not been created for this user' });
  }
});

// add an emergency details object to the list for this roadtrip for the current user
// if an emergency details object has been made for this user, update using request body
router.put('/:id/emergencydetails/user', async (req, res) => {
  const { id: roadTripId } = req.params;
  const userId = formatUserId(req.user.sub);

  const currentEmergencyDetailsForUser = await emergencydetails.getEmergencyDetailsForUser(roadTripId, userId);

  if (currentEmergencyDetailsForUser) {
    // packed items for this user has already been created, update it
    const updatedEmergencyDetailsForUser = await emergencydetails.updateEmergencyDetailsForUser(
      currentEmergencyDetailsForUser,
      req.body
    );
    res.json(updatedEmergencyDetailsForUser);
  } else {
    // packed items for this user has not been made before
    const newEmergencyDetailsForUser = await emergencydetails.createEmergencyDetailsForUser(
      roadTripId,
      userId,
      req.body
    );
    res
      .status(constants.HTTP_CREATED)
      .header('Location', `/api/roadtrip/${roadTripId}/emergencydetails/user`)
      .json(newEmergencyDetailsForUser);
  }
});

export default router;
