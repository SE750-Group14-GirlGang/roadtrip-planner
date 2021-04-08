import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:id/map', async (req, res) => {
    const { id } = req.params;
    res.send(`Endpoint to get a map for the roadtrip with id ${id}`);
});

export default router;