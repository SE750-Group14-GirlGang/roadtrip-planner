import express from 'express';

import * as constants from '../../constants';
import * as roadtrips from '../../../db/controllers/roadtrips';

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
    res.status(constants.HTTP_CREATED)
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

import packinglist from './packinglist';
router.use('/', packinglist);

import spotify from './spotify';
router.use('/', spotify);

export default router;