import express from 'express';

import roadtrip from './roadtrip';

const router = express.Router();
router.use('/roadtrip', roadtrip);

export default router;
