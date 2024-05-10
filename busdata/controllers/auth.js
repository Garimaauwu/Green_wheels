const mysql = require('mysql');
const {promisify} = require('util')


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'routes'
});


db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('MYSQL is connected');
    }
});

exports.routes = (req,res)=>{
    const{routes,seats} = req.body;
    db.query('INSERT INTO bus SET ?',{routes : routes,seats : seats},(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            return res.render('index',{
                message : 'Bus route inserted'
            });
        }
    });
}
