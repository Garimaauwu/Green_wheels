const express = require('express');
const dotenv = require('dotenv');
const leaflet = require("leaflet");
const mapbox = require("mapbox");
const moment = require("moment");
const socket = require('socket.io');


const app = new express();



dotenv.config({
    path:'./.env'
});



app.listen(5000,()=>{
    console.log("Connection sucessful server is conected to port 5000");
})