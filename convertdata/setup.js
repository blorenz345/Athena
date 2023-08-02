const mysql = require("mysql");

const hostname = "localhost",
    username = "root",
    password = "",
    dbname = "athena";
  
let tempcon = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    port: 3306
});
  
tempcon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    tempcon.query("CREATE DATABASE athena", function (err, result) {
        if (err) throw err;
        tempcon.end(); 
        console.log("Database created");
    });
});
