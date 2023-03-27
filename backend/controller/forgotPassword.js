const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;
//const { v4: uuidv4 } = require('uuid');

var smtpTransport = require('nodemailer-smtp-transport');
//const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const crypto = require('crypto');
const sender =  'partytainers@zohomail.com';

const transporter = nodemailer.createTransport({
     
  host: 'smtp.zoho.com', 
  auth: {
    user:'partytainers@zohomail.com', 
    pass: 'QWCUG8tZcgDHavU',
    
    // user: 'partytainers@outlook.com',
    // pass:'/+)@&vzym+SX2_(',
  },
});

emailDetails = {
  from: '', //where the email is from 
  to: '', //where the email is to
  subject: '', //email subject
  text: '', //email  
  html:'',
};

exports.forgotPassword = async(req,res)=>{

    //const token = uuidv4();
    //const resetLink = `http://localhost:3000/reset-password/${resetToken}`;


const {user_email} = req.body;
const sql = 'SELECT * FROM users WHERE user_email =$1';

pool.query(sql,[user_email],async (error, result)=>{



        if (error)
        {
            res.status(404).json('Email Address not found');
            console.log(error);
        }
        else
        {
            res.status(200).json(result.rows[0])
            // let userEmail = result.rows[0].user_email;
            // let username = result.rows[0].user_name;
            // let passw=result.rows[0].password;

            
            //const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                // Create a password reset link with the reset token
            //const resetLink = `http://localhost:3000/forgotPassword/${resetToken}`;
            const reset_token = crypto.randomBytes(20).toString('hex');
            const expire = new Date(Date.now() + 3600000);
            pool.query(' INSERT INTO reset (reset_token,expire,user_email) VALUES ($1,$2,$3)', [reset_token,expire,user_email],(err, resetter) => {
                
                if(err)
                {
                    res.status(563).json('DB error');
                    console.log(err);
                }
               else{
            const resetLink = `http://localhost:4200/reset-password/${reset_token}`;
            emailDetails.from = sender;
            emailDetails.to = user_email;
            emailDetails.subject = 'Password reset';
            emailDetails.text = "Good Day "+result.rows[0].user_name+'\n\nYour password is below.\n\n'+result.rows[0].password+'\n\nYou can log onto your account.\n\nParty-Tainers Team ';
            emailDetails.html =`<p>Click on this link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p><p> This link is valid for one hour </p> <p>Regards</p> <p> Party-Tainers Team</p>`;

            transporter.sendMail(emailDetails,(emailErr, info)=>{
                if(emailErr){
                    res.status(500).json({message:'E-mail error'});

                }
                else{
                    res.status(200).json({ message: 'Failed to send email' });
                }

            })
        }
        
        })

        }


    })

}