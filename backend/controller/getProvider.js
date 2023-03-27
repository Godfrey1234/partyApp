const poolConnection = require("../database Connection/dbConn");
const pool = poolConnection;


exports.getProvider = (req, res) => {

  
    const {service,city,province} = req.body; 
  
    let account = "provider"
    console.log(service)
    console.log(city)
  
    if(service && city){
  
      //checking if user already has an account
     pool.query('SELECT * FROM users WHERE account = $1 AND service = $2 AND province = $3',[account,service,province],(error, results)=> {
       
       if (results.rowCount > 0) {
   
         res.status(200).json(results.rows)
       
       }else{

        res.status(200).json('we dont have service providers around your area')
      
       }
       });
   
     }else{
   
        res.status(200).json('enter service name and city')
      
     }
    
}
exports.getProviderbyid = (req, res) => {


  const provider_id = parseInt(req.params.id)

    pool.query('SELECT * FROM users where user_id = $1',[provider_id],(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })



}