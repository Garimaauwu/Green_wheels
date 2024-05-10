const mysql = require('mysql');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const math = require('math');
const getCoordsfroAdd = require('../carbon_calculate/distance_route');
const carboncalc = require('../carbon_calculate/carbon_emission');
const saving = require('../carbon_calculate/saving');

//connect to database Mysql connection.

function distance (val1,val2){

    const dist = acos(math.sin(val1.lat)*math.sin(val2.lat)+math.cos(val1.lat)*math.cos(val2.lat)*math.cos(val2.lng-val1.lng))*6371;
    return math.floor(dist);
}

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});


exports.register =  (req,res) =>{
    try{
    const {name,email,password,passwordConfirm} = req.body;//destructuring 
    console.log(req.body);
    db.query('SELECT email FROM userlogin WHERE email = ?',[email],async (error,results)=>{
        if(error)
            {
                console.log(error);
            }else if(results.length > 0){
                return res.render('register',{
                    message : 'That email is already taken'
                })
            }else if(password !== passwordConfirm){
                return res.render('register',{
                    message : 'Password Do Not Match'
                }) 
            }else{
                let hashedPassword = await bycrypt.hash(password,2);

                console.log(hashedPassword);
    
                db.query('INSERT INTO userlogin SET ?',{name: name, email:email, password:hashedPassword},(error,results)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        return res.render('register',{
                            message : 'USER Registration Sucessfull'
                        });
                    }
                });
            }

           
    });
    }catch(error){
        console.log(error);
    }
};

exports.login = (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
            {
                return res.status(400).render('login',{
                    message : 'Please Provide required Credentials'
                });
            }
            db.query('SELECT * FROM userlogin WHERE email = ?',[email],async (error,result)=>{
                console.log('Results:',result);//returns an array of object thats why we have result[0].password
                if(!result || !(await bycrypt.compare(password,result[0].password))){
                    res.status(401).render('login',{
                        //alert dalna hai.
                        message : 'Please Provide Correct Email or Password'
                    });
                }else{
                    const id = result[0].id;
                    const token = jwt.sign({id:id},process.env.JWT_SECRET,{
                        expiresIn:process.env.JWT_EXPIRES_IN  
                    });
                    console.log(token);

                    const cookieOption = {
                        expires : new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES *24 *60 *60 *1000,
                        ),
                        httOnly : true,
                    }
                    res.cookie('jwt',token,cookieOption)
                    res.status(200).redirect('/index')//can send to profile. redirect to profile page.
                }
            });
    }catch(error){
        console.log(error);
    }
};



exports.isLoggedIn = async (req,res,next)=>{
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)

            db.query('SELECT * FROM userlogin WHERE id = ?',[decoded.id],(error,results)=>{
                if(!results){
                    return next();
                }

                req.user = results[0];
                return next();
            });
        }catch(error){
            console.log(error);
            return next();
        }
    }
    else{
        return next();
    }
}


exports.logout = async (req,res)=>{
    res.cookie('jwt','logout',{
        expires : new Date(Date.now()+ 2 * 1000),
        httpOnly: true
    })

    res.status(200).redirect('/login');
}


exports.finder = async (req,res,next)=>{
    let {source,desti} = req.body;
    console.log(source,desti);
    if(!source || !desti)
        {
            return res.status(400).render('finder',{
                message : 'Please Provide correct adddresses'
            });
        }
        let var1,var2;
    try{
         var1  =await getCoordsfroAdd(source);
         var2 = await getCoordsfroAdd(desti);
        const dist = distance(var1,var2);
        console.log(dist);
        try{
                const carbon_calc = await carboncalc(dist);
                const day_saving = await saving(dist);
                if(req.cookies.jwt){
                    try{
                        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
                        db.query('UPDATE userlogin SET carbonfootprint = ?, saving = ? WHERE id = ?', [carbon_calc, day_saving, decoded.id], (error, results) => {
                            if(error){
                                return next(error);
                            }
                            else{
                                console.log(sucessfull);
                            }
                        });
                        db.query('UPDATE userlogin SET Awards = ?',[awards]),(error,result)=>{
                            if(error){
                                return next(error);
                            }
                        }
                    }catch(error){
                        return next();
                    }
                }
        }catch(error){
            return next(error);
        }
    }catch(error){
        return next(error);
    }
    
}

// exports.tracker = async (req,res,next)=>{



// };


// exports.index;
// exports.about;