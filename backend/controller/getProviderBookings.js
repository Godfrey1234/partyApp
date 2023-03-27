const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

exports.getAllBookings = (req,res)=>{


  const booking_id = parseInt(req.params.id)

    pool.query('SELECT * FROM bookings b, users u  where b.user_id1 = u.user_id and b.user_id2 = $1',[booking_id],(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
}

  exports.updateBooking = (req,res)=>{

    const booking_id = req.params.id;
    const booking_status = req.body.booking_status;
   const {date, time, client_id, provider_id,message}= req.body;
   
  //  let message = "Your booking status has changed to " + booking_status;
   let status ="Not Read";

    try{
      pool.query('UPDATE "public"."bookings" SET booking_status=$1 WHERE booking_id =$2',
      [booking_status, booking_id],
        (error, results) => {
          if (error) {
            throw error
          }
    


          pool.query('INSERT INTO notifications (client_id,provider_id,date,time, message,status) VALUES ($1,$2,$3,$4,$5,$6)',[client_id,provider_id,date,time,message,status],(error, results) => 
            {
                if(error){
                    throw error
                }else{
                    res.status(200).json({message:'status updated'});
                }


            })
        }
      )
    }
    catch(error)
    {
      console.log('didnt update')
    }
  
  }
  

//get notificsation

exports.getNotification = (req,res)=>{

  const client_id = parseInt(req.params.id)

  pool.query('SELECT * FROM notifications where client_id = $1 ORDER BY notification_id DESC' ,[ client_id ],(error ,results)=>{
    if(error){
        throw error
    }
     res.status(200).json(results.rows)
    })

}


//readNotification

exports.readNotification = (req,res)=>{

  const notification_id = parseInt(req.params.id)

  const {status} = req.body

  pool.query('UPDATE notifications SET status = $1 WHERE notification_id = $2',[status , notification_id],(error, results) => {


    if(error){
      throw error
    }else{
      res.status(200).json('Notification Read')
    }

  })
  



}


//Count Notifications countNotification

exports.countNotification = (req,res)=>{

  const client_id = parseInt(req.params.id)
  let status ="Not Read"
  
  pool.query('SELECT * FROM notifications where status = $1 and client_id = $2',[status, client_id ],(error ,results)=>{
  if(error){
      throw error
  }
  res.status(200).json(results.rowCount)
  })

}



  //get pending

  exports.countPending = (req,res)=>{


    const provider_id = parseInt(req.params.id)
    let status ="Pending"
  
      pool.query('SELECT * FROM bookings where user_id2 = $1 and booking_status = $2',[ provider_id,status ],(error ,results)=>{
      if(error){
          throw error
      }
      res.status(200).json(results.rowCount)
      })
  }

  exports.countCencelled = (req,res)=>{


    const provider_id = parseInt(req.params.id)
    let status ="Cancelled"
  
      pool.query('SELECT * FROM bookings where user_id2 = $1 and booking_status = $2',[ provider_id,status ],(error ,results)=>{
      if(error){
          throw error
      }
      res.status(200).json(results.rowCount)
      })
  }

  exports.countApproved = (req,res)=>{


    const provider_id = parseInt(req.params.id)
    let status ="Approved"
  
      pool.query('SELECT * FROM bookings where user_id2 = $1 and booking_status = $2',[ provider_id,status ],(error ,results)=>{
      if(error){
          throw error
      }
      res.status(200).json(results.rowCount)
      })
  }

  exports.countDeclined = (req,res)=>{


    const provider_id = parseInt(req.params.id)
    let status ="Declined"
  
      pool.query('SELECT * FROM bookings where user_id2 = $1 and booking_status = $2',[ provider_id,status ],(error ,results)=>{
      if(error){
          throw error
      }
      res.status(200).json(results.rowCount)
      })
  }
  