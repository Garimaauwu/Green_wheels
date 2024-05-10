//post request lenge.
const express = require('express');
const router = express.Router();
const authControler = require('../controllers/auth');


router.post('/register',authControler.register);
router.post('/login',authControler.login);
router.get('/logout',authControler.logout);
router.post('/finder',authControler.finder);



module.exports = router;