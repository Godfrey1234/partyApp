const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

const database = require("../database Connection/db-config");
const jwt = require("jsonwebtoken");
//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');




exports.updateDesc = async (req, res)=>{ 

    const user_id = req.params.user_id;
    const  {description }= req.body;
  
    pool.query(
      'UPDATE users SET description = $1  WHERE user_id = $2',
        [description, user_id],
       (error,results) => {
        
        if (error) {
            res.status(400).json({message:'Query failed'});
            console.log(error);
        }else {res.status(200).json({message:'Your description was updated successfully'});}
    
      })

}