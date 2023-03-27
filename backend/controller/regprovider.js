const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;
const bcrypt = require('bcrypt');

//import database from "../database Connection/dbConn";
//import jwt from "jsonwebtoken";
//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');


exports.regprovider = async (req, res)=>{ 
    const salt = await bcrypt.genSalt(10);
    const account ="provider" , country="South Africa";
    const { user_email , password ,user_name ,user_lastname,  province, city, area, street,service, description, coverimg } = req.body;
   
    console.log(user_email + ' ' + password + ' '+ user_lastname + ' '+ account + ' '+ user_name)
    
    let profilepic="https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"
    let rating = 0.0;
    let ratings_counter = 0;
    const hash = await bcrypt.hash(password, salt);
    const sql = 'SELECT * FROM users WHERE user_email = $1';
    pool.query(sql,[user_email],(err, results)=>{
        if(results.rowCount == 0)
        {
            
            pool.query('INSERT INTO users (user_email,password,user_name,user_lastname, account,profilepic,country, province, city, area, street,service, description,rating,coverimg, ratings_counter) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)',[user_email,hash ,user_name ,user_lastname, account,profilepic,country, province, city, area, street,service, description,rating,coverimg,ratings_counter],(error, results) => 
            {
                if (error) 
                        {
                            res.status(400).json({message:'Query failed'});
                        }else
                        {
                            res.status(200).json('User successfully registered');
                        }
                          
            })
        }else
        {
            res.status(400).json('User already exists, Please login!');
        }
    });

  }
  