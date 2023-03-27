const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

exports.getUser = (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT * FROM users WHERE user_id = $1";

    pool.query(sql,[user_id] ,(err, result) => {
        if(err) {
            res.status(400).json({message: "Failed to get user"})
        }else{

            res.status(200).json(result.rows[0]);
        }
    })
  };