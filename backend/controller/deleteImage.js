
const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

exports.deleteImage = (req,res)=>{

    const id = req.params.id;
    const {status} = req.body

    pool.query('UPDATE gallery SET status = $1 WHERE id = $2',
    [status, id],
      (error, results) => {
   if(error){
    throw error
   }else{
    res.status(200).json(results.rows)
   }

    })

}