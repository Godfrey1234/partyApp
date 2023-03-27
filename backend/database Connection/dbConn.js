

const pg = require('pg')
const pool = new pg.Client('postgres://kdxkpcvz:I_nDFDxRRVOSIiuCoasMPiJEpke_79Hs@ruby.db.elephantsql.com/kdxkpcvz');

pool.connect(function(err){
    if (err) {
      console.log("Database connection error");
      console.log(err)
    }else
    {
      console.log("Database connected successfully");
    }
  })

  module.exports = pool;
