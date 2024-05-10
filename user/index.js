const express = require('express');

const mysql = require('mysql');

const dotenv = require('dotenv');

const path = require('path');
const cookieParser = require('cookie-parser');

//this is to make sure that the server starts
const app =new express();



const publicDirectory = path.join(__dirname,"./public");

//Make sure that express is using the public directory

app.use(express.static(publicDirectory));

//environment file:store things which will not change throughout
dotenv.config({
    path:'./.env'
});





//Parsing URL encoded body that is been sent by HTML forms
app.use(express.urlencoded({extended:false}));

//Values that we are getting from the form must come in json format

app.use(express.json());
app.use(cookieParser());


app.set('view engine','hbs');


//Defining routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.listen(5000,()=>{
    console.log("server running at port 5000");
});
