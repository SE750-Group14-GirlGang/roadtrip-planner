import express from 'express';
import mongoose from 'mongoose';

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

// id validation check
router.use('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    }
    else {
        res.status(constants.HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
});

// get roadtrip
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const roadTrip = await roadtrips.getRoadTrip(id);
    res.json(roadTrip);
});

import emergencydetails from './emergencydetails';
router.use('/', emergencydetails);

import itinerary from './itinerary';
router.use('/', itinerary);

import map from './map';
router.use('/', map);

import packeditems from './packeditems';
router.use('/', packeditems);

import packinglist from './packinglist';
router.use('/', packinglist);

import spotify from './spotify';
router.use('/', spotify);



export default router;