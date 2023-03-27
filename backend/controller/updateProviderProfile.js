const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

const database = require("../database Connection/db-config");
const jwt = require("jsonwebtoken");
//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');


exports.updateProviderProfile = async (req, res) => {

  const{  street ,area,  province, city} = req.body;
  const user_id = req.params.user_id;

  pool.query(
    'UPDATE users SET street = $1 ,area = $2,  province = $3, city = $4 WHERE user_id = $5',
      [street ,area,  province, city, user_id],
     (error,results) => {
      if (error) {
          res.status(400).json({message:'Query failed'});
          console.log(error);
      }
      else {res.status(200).json({message:'Your description was updated successfully'});}
  
    })

}

exports.getOneUserProfile = (req, res) => {

  const user_id = req.params.user_id;
  //console.log(user_id);

  const sql = 'SELECT * FROM users WHERE user_id = $1';
  pool.query(sql,[user_id],(err, results)=>{
      if(err) {
          //console.log(err)
           res.status(400).json({message:'Query failed'}) }
           else{
          res.status(200).json(results.rows[0]);
      }
  })
}

//update profile pic
exports.addContent = (req, res) => {

  const provider_id = req.params.id;
  const{ image} = req.body;
  let status = "Active";

  if(image){
    pool.query('INSERT INTO gallery (image, provider_id, status) VALUES ($1, $2, $3)',[image, provider_id,status],(error, results) => 
  {
      
    if(error){
      res.status(400).json({message:'Query failed'});
    }
    else{

      res.status(200).json('Succesfully added');
    }


  })
  }else{
    res.status(200).json('Please insert image');

  }

}

exports.getContent = (req, res) => {

  const provider_id = req.params.id;
  let status ='Active'

  pool.query('SELECT * FROM gallery WHERE provider_id = $1 AND status = $2 ',[provider_id,status],(error, results)=> {
       
    if (error) {

     throw error;
    
    }else{

      
      res.status(200).json(results.rows)
   
    }
    });

  
  }

