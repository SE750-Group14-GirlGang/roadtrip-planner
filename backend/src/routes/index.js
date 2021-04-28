import express from 'express';
import checkJwt from '../auth/checkJwt';

import api from './api';

const router = express.Router();
router.use('/api', checkJwt, api);

export default router;
