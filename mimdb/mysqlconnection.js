const mysql = require("mysql");
  
let db_con  = mysql.createConnection({
    host: "localhost",
    database: "mimidb",
    user: "root",
    password: 'root',

});
  
db_con.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  
module.exports = db_con;

