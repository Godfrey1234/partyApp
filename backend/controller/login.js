const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;
const bcrypt = require('bcrypt');

const database = require("../database Connection/db-config");
const jwt = require("jsonwebtoken");
//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');


exports.login =  (req, res)=>{
    
  const {user_email,password} = req.body;
  console.log(user_email +' '+ password)

  const sql = 'SELECT * FROM users WHERE user_email = $1';
  pool.query(sql,[user_email],async (err, results)=>{
      if(err) 
      res.status(400).json('invalid login details');
      else{
          if(results.rowCount == 0)
          {
            res.status(400).json('invalid login details');
          }else{
              //bcrypt.compare(password,results.rows[0].password,(passErr,result)=> {
                const hash = results.rows[0].password;
                const match = await bcrypt.compare(password, hash);
                // //return match;
                // console.log(match);

                  if(!match)
                  {
                      res.status(400).json('invalid login details');

                  }else
                  {
                      const token = jwt.sign({
                              user_id: results.rows[0].user_id,
                              user_email: results.rows[0].user_email,
                              user_name: results.rows[0].user_name,
                              user_lastname: results.rows[0].user_lastname,
                              password: results.rows[0].password,
                              account: results.rows[0].account,
                              service: results.rows[0].service,
                              country: results.rows[0].country,
                              province: results.rows[0].province,
                              city: results.rows[0].city,
                              area: results.rows[0].area,
                              street: results.rows[0].street,
                              description: results.rows[0].description,
                              coverimg: results.rows[0].coverimg,
                              price: results.rows[0].price,
                              rating: results.rows[0].rating,
                              ratings_counter: results.rows[0].ratings_counter

                             
                          },
                          process.env.SECRET_KEY,{
                              algorithm: 'HS256',
                              expiresIn: 120
                          });
                          res.status(200).json({token:token,}); 
                 }
              //})
               
                  
              }

          

      }

  })  
}
