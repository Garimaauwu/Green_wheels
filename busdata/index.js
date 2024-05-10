const mysql = require('mysql');
const express = require('express');
const body = require('body-parser')
const path = require('path');

const app = new express();
const publicDirectory = path.join(__dirname,"./public");
app.use(express.static(publicDirectory));

app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.listen(5000,()=>{
    console.log("Connection sucessful. server running at port 5000");
})