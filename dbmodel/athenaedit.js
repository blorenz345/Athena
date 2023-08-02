const mysql = require("mysql");
const {sequelize, DataTypes} = require("sequelize");

const hostname = "localhost",
    username = "root",
    password = "",
    dbname = "athena";
  
/**let con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    port: 3306
});*/
const sequelize = new Sequelize(
    dbname,
    username,
    password,
    {
        host: hostname,
        port: 3306,
        dialect: 'mysql'
    }
);
 
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
    Student.create({
        sid: 811010436,
        stu_name: "brenden",
        gender: "male",
        age: 23,
        major: "CS",
        password: "1234"
    }).then(res => {
        console.log(res);
    }).catch((err) => {
        console.log("failed to make new student");
    });
});