const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;


exports.booking = (req, res) => {

    const {user_id1, user_id2, num_guests, date, time,location, service_name} = req.body; 

    let booking_status = "Pending"
    let partyType = "baby shower"
    
 
    const sql = 'SELECT * FROM bookings WHERE user_id1 = $1 AND user_id2 = $2 AND date =$3';
    pool.query(sql,[user_id1,user_id2,date],(err, results)=>{

     if(results.rowCount > 0){

      res.status(200).json('booking already made')


     }else{
    pool.query('INSERT INTO bookings (user_id1,user_id2,party_type,service_name,location,date,num_guests,time, booking_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)',[user_id1, user_id2,partyType,service_name,location,date,num_guests,time, booking_status],(error, results) => 
    {
        if (error) 
          {
            res.status(400).json('sytem error');
          }
        else{
            res.status(200).json('successfuly booked')
         }       
    });
  }

  })
}

