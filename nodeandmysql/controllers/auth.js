const mysql = require('mysql');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')
//connect to database Mysql connection.
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});



exports.register =  (req,res) =>{
    const {name,email,password,passwordConfirm} = req.body;//destructuring 
    db.query('SELECT email FROM user WHERE email = ?',[email],async (error,results)=>{
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
            }

            let hashedPassword = await bycrypt.hash(password,2);

            console.log(hashedPassword);

            db.query('INSERT INTO user SET ?',{name: name, email:email, password:hashedPassword},(error,results)=>{
                if(error){
                    console.log(error);
                }
                else{
                    return res.render('register',{
                        message : 'USER Registration Sucessfull'
                    });
                }
            });
    });
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

            db.query('SELECT * FROM user WHERE email = ?',[email],async (error,result)=>{
                console.log('Results:',result);//returns an array of object thats why we have result[0].password
                if(!result || !(await bycrypt.compare(password,result[0].password))){
                    res.status(401).render('login',{
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
                    res.status(200).redirect('/profile')//can send to profile. redirect to profile page.
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

            db.query('SELECT * FROM user WHERE id = ?',[decoded.id],(error,results)=>{
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
        next();
    }
}


exports.logout = async (req,res)=>{
    res.cookie('jwt','logout',{
        expires : new Date(Date.now()+ 2 * 1000),
        httpOnly: true
    })

    res.status(200).redirect('/');
}