const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;
const bcrypt = require('bcrypt');

// 4. Check the token and display the password reset form
exports.resetPassword = async (req, res) => {
  const reset_token = req.params.reset_token;
  console.log(reset_token); 
  const salt = await bcrypt.genSalt(10);
  //const hash = await bcrypt.hash(password, salt);
  const sql = 'SELECT * FROM reset WHERE reset_token = $1';
  pool.query(sql,[reset_token],async (error, result)=>{
    //if (!resetToken || resetToken.expires_at < new Date()) return res.status(400).json({ error: 'Invalid or expired token' });

  if (error) {
    res.status(404).json('Link Error');
            console.log(error);
  }
  else{
    console.log(result.rows[0].user_email)
    let email = result.rows[0].user_email;
    let expires_at =result.rows[0].expire;
    if( !reset_token || expires_at < new Date())
    {
      res.status(400).json('Invalid or expired token');
    }
    else
    {
     
      const {password} = req.body;
      const user_email=result.rows[0].user_email;
      const hash = await bcrypt.hash(password, salt);
      const seq = 'UPDATE users SET password=$1 WHERE user_email = $2';
      pool.query(seq,[hash,user_email],async (errors, results)=>{

        if(errors){
          //console.log('errot ' ,errors);
           res.status(400).json('Invalid or expired token');
        }
        else{
          //console.log('final');
        // Display the password reset form
        // res.render('reset-password', { email, reset_token });
        //res.status(200).send('Password reset sucessful');
        res.status(200).json('Password reset sucessful');
        }
    


      })
    }
  }
})

}