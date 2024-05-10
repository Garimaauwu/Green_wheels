//post request lenge.
const express = require('express');
const router = express.Router();
const authControler = require('../controllers/auth');


router.post('/route',authControler.routes);

module.exports = router;