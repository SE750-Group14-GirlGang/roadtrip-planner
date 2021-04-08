import express from 'express';

import * as roadtrips from '../../../db/controllers/roadtrips';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// get all roadtrips
router.get('/', async (req, res) => {
    let allRoadTrips;
    if(req.query.user){
        allRoadTrips = await roadtrips.getAllRoadTripsForUser(req.query.user);
    } else {
        allRoadTrips = await roadtrips.getAllRoadTrips();
    }
    
    res.json(allRoadTrips);
});

// create new roadtrip
router.post('/', async (req, res) => {
    const newRoadTrip = await roadtrips.createRoadTrip(req.body);
    res.status(HTTP_CREATED)
    .header('Location', `/api/roadtrip/${newRoadTrip._id}`)
    .json(newRoadTrip);
});

// get roadtrip
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const roadTrip = await roadtrips.getRoadTrip(id);
    res.json(roadTrip);
});

import map from './map';
router.use('/', map);

export default router;