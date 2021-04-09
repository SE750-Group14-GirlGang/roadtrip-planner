import express from 'express';

const router = express.Router();

import roadtrip from './roadtrip';
router.use('/roadtrip', roadtrip);

export default router;