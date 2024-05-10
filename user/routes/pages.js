const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
// const carbonemission = require('../carbon_calculate/carbon_emission')
// const savings = require('../carbon_calculate/saving')
// const uodate = require('../carbon_calculate/updated_cm')

router.get('/',(req,res)=>{
    res.render('login');
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/about',authController.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render('about',{
            about : req.user 
        })
    }else{
        res.redirect('/login');
    }
});

router.get('/finder',(req,res)=>{
    res.render('finder');
});

router.get('/tracker',(req,res)=>{
    if(req.user){
        res.render('tracker',{
           tracker : req.user
        });
    }
    else{
        res.redirect('/login');
    }
});

//middle-ware
router.get('/index',authController.isLoggedIn,(req,res) =>{
    if(req.user){
        res.render('index',{
            user : req.user 
        })
    }else{
        res.redirect('/login');
    }
});

module.exports = router;