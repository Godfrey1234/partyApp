const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;


exports.updateBookingDetails =async (req,res)=>{

    const booking_id = parseInt(req.params.id);

    const {date, time, num_guests }= req.body;

    const sql = 'UPDATE bookings SET date= $1 ,time= $2,  num_guests= $3 WHERE booking_id = $4';
    pool.query(sql,[date,time,num_guests,booking_id],(error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
            console.log(error);
        }else 
        {
        res.status(200).json({message:'Your booking was updated successfully'});
        
    
        }
    
      })

}

exports.cancelBooking =async (req,res)=>{

    const booking_id = parseInt(req.params.id);
    const status = req.body;
    let booking_status = 'Cancelled';

    const sql = 'UPDATE bookings SET booking_status = $1 WHERE booking_id =$2';
    pool.query(sql,[booking_status,booking_id],(error,results) => {
        if(error){
            res.status(400).json({message:'Query failed'});
            console.log(error);
        }
        else
        {res.status(200).json({message:'Your cancelled your booking'});}
    })

}