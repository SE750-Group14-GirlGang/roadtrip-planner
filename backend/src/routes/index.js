import express from 'express';
import checkJwt from '../auth/checkJwt';

import api from './api';

const router = express.Router();
router.use('/api', checkJwt, api);

router.use('/', async (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

export default router;
