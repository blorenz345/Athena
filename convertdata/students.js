const mysql = require('mysql2');
const fs = require('fs');
const csv = require('fast-csv');

function run() {
    let stream = fs.createReadStream('./data_sets/students.csv');
    let csvData = [];
    let csvStream = csv
        .parse()
        .on('data', function(data) {
            csvData.push(data);
        })
        .on('end', function() {
            csvData.shift();

            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'athena'
            });

            let query = 'INSERT INTO Students (sid, stu_name, gender, age, major, password) VALUES ?';
            connection.query(query, [csvData], (error, response) => {
                console.log(error || response);
            });
        });

    stream.pipe(csvStream);
}

module.exports.run = run;
