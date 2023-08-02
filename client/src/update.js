const mysql = require("mysql");
const handleOnSubmit = require("./App");

const hostname = "localhost",
    username = "root",
    password = "",
    dbname = "athena";
  
let con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    port: 3306,
    database: dbname
});

const updateStu = async() => {
    const updateobj = await handleOnSubmit();
    con.connect(function(err) {
        if (err) throw err;
        var newUpdate = "INSERT INTO students (sid, stu_name, gender, age, major, password) VALUES ('811010436', 'updateobj.username', 'updateobj.gender', 'updateobj.age', 'updateobj.major', 'updateobj.password')";
        con.query(newUpdate, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          con.end();
        });
    });
}
