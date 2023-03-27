const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;

exports.getClientProfile= (request, response) => {
    const user_id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })

}


  exports.updateClientProfile = (request, response) => {
    const user_id = parseInt(request.params.id);
    const { user_name, user_lastname } = request.body
  
    pool.query('UPDATE users SET user_name=$1, user_lastname=$2 WHERE user_id=$3',
    [user_name, user_lastname, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json('success')
        
      }
    )
  }



  exports.updateClientProfilepic = (request, response) => {
    const user_id = parseInt(request.params.id);
    const {profilepic} = request.body
  
    pool.query('UPDATE users SET profilepic = $1 WHERE user_id = $2',
    [profilepic, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json('successfuly updated profile pic')
        
      }
    )
  }

  exports.updateCoverImg = (request, response) => {
    const user_id = parseInt(request.params.id);
    const {coverimg} = request.body
  
    pool.query('UPDATE users SET coverimg = $1 WHERE user_id = $2',
    [coverimg, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json('successfuly updated cover image')
        
      }
    )
  }


