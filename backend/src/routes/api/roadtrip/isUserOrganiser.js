import express from 'express';

import * as roadtrips from "../../../db/controllers/roadtrips";
import formatUserId from "../../../utils/formatUserId";

const router = express.Router();

// checks if the current user is the organiser of the given roadtrip
router.get("/:id/isUserOrganiser", async (req, res) => {
  const userId = formatUserId(req.user.sub);
  const { id: roadTripId } = req.params;
  const isUserOrganiser = await roadtrips.isUserOrganiser(roadTripId, userId);
  res.json({ result: isUserOrganiser });
});

export default router;