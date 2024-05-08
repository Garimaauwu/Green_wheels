const express = require('express');

const mysql = require('mysql');

const dotenv = require('dotenv');

const path = require('path');
const cookieParser = require('cookie-parser');

//this is to make sure that the server starts
const app =new express();

//public directory accesspoints
//css and js or img files

const publicDirectory = path.join(__dirname,"./public");

//Make sure that express is using the public directory

app.use(express.static(publicDirectory));

//environment file:store things which will not change throughout
dotenv.config({
    path:'./.env'
});




//setting up the View Engine
//Put every-thing  in a folder name views

app.set('view engine','hbs');//hbs : template engine.

//Parsing URL encoded body that is been sent by HTML forms
app.use(express.urlencoded({extended:false}));//Json format mai aayega to extended true hoga

//Values that we are getting from the form must come in json format

app.use(express.json());
app.use(cookieParser());





//Defining routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));




// app.get('/',(req,res)=>{
//     res.send('<h1>hellow world</h1>');
// })//isko alg file mai rkhenge.


//My sql connection

// const db = mysql.createConnection({
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE
// });

// db.connect((error)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('MYSQL is connected');
//     }
// });


app.listen(5000,()=>{
    console.log("server running at port 5000");
});