const mysql = require("mysql");
//connect to Database
const con = mysql.createConnection({
  host: "db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "fahrtenbuch"
})
module.exports = con;