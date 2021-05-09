import express from 'express';

import * as constants from '../../../constants';
import * as packeditems from '../../../../db/controllers/packeditems';
import formatUserId from '../../../../utils/formatUserId';

const router = express.Router();

// get packed items for the specified roadtrip for the specified user
router.get('/:id/packeditems/user', async (req, res) => {
  const { id: roadTripId } = req.params;
  const userId = formatUserId(req.user.sub);

  const packedItemsForUser = await packeditems.getPackedItemsForUser(roadTripId, userId);
  if (packedItemsForUser) {
    res.json(packedItemsForUser);
  } else {
    res.status(constants.HTTP_NOT_FOUND).send({ message: 'Packed items have not been created for this user' });
  }
});

// add a packed items object to the list for this roadtrip for the specified user
// if a packed items object has been made for this user, update using request body
router.put('/:id/packeditems/user', async (req, res) => {
  const { id: roadTripId } = req.params;
  const userId = formatUserId(req.user.sub);

  const currentPackedItemsForUser = await packeditems.getPackedItemsForUser(roadTripId, userId);

  if (currentPackedItemsForUser) {
    // packed items for this user has already been created, update it
    const updatedPackedItemsForUser = await packeditems.updatePackedItemsForUser(currentPackedItemsForUser, req.body);
    res.json(updatedPackedItemsForUser);
  } else {
    // packed items for this user has not been made before
    const newPackedItemsForUser = await packeditems.createPackedItemsForUser(roadTripId, userId, req.body);
    res
      .status(constants.HTTP_CREATED)
      .header('Location', `/api/roadtrip/${roadTripId}/packeditems/user`)
      .json(newPackedItemsForUser);
  }
});

export default router;
