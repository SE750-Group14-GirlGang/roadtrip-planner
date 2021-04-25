import express from 'express';
import checkJwt from '../auth/checkJwt'

const router = express.Router();

import api from './api';
router.use('/api', checkJwt, api);

export default router;