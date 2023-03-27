const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;


var count = 0;
var currentRating = 0;


exports.rateProvider = async (req, res)=>{

    const prov_id = req.body.prov_id;
    const rating = Number(req.body.rating);
   

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    pool.query(sql,[prov_id],(err, results)=>{
        if(err) { res.status(400).json({message:'Query failed'}) }
        else{
            count = results.rows[0].ratings_counter;
            currentRating = results.rows[0].rating;

            var newCount = count + 1;
            var newRating = ((currentRating * count) + rating)/(newCount);
            newRating = Math.round( newRating * 5 ) / 5;

            console.log(newRating);
            console.log(currentRating);
            console.log(count);
            console.log(((currentRating * count)+rating)/(newCount));

            //Updating values in the db
            pool.query(
                'UPDATE users SET rating = $1, ratings_counter = $2 WHERE user_id = $3',
                [newRating,newCount,prov_id],
                (error, rateResults) =>{
                    if(error) { res.status(400).json({message:'Query BD failed'}) }
                    else{
                        res.status(200).json({message:'Thank you for rating this developer.'})
                    }
                })  
        }
    })


}