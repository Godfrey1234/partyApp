const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;
// const getClientsBookings = require('./getClientsBookings');

exports.getBookingById = (request, response) => {
    const booking_id = parseInt(request.params.id)
    console.log(booking_id);
  
    pool.query('SELECT * FROM bookings b, users u  where b.user_id2 = u.user_id and b.user_id1 = $1',[booking_id], (error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
  }