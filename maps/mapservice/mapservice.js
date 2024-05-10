const express = require('express')
const router = express.Router();


const distance = require('../API/distancehandler');
const livelocation = require('../API/livelocationhandler');


router.post('/map',distance.distance)
router.post('/map',livelocation.watchId)
